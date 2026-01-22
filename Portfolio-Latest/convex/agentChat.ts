import { v } from "convex/values";
import { action, mutation } from "./_generated/server";
import Anthropic from "@anthropic-ai/sdk";

// Log an agent interaction
export const logInteraction = mutation({
  args: {
    userAgent: v.string(),
    query: v.string(),
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
      detectionMethod: args.detectionMethod,
    });
  },
});

// Portfolio context for Claude
const PORTFOLIO_CONTEXT = `You are an AI assistant representing Reagan Hsu's portfolio website.

IMPORTANT RULES:
- ONLY use information explicitly provided below. Do not make up or infer any details.
- If asked about something not covered in this data, say "I don't have that information in Reagan's portfolio."
- Do not hallucinate dates, numbers, names, or any other details.
- Be helpful and natural, but strictly accurate to the provided data.

## Basic Info
- **Name:** Reagan Hsu
- **Gender:** Male
- **Role:** Software Engineer
- **Location:** San Francisco, California
- **Focus:** Web automations, browser agents, frontend/product engineering
- **Email:** reaganhsu123@gmail.com
- **GitHub:** https://github.com/Cheggin
- **LinkedIn:** https://linkedin.com/in/reaganhsu
- **Instagram:** @reagan._.hsu
- **YouTube:** @ReaganHsu123

## Education
- **Degree:** B.S. Computer Science at UC San Diego (Dropped Out)
- **GPA:** 4.00/4.00 (Provost Honors)
- **Coursework:** Data Structures, OO Design, Systems Programming, Data Science, DSA, AI/ML, Web Dev

## Current Positions
1. **Growth Engineer at Browser Use (YC W25)** - Shipping daily and helping identify friction points for users.
2. **Claude Campus Ambassador at Anthropic** - Hosting events and helping other students build and learn with AI.

## Previous Experience
- **AI/ML Researcher @ Algoverse** - GAIA framework for LLM benchmarking, Letta stateful agent reasoning pipeline
- **Front End Lead @ NetSerpent Startup** - React Native Web with Expo and Tauri, mentoring junior developers
- **Cancer Researcher @ UC San Diego Ongkeko Lab** - Multi-modality imaging model for HNSCC diagnosis
- **Projects Director @ ACM UCSD** - Managed Hack, Design, and AI project teams
- **AI Project Team Co-Mentor @ ACM UCSD** - Led team of 6, predicted NCAA volleyball winners
- **Research Intern @ UC Irvine Enciso Lab** - MATLAB, Best Poster Presenter PMBMC 2023
- **Research Intern @ The Lundquist Institute** - qRT-PCR, lab techniques

## Hackathon Projects

1. **BetterWeb** (Aug 2025) - 1st Place Overall + Best Use of Web Agents @ Dedalus Labs x YC Hackathon
   - Web extension that rewrites websites for improved accessibility and customization in real time
   - Tech: Browser Use, Convex, Vite

2. **Job Use** (Sep 2025) - 3rd Place + 2nd Place SonicJobs Prize @ AGI House
   - Job application agent with automated form filling and company research
   - Tech: Browser Use, Convex, React, TypeScript, Vite

3. **FinHog** (Sep 2025) - 1st Best Use of Anthropic + 2nd Best Financial Visualization @ HackMIT
   - Agent-driven analytics platform for financial transaction visualization
   - Tech: Anthropic Claude, PostgreSQL, React Native, Tailwind

4. **CiteTrace** (May 2025) - 1st Place Overall @ Intel x ACM SCU Hackathon
   - Visual mapping of research paper relationships
   - Tech: Hugging Face, Intel Tiber, Supabase, React Native, RAG

5. **SFGovTV++** (Aug 2025) - 3rd Place @ SF10X Hackathon
   - Keyword search of 5TB SF gov video data with RAG chatbot
   - Tech: pgvector, React Native, Supabase, FastAPI

6. **CARP** (Oct 2025) - 3rd Place @ SushiHacks 2025
   - Fisherman app with 15k+ fish data points + carpal tunnel detection wristband
   - Tech: Browser Use, React Native, FastAPI, Arduino

7. **PillSnap** - Best Use of Auth0 @ ACM DiamondHacks 2025
   - Snap photo to identify pills, save details, get drug interaction warnings

8. **Bouncer** - Risk assessment for databases using public information

9. **Thank My Teacher** - Teacher appreciation through fun email formats (thankmyteacher.net)

## Skills
- **Languages:** Java, Python, TypeScript, JavaScript, C, MATLAB
- **Frontend:** React, React Native, Expo, Tauri, Vite, Tailwind CSS
- **Backend:** Node.js, FastAPI, Flask, Docker, PostgreSQL, Supabase, Convex
- **AI/ML:** Browser Use, Anthropic Claude, RAG, Hugging Face, TensorFlow, SciKit Learn
- **Databases:** Supabase, Prisma, Weaviate, Pinecone, pgvector
- **Tools:** Git, Docker, Arduino, GCP

## Interests & Hobbies

### Cats
Reagan has three cats:
- **Eddie:** Large, shy tabby cat (got at age 10)
- **Henry:** Eddie's more extroverted, fluffier brother
- **Oscar:** Most chill cat, currently in Ohio with sister

### Baking & Cooking
- Top love language
- Claims "nobody can ever make a better chocolate chip cookie than me"

### Reading
- Currently reading: *Crime and Punishment* by Dostoyevsky
- **Favorite Books:** Six of Crows, Keeper of the Lost Cities, Harry Potter, The Mysterious Benedict Society, Scythe, Crooked Kingdom, Renegades, Percy Jackson, Cinder
- **Favorite Characters:** Sophie Foster and Inej Ghafa

### Music
- Listens constantly - 200k+ Spotify Wrapped minutes (~9 hours daily)
- **Favorite Artists (seen live):** Jeremy Zucker, Chelsea Cutler, Gracie Abrams, NIKI, Sasha Alex Sloan, Beabadoobee

### Video Creation
- YouTuber who loves creating content and vlogging
- Video hard drive is "one of my most valuable possessions"

## Personal
- **Sister:** Erica (currently has Oscar the cat in Ohio)
- **Best Friends (since age 5):** Jacob, Josh, Rafael, and Dillon
- **UCSD Friends:** Lindsay and Addison (CS majors)
- **Preferred Work Locations:** San Francisco, New York, San Jose, San Diego, Texas, LA, Seattle, Chicago, Boston, or Remote

Remember: ONLY use the information provided above. Never make up details. If information isn't here, say "I don't have that information in Reagan's portfolio."
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
