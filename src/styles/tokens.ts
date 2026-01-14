/**
 * Design Tokens Definition
 * This file defines the structural constraints that the AI Styling Engine must respect.
 * It provides the "DNA" for different aesthetic profiles.
 */

export type AestheticProfile = 'minimalist' | 'editorial' | 'avant-garde' | 'brutalist' | 'sophisticated';

export interface ThemeTokens {
  colors: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    accent: string;
    muted: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    baseSize: string;
    scaleRatio: number;
  };
  spacing: {
    unit: string;
    containerPadding: string;
  };
  effects: {
    radius: string;
    shadow: string;
    transition: string;
  };
}

export const AESTHETIC_PRESETS: Record<AestheticProfile, ThemeTokens> = {
  minimalist: {
    colors: {
      background: '#ffffff',
      foreground: '#111111',
      primary: '#000000',
      secondary: '#666666',
      accent: '#333333',
      muted: '#f5f5f5',
    },
    typography: {
      headingFont: 'Inter, sans-serif',
      bodyFont: 'Inter, sans-serif',
      baseSize: '16px',
      scaleRatio: 1.25,
    },
    spacing: {
      unit: '4px',
      containerPadding: '2rem',
    },
    effects: {
      radius: '0px',
      shadow: 'none',
      transition: '0.3s ease-in-out',
    },
  },
  editorial: {
    colors: {
      background: '#faf9f6',
      foreground: '#1a1a1a',
      primary: '#2d3436',
      secondary: '#636e72',
      accent: '#d63031',
      muted: '#efefef',
    },
    typography: {
      headingFont: 'Playfair Display, serif',
      bodyFont: 'Lora, serif',
      baseSize: '18px',
      scaleRatio: 1.5,
    },
    spacing: {
      unit: '6px',
      containerPadding: '4rem',
    },
    effects: {
      radius: '4px',
      shadow: '0 4px 20px rgba(0,0,0,0.05)',
      transition: '0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  // Additional presets would follow...
};