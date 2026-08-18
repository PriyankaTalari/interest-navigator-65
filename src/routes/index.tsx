import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Loader2, Play, Sparkles, ShieldAlert, RotateCcw } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { SAMPLE_REELS, type Reel } from "@/lib/reels";
import { recommendTechReel } from "@/lib/recommend.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Algorithm Knows You Too Well — Reel Interest Agent" },
      {
        name: "description",
        content:
          "An AI agent that reads the Reels a student watches, infers the real underlying interest, and recommends useful tech Reels instead of hype content.",
      },
      { property: "og:title", content: "The Algorithm Knows You Too Well" },
      {
        property: "og:description",
        content:
          "Turn mindless scrolling into useful tech learning: interest inference over keyword matching, hype filtered out.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Watch = { reel: Reel; watchedPercent: number };

function Index() {
  const run = useServerFn(recommendTechReel);
  const [history, setHistory] = useState<Watch[]>([]);
  const [engagement, setEngagement] = useState(85);

  const mutation = useMutation({
    mutationFn: (vars: { current: Reel; history: Watch[] }) => run({ data: vars }),
  });

  const watch = (reel: Reel) => {
    const nextHistory = [{ reel, watchedPercent: engagement }, ...history].slice(0, 8);
    setHistory(nextHistory);
    mutation.mutate({ current: reel, history: history.slice(0, 7) });
  };

  const rec = mutation.data;

  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <header className="max-w-2xl">
        <Badge variant="outline" className="border-label/40 text-label">
          Interest inference agent
        </Badge>
        <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
          The algorithm knows you <span className="text-gradient">too well</span>
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          Watch a few Reels below. The agent reads topic, context and how much you actually
          watched, infers the interest underneath the scroll, and recommends one genuinely
          useful tech Reel — no keyword matching, no “10 AI tools that will get you a job”.
        </p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_1fr]">
        <section>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-label">Your feed</h2>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="whitespace-nowrap">Watched {engagement}%</span>
              <Slider
                value={[engagement]}
                onValueChange={(v) => setEngagement(v[0] ?? 85)}
                min={10}
                max={100}
                step={5}
                className="w-32"
              />
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {SAMPLE_REELS.map((reel) => (
              <Card key={reel.id} className="panel p-4 transition-shadow hover:glow">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{reel.handle}</span>
                  <span>{reel.seconds}s</span>
                </div>
                <h3 className="mt-2 text-sm font-semibold leading-snug">{reel.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {reel.caption}
                </p>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <Badge className="bg-feed-category text-[11px] text-feed-category-foreground hover:bg-feed-category/90">
                    {reel.bucket}
                  </Badge>

                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-primary hover:bg-primary/10"
                    onClick={() => watch(reel)}
                    disabled={mutation.isPending}
                  >
                    <Play className="size-3.5" /> Watch
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {history.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-muted-foreground">
                  Watch history ({history.length})
                </h3>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-muted-foreground"
                  onClick={() => {
                    setHistory([]);
                    mutation.reset();
                  }}
                >
                  <RotateCcw className="size-3.5" /> Reset
                </Button>
              </div>
              <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
                {history.map((h, i) => (
                  <li key={`${h.reel.id}-${i}`} className="flex justify-between gap-3">
                    <span className="truncate">{h.reel.title}</span>
                    <span className="shrink-0 text-primary/80">{h.watchedPercent}%</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <section className="lg:sticky lg:top-10 lg:self-start">
          <h2 className="text-xl font-semibold text-label">Agent output</h2>

          {mutation.isPending && (
            <Card className="output-panel glow mt-5 flex items-center gap-3 p-6 text-sm text-white/80">
              <Loader2 className="size-4 animate-spin text-label" />
              Reading the signal behind that reel…
            </Card>
          )}

          {mutation.isError && !mutation.isPending && (
            <Card className="output-panel glow mt-5 p-6 text-sm text-white">
              <p className="flex items-center gap-2 font-semibold text-destructive">
                <ShieldAlert className="size-4" /> The agent could not respond
              </p>
              <p className="mt-2 text-white/80">{(mutation.error as Error).message}</p>
            </Card>
          )}

          {!mutation.isPending && !rec && !mutation.isError && (
            <Card className="output-panel glow mt-5 p-6 text-sm text-white/80">
              Watch a Java meme, an SDE lifestyle vlog, an interview joke and a laptop
              comparison — then see whether the agent says “Java” or “software engineering”.
            </Card>
          )}

          {rec && !mutation.isPending && (
            <Card className="output-panel glow mt-5 space-y-4 p-6 text-white">
              <Field label="Current reel" value={rec.currentReel} />
              <Field label="Interest detected" value={rec.interestDetected} />
              <Field label="Why" value={rec.why} />
              <div className="h-px bg-white/20" />
              <Field label="Recommended tech reel" value={rec.recommendedTechReel} />
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-black text-white hover:bg-black/90">{rec.category}</Badge>
                <Badge className="bg-black text-white hover:bg-black/90">{rec.difficulty}</Badge>
                <Badge className="bg-black text-white hover:bg-black/90">
                  Confidence: {rec.confidence}
                </Badge>
              </div>
              <Field label="Why this recommendation" value={rec.whyThisRecommendation} />
              {rec.avoidedHype && (
                <div className="rounded-lg border border-label/30 bg-black/20 p-3">
                  <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-label">
                    <Sparkles className="size-3.5" /> Hype rejected
                  </p>
                  <p className="mt-1.5 text-sm text-white/90">{rec.avoidedHype}</p>
                </div>
              )}
            </Card>
          )}
        </section>
      </div>
    </main>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wide text-label">{label}</p>
      <p className="mt-1 text-sm leading-relaxed text-white">{value}</p>
    </div>
  );
}
