import React, { useEffect, useMemo } from 'react';
import { StylingEngine } from '@/lib/styling-engine';
import { usePortfolioStore } from '@/store/usePortfolioStore';

/**
 * A wrapper component that injects dynamic styles into its children.
 * This allows for a "Theme Preview" without affecting the entire application UI.
 */
export const AdaptiveContainer = ({ children }: { children: React.ReactNode }) => {
  const { aiAnalysis } = usePortfolioStore();

  const themeVars = useMemo(() => {
    if (!aiAnalysis) return null;
    return StylingEngine.generateTheme({
      dominantColors: aiAnalysis.colors,
      suggestedAesthetic: aiAnalysis.aesthetic as any,
      isDark: aiAnalysis.isDark
    });
  }, [aiAnalysis]);

  useEffect(() => {
    if (themeVars) {
      StylingEngine.applyTheme(themeVars, 'portfolio-preview-root');
    }
  }, [themeVars]);

  return (
    <div 
      id="portfolio-preview-root"
      className="w-full h-full min-h-screen transition-all duration-1000 overflow-y-auto"
      style={{
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)'
      }}
    >
      <div className="px-site-pad py-12 max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
};