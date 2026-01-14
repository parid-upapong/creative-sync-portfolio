# AI Orchestration Logic: Bridging Layout & Narrative

To achieve the "Magic" alternative promised in the Strategic Vision, the system must synchronize the **Layout Composition Engine** and the **Content Narrative Engine**.

## 1. The Workflow Loop
1.  **Ingestion:** User uploads assets.
2.  **Analysis:** `CV_Service` extracts metadata (colors, tags, composition).
3.  **Narrative Generation:** 
    - Input: Metadata + User Intent.
    - Output: Content JSON (headlines, project stories).
4.  **Layout Generation:**
    - Input: Metadata + Content Length (from step 3).
    - Output: Structural JSON (components, spacing, CSS).
5.  **Assembly:** The Frontend (Next.js) consumes both JSONs to render the site.

## 2. Dynamic Constraint Mapping
| Narrative Attribute | Layout Response |
| :--- | :--- |
| High Word Count | Increase vertical whitespace, use multi-column text. |
| Minimalist Copy | Use large-scale typography (Display fonts), centered layouts. |
| Bold/Action Tone | Use high-contrast color pairings, faster motion transitions. |
| Technical/Detailed | Grid-based structures, sidebar navigation for deep-diving. |

## 3. Feedback Loop (The "Refine" Button)
If the user requests a "Change Style," the system doesn't just swap a CSS file. It re-triggers the **Layout Composition Engine** with a new `aesthetic_anchor` (e.g., "From Minimal to Maximalist"), while keeping the **Narrative Engine**'s output intact but reformatted for the new space.