export type Reel = {
  id: string;
  handle: string;
  title: string;
  caption: string;
  tags: string[];
  bucket: string;
  seconds: number;
};

export const SAMPLE_REELS: Reel[] = [
  {
    id: "r1",
    handle: "@byte.jokes",
    title: "Java devs writing 40 lines to print Hello World",
    caption:
      "public static void main(String[] args) — POV: you just wanted a print statement. #java #devlife",
    tags: ["java", "meme", "verbosity"],
    bucket: "Programming memes",
    seconds: 21,
  },
  {
    id: "r2",
    handle: "@notyouraveragedev",
    title: "A day in my life as a software engineer (Bangalore)",
    caption:
      "9am standup, 3 code reviews, one prod incident, gym at 8. Silent vlog, real timeline.",
    tags: ["lifestyle", "software engineer", "vlog"],
    bucket: "SDE lifestyle",
    seconds: 48,
  },
  {
    id: "r3",
    handle: "@interview.pain",
    title: "Interviewer: reverse a linked list. Me: internally screaming",
    caption:
      "Round 2 was 'easy' they said. Two pointers and a prayer. #interview #dsa #relatable",
    tags: ["interview", "dsa", "joke"],
    bucket: "Coding interview humour",
    seconds: 17,
  },
  {
    id: "r4",
    handle: "@gearpickr",
    title: "₹70k laptop for coding: thin-and-light vs thermals",
    caption:
      "Ran a 400-file build on both. One throttled at minute 4. Ports, RAM ceiling, repairability.",
    tags: ["laptop", "hardware", "comparison"],
    bucket: "Gadgets",
    seconds: 62,
  },
  {
    id: "r5",
    handle: "@cafe.hopper",
    title: "This street food stall broke my spice tolerance",
    caption: "Bite 3 and I was sweating. Location in comments.",
    tags: ["food", "entertainment"],
    bucket: "Entertainment",
    seconds: 29,
  },
  {
    id: "r6",
    handle: "@clutchframe",
    title: "1v4 clutch with 6 HP and no shield",
    caption: "Crosshair placement is everything. Sound on for the comms.",
    tags: ["gaming", "fps", "clutch"],
    bucket: "Gaming",
    seconds: 34,
  },
  {
    id: "r7",
    handle: "@modelwatch",
    title: "Why the new open-weights model matters for students",
    caption:
      "Runs on 8GB VRAM, license allows projects. What it can and cannot do, honestly.",
    tags: ["ai", "models", "news"],
    bucket: "Tech news",
    seconds: 55,
  },
  {
    id: "r8",
    handle: "@buildlogs",
    title: "I rate-limited my side project and traffic stopped killing it",
    caption: "Token bucket in 30 lines, Redis optional. Before/after latency graphs.",
    tags: ["backend", "systems", "coding"],
    bucket: "Coding",
    seconds: 51,
  },
];

export const CATEGORIES = [
  "AI",
  "DSA",
  "Java",
  "HLD",
  "Cybersecurity",
  "Cloud",
  "Hardware",
  "Career",
  "Other",
] as const;