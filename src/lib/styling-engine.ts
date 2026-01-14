/**
 * Dynamic Styling Engine
 * Translates AI-generated metadata and asset analysis into CSS Variables.
 */

import { ThemeTokens, AESTHETIC_PRESETS, AestheticProfile } from '@/styles/tokens';

export class StylingEngine {
  /**
   * Generates a complete CSS Variable object based on AI Analysis.
   * @param aiAnalysis Metadata from the Computer Vision/LLM stage
   */
  static generateTheme(aiAnalysis: {
    dominantColors: string[];
    suggestedAesthetic: AestheticProfile;
    isDark: boolean;
  }): Record<string, string> {
    const preset = AESTHETIC_PRESETS[aiAnalysis.suggestedAesthetic] || AESTHETIC_PRESETS.minimalist;
    
    // Logic to override preset colors with AI detected colors while maintaining contrast
    const dynamicTheme: Record<string, string> = {
      '--background': aiAnalysis.isDark ? '#121212' : preset.colors.background,
      '--foreground': aiAnalysis.isDark ? '#f5f5f5' : preset.colors.foreground,
      '--primary': aiAnalysis.dominantColors[0] || preset.colors.primary,
      '--accent': aiAnalysis.dominantColors[1] || preset.colors.accent,
      '--muted': aiAnalysis.isDark ? '#1e1e1e' : preset.colors.muted,
      
      '--font-heading': preset.typography.headingFont,
      '--font-body': preset.typography.bodyFont,
      
      '--spacing-unit': preset.spacing.unit,
      '--container-padding': preset.spacing.containerPadding,
      '--radius': preset.effects.radius,
    };

    return dynamicTheme;
  }

  /**
   * Applies the generated theme to the document root or a preview container
   */
  static applyTheme(theme: Record<string, string>, targetId?: string) {
    const target = targetId ? document.getElementById(targetId) : document.documentElement;
    if (!target) return;

    Object.entries(theme).forEach(([key, value]) => {
      target.style.setProperty(key, value);
    });
  }
}