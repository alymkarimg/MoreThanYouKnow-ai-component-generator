import {
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
  const { code } = (await req.json()) as {
    code: string;
  };

  if (!code) {
    return new Response("No code in the request", { status: 400 });
  }

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content:
          `Modify the following code:'${code}' so that all of the inline styles are passed as props to the component. Please create a complete next.js component. Please store the props in a variable called 'theme' outside the component`,
      },
      {
        role: "assistant",
        content: `
                    import React from 'react';

                    const theme = {
                        prop1: { "display": "flex", "flexDirection": "column", "placeItems": "center", "height": "100vh" },
                        prop2: { "fontSize": "1.9rem", "lineHeight": "2.3rem", "fontWeight": "bold", "marginBottom": "1rem" },
                        prop3: { "fontSize": "1.13rem", "lineHeight": "1.8rem", "marginBottom": "1rem" },
                        prop4: { "backgroundColor": "purple", "color": "white", "paddingInline": "1rem", "paddingBlock": "0.5rem" }
                    }

                    const MyComponent = () => {
                      return (
                        <div style={theme.prop1}>
                          <h1 style={theme.prop2}>Hello World</h1>
                          <p style={theme.prop3}>Welcome to my Next.js component using Tailwind CSS</p>
                          <button style={theme.prop4}>Click Me</button>
                        </div>
                      );
                    };
                    export default MyComponent;
                `,
      },
      { role: "user", content: "DO NOT wrap the returned code with ```" },
      { role: "user", content: "DO NOT start the returned code with 'html' "},
    ],
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

export default handler;
