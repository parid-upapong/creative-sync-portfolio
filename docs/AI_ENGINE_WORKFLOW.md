# AI Engine Workflow: From Assets to Aesthetics

This document describes the internal pipeline that powers the "Instant Site Generation" feature.

## Pipeline Overview

1.  **Ingestion & CV Analysis (Python/FastAPI):**
    - Raw assets are sent to the `cv_service`.
    - **CLIP Analysis:** Generates semantic embeddings to understand the "vibe" (e.g., "dark architectural photography").
    - **K-Means Clustering:** Extracts the dominant color palette.
    - **Object Detection:** Identifies focal points to ensure smart cropping in the UI.

2.  **Context Aggregation (Node.js/Prisma):**
    - The system aggregates all metadata from the user's selected projects.
    - User profile data (bio, social links) is injected into the context window.

3.  **Layout Synthesis (GPT-4o / Layout Composition Engine):**
    - The system prompt (`layout_composition_engine.yaml`) is invoked.
    - **Input:** Aggregated metadata, user preference (e.g., "Minimalist"), and technical constraints.
    - **Output:** A structured JSON object defining the `Spatial Rhythm`, `Typography Selection`, and `Motion Patterns`.

4.  **Dynamic Rendering (Next.js/Tailwind):**
    - The frontend receives the JSON schema.
    - The `Dynamic Styling Engine` maps design tokens to Tailwind classes.
    - Framer Motion sequences are initialized based on the `Motion Patterns` defined by the AI.

## Flow Diagram (Abstract)
[User Uploads] -> [CV Service (CLIP/OpenCV)] -> [Context Store] -> [LLM Art Director] -> [Layout JSON] -> [React Hydration]