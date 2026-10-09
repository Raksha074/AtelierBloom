import { createServerFn } from "@tanstack/react-start";
import { floralDesigns } from "@/data/flowers";

export interface RecommendationInput {
  occasion: string;
  colors: string;
  budget: number;
  notes: string;
}

export interface Recommendation {
  summary: string;
  picks: { name: string; reason: string }[];
  customIdea: string;
}

const schema = {
  type: "object",
  additionalProperties: false,
  required: ["summary", "picks", "customIdea"],
  properties: {
    summary: { type: "string" },
    picks: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["name", "reason"],
        properties: { name: { type: "string" }, reason: { type: "string" } },
      },
    },
    customIdea: { type: "string" },
  },
};

export const recommendArrangements = createServerFn({ method: "POST" })
  .validator((data: RecommendationInput) => ({
    occasion: String(data.occasion ?? "").slice(0, 80),
    colors: String(data.colors ?? "").slice(0, 200),
    budget: Math.max(0, Math.min(5000, Number(data.budget) || 0)),
    notes: String(data.notes ?? "").slice(0, 500),
  }))
  .handler(async ({ data }): Promise<Recommendation> => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("The flower finder isn't set up yet.");

    // Give the model our real catalog so it only recommends what we make.
    const catalog = floralDesigns
      .map(
        (d) =>
          `- ${d.name} (${d.occasion}, ${d.price ? `from $${d.price}` : "made to order"}): ${d.description}`,
      )
      .join("\n");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": apiKey,
        "X-Lovable-AIG-SDK": "fetch",
      },
      body: JSON.stringify({
        model: "openai/gpt-6-astra",
        stream: true,
        store: false,
        reasoning: { effort: "low" },
        instructions: `You are the warm, thoughtful florist at Atelier Bloom, a botanical studio in Portland. Recommend 1 to 3 arrangements from this catalog only, using exact names:\n${catalog}\n\nRespect the shopper's budget when prices are listed. Keep the summary to two sentences, each reason to one sentence, and offer one short custom bouquet idea matching their colors.`,
        input: `Occasion: ${data.occasion}\nColor preferences: ${data.colors || "no preference"}\nBudget: $${data.budget}\nNotes: ${data.notes || "none"}`,
        text: { format: { type: "json_schema", name: "recommendation", strict: true, schema } },
      }),
    });

    if (!response.ok || !response.body) {
      if (response.status === 429) throw new Error("We're a little busy — please try again in a minute.");
      if (response.status === 402)
        throw new Error("The flower finder is out of AI credits for now. Please try again later.");
      throw new Error("We couldn't gather recommendations right now.");
    }

    // Read the stream and collect the generated text.
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let text = "";
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        if (!line.startsWith("data:")) continue;
        const payload = line.slice(5).trim();
        if (!payload || payload === "[DONE]") continue;
        try {
          const event = JSON.parse(payload);
          if (event.type === "response.output_text.delta") text += event.delta;
          if (event.type === "error" || event.type === "response.failed")
            throw new Error("We couldn't gather recommendations right now.");
        } catch (error) {
          if (error instanceof SyntaxError) continue;
          throw error;
        }
      }
    }

    const result = JSON.parse(text) as Recommendation;
    const known = new Set(floralDesigns.map((d) => d.name));
    result.picks = result.picks.filter((pick) => known.has(pick.name)).slice(0, 3);
    return result;
  });
