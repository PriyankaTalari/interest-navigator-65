import type { Reel } from "./reels";

export type Recommendation = {
  currentReel: string;
  interestDetected: string;
  why: string;
  recommendedTechReel: string;
  category: string;
  whyThisRecommendation: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  confidence: "High" | "Medium" | "Low";
  avoidedHype?: string;
};

const SYSTEM = `You are a recommendation agent for students who scroll short-form video.

Your job: read a student's recent reel watch history, infer the UNDERLYING interest (topic + context + apparent motivation), and recommend ONE genuinely useful technology reel.

Hard rules:
1. Do NOT keyword-match. If they watched a Java meme, do not recommend "another Java meme" or a generic "Java tutorial" unless the evidence really points at Java the language itself. Infer the broader theme (e.g. software engineering craft, interview prep, systems thinking, dev hardware).
2. Never recommend hype/clickbait content: no "10 AI tools that will get you a job", "learn X in 3 hours and get 20LPA", no fear-mongering, no tool listicles, no dropshipping-style career bait. Prefer concrete, teachable, project-grounded topics.
3. Ground the recommendation in the student's demonstrated level. Interview jokes + memes => likely early-career/student: Beginner or Intermediate.
4. Respect entertainment: if history is mostly non-tech, still bridge honestly from the real signal (e.g. gaming => how netcode works) and lower confidence.
5. WHY must cite specific evidence from the watched reels (titles/captions/behaviour), not generic statements.
6. Recommend a plausible, specific reel topic with a concrete title — something a real tech creator could film in 60 seconds.
7. Weight the WHOLE session, not just the last reel. If several reels point at one broader theme (e.g. Java meme + SDE vlog + interview joke + dev laptop => software engineering as a craft and career), recommend for that broader theme, even when the current reel's surface topic is narrower. Only go narrow when the history genuinely converges on that narrow topic.

Return ONLY JSON matching:
{"currentReel":string,"interestDetected":string,"why":string,"recommendedTechReel":string,"category":"AI|DSA|Java|HLD|Cybersecurity|Cloud|Hardware|Career|Other","whyThisRecommendation":string,"difficulty":"Beginner|Intermediate|Advanced","confidence":"High|Medium|Low","avoidedHype":string}

avoidedHype = one short line naming the shallow/hype recommendation you deliberately rejected and why.`;

function describe(reel: Reel, watchedFor?: number) {
  return `- [${reel.id}] ${reel.handle} · ${reel.bucket} · ${reel.seconds}s
  Title: ${reel.title}
  Caption: ${reel.caption}
  Tags: ${reel.tags.join(", ")}${
    watchedFor !== undefined ? `\n  Watched: ${watchedFor}% of the reel` : ""
  }`;
}

export async function generateRecommendation(input: {
  history: { reel: Reel; watchedPercent: number }[];
  current: Reel;
}): Promise<Recommendation> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) throw new Error("AI is not configured for this app (missing key).");

  const prompt = `CURRENT REEL (just watched):
${describe(input.current)}

EARLIER IN THIS SESSION (most recent first):
${
  input.history.length
    ? input.history.map((h) => describe(h.reel, h.watchedPercent)).join("\n")
    : "(no earlier reels — infer from the current reel alone and lower confidence)"
}

Infer the underlying interest and produce the JSON.`;

  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Lovable-API-Key": apiKey,
      "X-Lovable-AIG-SDK": "fetch",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    let message = body;
    try {
      message = JSON.parse(body)?.error?.message ?? JSON.parse(body)?.message ?? body;
    } catch {
      /* keep raw body */
    }
    if (res.status === 429) throw new Error("The agent is rate limited. Try again in a moment.");
    if (res.status === 402)
      throw new Error(message || "AI credits are exhausted — the app owner needs to add credits.");
    throw new Error(message || `AI request failed (${res.status}).`);
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("The agent returned an empty response.");
  return JSON.parse(content) as Recommendation;
}