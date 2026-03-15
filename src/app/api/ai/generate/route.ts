export const dynamic = "force-dynamic";

import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { buildPrompt } from "@/lib/ai/prompts";
import { CrmEntity, WorkflowType } from "@/lib/ai/types";

const anthropic = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      workflow,
      entity,
      fields,
      additionalContext,
    }: {
      workflow: WorkflowType;
      entity?: CrmEntity;
      fields: Record<string, string>;
      additionalContext?: string;
    } = body;

    const { system, user } = buildPrompt(workflow, fields, entity, additionalContext);

    const stream = anthropic.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system,
      messages: [{ role: "user", content: user }],
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`)
              );
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (err) {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ error: "Stream error occurred" })}\n\n`
            )
          );
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error: any) {
    console.error("AI generation error:", error);
    return Response.json(
      { error: error.message || "Failed to generate content" },
      { status: 500 }
    );
  }
}
