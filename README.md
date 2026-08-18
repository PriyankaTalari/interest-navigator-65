# Sparked Interests

THE ALGORITHM KNOWS YOU TOO WELL

PROBLEM STATEMENT

Students spend significant time scrolling short-form content. Much of it may be harmless entertainment but provide little educational or career value.

Build an AI-powered recommendation agent that analyzes the Reels a student interacts with, infers their underlying interests, and recommends engaging technology-related Reels that match those interests. The agent should understand topic, context and apparent interest — not rely on simple keyword matching. The goal is not to stop social media use, but to make existing scrolling more useful.

SAMPLE INPUTS

6–8 fictional/anonymized Reels covering entertainment, gaming, coding, AI, gadgets, career, programming memes and tech news.

BUILT-IN TRAP

A student watches a Java meme, software-engineer lifestyle Reel, coding interview joke and laptop comparison. A shallow system recommends another generic Java Reel. A stronger agent should infer the broader interest — e.g., software engineering/technology — and recommend useful tech content. It must also avoid blindly recommending hype content such as “10 AI tools that will get you a job.”

REQUIRED OUTPUT

CURRENT REEL: [reference]

INTEREST DETECTED: [topic / interest]

WHY: [evidence from content]

RECOMMENDED TECH REEL: [topic/title]

CATEGORY: [AI / DSA / Java / HLD / Cybersecurity / Cloud / Hardware / Career / Other]

WHY THIS RECOMMENDATION: [connection to interest]

DIFFICULTY: [Beginner / Intermediate / Advanced]

CONFIDENCE: [High / Medium / Low]

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://interest-navigator-65.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/79076c82-d147-46cf-b56d-48366d521c8f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
