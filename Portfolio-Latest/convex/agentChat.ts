import { v } from "convex/values";
import { action, mutation } from "./_generated/server";
import Anthropic from "@anthropic-ai/sdk";

// Log an agent interaction
export const logInteraction = mutation({
  args: {
    userAgent: v.string(),
    query: v.string(),
    responseType: v.union(v.literal("predefined"), v.literal("llm")),
    detectionMethod: v.union(
      v.literal("userAgent"),
      v.literal("queryParam"),
      v.literal("trigger")
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("agentInteractions", {
      timestamp: Date.now(),
      userAgent: args.userAgent,
      query: args.query,
      responseType: args.responseType,
      detectionMethod: args.detectionMethod,
    });
  },
});

// Portfolio context for Claude
const PORTFOLIO_CONTEXT = `
You are an AI assistant representing Reagan Hsu's portfolio website. You have access to the following information about Reagan:

## Personal Info
- Name: Reagan Hsu
- Role: Software Engineer
- Bio: Hey, I'm Reagan! I'm a software engineer currently trying to build the future of web automations with browser agents. I love working on products to make them seamless for users and making people's lives better via software.
- Current Focus: My day-to-day work mostly spans frontend development and product engineering. However, I'm comfortable working around the stack!

## Current Work
- Growth Engineer at Browser Use (YC W25): Shipping daily and helping identify friction points for users.
- Claude Campus Ambassador at Anthropic: Hosting events and helping other students build and learn with AI.

## Contact
- Email: reaganhsu123@gmail.com
- GitHub: https://github.com/Cheggin
- LinkedIn: https://linkedin.com/in/reaganhsu

## Projects (Hackathon Wins)

1. BetterWeb (Aug. 2025)
   - Award: 1st Place Overall + Best Use of Web Agents @ Dedalus Labs (YC S25) x YC Agents Hackathon
   - Description: A web extension that rewrites websites for improved accessibility and customization in real time using deep agentic search and user-focused UI reconstruction.
   - Tech: Browser Use, Convex, Vite

2. Job Use (Sep. 2025)
   - Award: 3rd Place + 2nd Place SonicJobs Prize @ AGI House Web Agent Build Day
   - Description: A job application agent that fills out any job application form in real time with automated form filling, profile creation, and company research.
   - Tech: Browser Use, Convex, React, TypeScript, Vite

3. FinHog (Sep. 2025)
   - Award: 1st Place Best Use of Anthropic + 2nd Place Best Financial Visualization Agent @ HackMIT
   - Description: An agent-driven analytics platform that automatically generates and adapts visualizations for financial transaction data in real-time.
   - Tech: Anthropic Claude, PostgreSQL, React Native, Tailwind CSS

4. CiteTrace (May 2025)
   - Award: 1st Place Overall @ Intel x ACM SCU Hackathon
   - Description: An app that visually maps how research ideas, methods, and concepts relate across academic papers for easier comprehension.
   - Tech: Hugging Face, Intel Tiber, Supabase, React Native, RAG

5. SFGovTV++ (Aug. 2025)
   - Award: 3rd Place Overall @ SF10X Hackathon
   - Description: Makes civic engagement accessible through keyword search of 5TB of SF government video data with RAG chatbot assistance.
   - Tech: pgvector, React Native, Supabase, FastAPI

6. CARP (Oct. 2025)
   - Award: 3rd Place Overall @ SushiHacks 2025
   - Description: CARP is an all-in-one app for fishermen, processing >15k fish data points to optimize fishing location while providing a wrist brace to detect carpal tunnel syndrome early.
   - Tech: Browser Use, React Native, FastAPI, Arduino

## Skills
- Frontend: React, TypeScript, Tailwind CSS, Vite, React Native
- Backend: Node.js, FastAPI, PostgreSQL, Supabase, Convex
- AI/ML: Browser Use, Anthropic Claude, RAG, Hugging Face
- Tools: Git, Docker, Arduino

Answer questions about Reagan helpfully and accurately based on this information. If asked about something not covered here, politely explain that you don't have that information but can help with what you know about Reagan's work and experience.
`;

// Call Claude API for complex queries
export const askClaude = action({
  args: {
    query: v.string(),
  },
  handler: async (_, args) => {
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return {
        success: false,
        error: "Claude API not configured",
        response: null,
      };
    }

    try {
      const anthropic = new Anthropic({ apiKey });

      const message = await anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        system: PORTFOLIO_CONTEXT,
        messages: [
          {
            role: "user",
            content: args.query,
          },
        ],
      });

      const textContent = message.content.find((block) => block.type === "text");
      const response = textContent ? textContent.text : "No response generated";

      return {
        success: true,
        error: null,
        response,
      };
    } catch (error) {
      console.error("Claude API error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        response: null,
      };
    }
  },
});
