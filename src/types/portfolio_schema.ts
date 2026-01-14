/**
 * Unified Schema for the AI-Generated Portfolio
 * This bridges the output from both engines.
 */

export interface PortfolioSchema {
  metadata: {
    generated_at: string;
    version: string;
    aesthetic_profile: 'minimal' | 'bold' | 'classic' | 'brutalist';
  };
  design: {
    colors: {
      background: string;
      foreground: string;
      accent: string;
    };
    typography: {
      heading_font: string;
      body_font: string;
      base_size: string;
    };
    layout_structure: LayoutSection[];
  };
  content: {
    brand_identity: {
      name: string;
      tagline: string;
      bio_short: string;
    };
    projects: ProjectContent[];
  };
}

interface LayoutSection {
  id: string;
  component_type: 'Hero' | 'Gallery' | 'TextFeature' | 'Contact';
  order: number;
  styles: Record<string, string>; // Tailwind classes or inline styles
}

interface ProjectContent {
  id: string;
  title: string;
  description: string;
  assets: string[]; // URLs
  tags: string[];
}