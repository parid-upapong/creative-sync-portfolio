/**
 * The "Site Manifest" is the bridge between AI reasoning and UI rendering.
 * It is a framework-agnostic definition of the portfolio.
 */

export interface SiteManifest {
  version: "1.0";
  meta: {
    title: string;
    description: string;
    theme: {
      primaryColor: string;
      secondaryColor: string;
      fontFamily: "Serif" | "Sans" | "Mono";
      spacing: "Compact" | "Spacious";
    };
  };
  navigation: {
    label: string;
    anchor: string;
  }[];
  sections: Array<HeroSection | GallerySection | ContactSection>;
}

interface HeroSection {
  type: "HERO";
  heading: string;
  subheading: string;
  alignment: "left" | "center";
  backgroundAssetUrl?: string;
}

interface GallerySection {
  type: "GALLERY";
  layout: "GRID" | "MASONRY" | "CAROUSEL";
  items: {
    assetUrl: string;
    title: string;
    description: string;
  }[];
}

interface ContactSection {
  type: "CONTACT";
  email: string;
  socials: Record<string, string>;
}