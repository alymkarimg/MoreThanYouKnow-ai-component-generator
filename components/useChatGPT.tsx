import { useCallback, useState } from "react";
import { ChatGPTMessage } from "../utils/OpenAIStream";

export function removeCodeWrapping(str: string) {
    if (str.startsWith("```") && str.endsWith("```")) {
        return str.slice(3, -3);
    } else {
        return str.replace("```", "");
    }
}

export function useChatGPT(clear: () => void) {
    const [isLoading, setLoading] = useState(false);
    const [conversation, setConversation] = useState<ChatGPTMessage[]>([]);
    const [generatedCode, setGeneratedCode] = useState("");
    const [exportedGeneratedCode, setExportedGeneratedCode] = useState<any>("");

    function makeMessage(role: 'user' | 'assistant', content: string): ChatGPTMessage {
        return {
            role,
            content
        };
    }

    const generateUI = useCallback(async (prompt: string) => {
        setLoading(true);
        const request = makeMessage('user', prompt);
        setConversation(sofar => [...sofar, request]);

        const response = await fetch("/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                messages: [...conversation, request]
            }),
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        // This data is a ReadableStream
        const data = response.body;
        if (!data) {
            return;
        }

        const rawValue = await response.text();
        const reply = makeMessage('assistant', rawValue);
        setConversation(sofar => [...sofar, reply]);

        const code = removeCodeWrapping(rawValue);
        const selectedFrameworkName = 'next-tailwind';

            // handle all other export frameworks
            const translatedCode = await fetch("/api/export-code", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: code,
                    framework : selectedFrameworkName
                }),
            });
        
            console.log("Edge function returned.");
        
            if (!translatedCode.ok) {
                throw new Error(translatedCode.statusText);
            }
        
            // This data is a ReadableStream
            const translatedCodeData = translatedCode.body;
            if (!translatedCodeData) {
                return;
            }
        
            const readerData = translatedCodeData.getReader();
            const decoderData = new TextDecoder();
            const {value: translatedCodeValue} = await readerData.read();
            const newCode = decoderData.decode(translatedCodeValue)
        
            setExportedGeneratedCode(newCode);

        setGeneratedCode(code);
        clear();
        setLoading(false);
    }, [conversation]);

    const restart = useCallback(() => {
        setConversation([]);
        setGeneratedCode("");
        setLoading(false);
        clear();
    }, []);

    return { exportedGeneratedCode, isLoading, generateUI, generatedCode, restart };

}
