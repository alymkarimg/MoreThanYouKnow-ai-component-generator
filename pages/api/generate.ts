import {
  ChatGPTMessage,
  OpenAIStream,
  OpenAIStreamPayload,
} from "../../utils/OpenAIStream";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  const { messages } = (await req.json()) as {
    messages?: ChatGPTMessage[];
  };

  if (!messages) {
    return new Response("No prompt in the request", { status: 400 });
  }

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content:
          "create next.js code with inline styles for a button 200 x 100, light purple background, generate text on it. Please create a complete next.js component",
      },
      {
        role: "assistant",
        content: `
                    import React from 'react';
                    const MyComponent = () => {
                      return (
                        <div style={{ "display": "flex", "flexDirection": "column", "placeItems": "center", "height": "100vh" }}>
                          <h1 style={{ "fontSize": "1.9rem", "lineHeight": "2.3rem", "fontWeight": "bold", "marginBottom": "1rem" }}>Hello World</h1>
                          <p style={{ "fontSize": "1.13rem", "lineHeight": "1.8rem", "marginBottom": "1rem" }}>Welcome to my Next.js component using Tailwind CSS</p>
                          <button style={{ "backgroundColor": "purple", "color": "white", "paddingInline": "1rem", "paddingBlock": "0.5rem" }}>Click Me</button>
                        </div>
                      );
                    };
                    export default MyComponent;
                `,
      },
      {
        role: "user",
        content:
          "Please create html code with inline css that creates the following component, Material UI look and feel, return only code",
      },
      { role: "user", content: "DO NOT wrap the returned code with ```" },
      { role: "user", content: "DO NOT start the returned code with 'html' "},
      ...messages,
    ],
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

export default handler;
