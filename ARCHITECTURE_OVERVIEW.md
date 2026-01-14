# Technical Architecture: Instant AI Portfolio Engine

## 1. System Philosophy
The architecture is designed for **High Throughput** and **Low Latency** site generation. It follows a "Headless CMS + Generative Design" approach where the AI acts as the creative director, and a specialized engine acts as the developer.

## 2. Core Tech Stack
- **Frontend:** Next.js (App Router), TailwindCSS, Framer Motion.
- **Backend API:** Node.js (NestJS) for orchestration / FastAPI for AI heavy-lifting.
- **Database:** PostgreSQL (Supabase) for relational data, Vector DB (Pinecone/Milvus) for style matching.
- **AI Processing:** OpenAI GPT-4o (Reasoning), Vision API (Asset Analysis), Midjourney/DALL-E 3 (Placeholder generation).
- **Deployment & Edge:** Vercel (Edge Functions & ISR) + AWS S3/CloudFront.
- **Queueing:** BullMQ / Redis for asynchronous site building.

## 3. High-Level Flow
1. **Ingestion:** User uploads assets (images/text).
2. **Analysis:** AI Vision analyzes color palettes, composition, and professional category.
3. **Synthesis:** AI generates a "Site Manifest" (JSON structure).
4. **Hydration:** Site Engine maps Manifest to React Components.
5. **Deployment:** Static Site Generation (SSG) with immediate preview.