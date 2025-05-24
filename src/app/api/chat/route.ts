import { streamText } from "ai";
import { deepseek } from "@/lib/ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: deepseek("deepseek-chat"),
    system: "You are a helpful assistant.",
    messages,
  });

  return result.toDataStreamResponse();
}
