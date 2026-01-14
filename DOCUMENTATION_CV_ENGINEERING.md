# Computer Vision Module: Asset Analysis & Metadata Extraction

## Overview
This service acts as the "eyes" of the platform. When a creative uploads their work, this module analyzes the visual content to drive the automated design process.

## Key Features
1.  **Semantic Tagging:** Uses OpenAI's CLIP model to understand the context of the image (e.g., distinguishing between a "UI design" and "portrait photography") without manual user input.
2.  **Color Intelligence:** Extracts a 5-color palette using K-Means clustering. This palette is fed into the frontend generation engine to ensure the website theme matches the uploaded work.
3.  **Compositional Metrics:** 
    - **Brightness/Contrast:** Determines if a "Dark Mode" or "Light Mode" theme should be defaulted.
    - **Aspect Ratio:** Informs the layout engine whether to use a horizontal slider, a masonry grid, or a full-width hero section.

## Integration Flow
1.  User uploads images to the `Next.js` frontend.
2.  Frontend sends raw files to `Node.js` Orchestrator.
3.  Orchestrator calls this `CV Service` (/analyze).
4.  Returned metadata is stored in PostgreSQL and used by the GPT-4o Design Agent to generate the final site structure.

## Technical Requirements
- **Hardware:** Works on CPU, but GPU (CUDA) is recommended for high-concurrency batch processing of large portfolios.
- **Model:** CLIP (Contrastive Language-Image Pre-training) provides zero-shot classification capabilities, allowing us to add new portfolio categories without retraining the model.