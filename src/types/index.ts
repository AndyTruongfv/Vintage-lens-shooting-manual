export type Category = 'Portraits' | 'Cinema/Film' | 'Landscape/Macro' | 'Street/B&W';

export type CameraBody = 'Z5' | 'D800E' | 'D750';

export type NavTab = 'recipes' | 'vault' | 'masters';

export type LensLocation = 'Vietnam' | 'Finland';

export interface RecipeParameters {
  sharpening: string;
  midSharpening: string;
  clarity: string;
  contrast: string;
  highlights: string;
  shadows: string;
  saturation?: string;
  hue?: string;
  filterEffect?: string;
  toning?: string;
}

export interface WhiteBalance {
  base: string;
  amber: string;
  magenta: string;
  note: string;
}

export interface Recipe {
  id: string;
  name: string;
  tag: string;
  category: Category;
  baseProfile: string;
  lensMatch: string;
  scenario: string;
  parameters: RecipeParameters;
  wb: WhiteBalance;
  recommendedBodies?: CameraBody[];
}

export interface CameraInfo {
  body: CameraBody;
  label: string;
  subtitle: string;
  sensor: string;
  releaseYear: string;
  icon: string;
  strengths: string;
  optimalUse: string;
  recommendedLenses: string;
  recommendedProfiles: string;
  recommendedRecipeIds?: string[];
  tips: string[];
}

export interface MasterArtist {
  name: string;
  period: string;
  signatureStyle: string;
  description: string;
  websiteUrl: string;
  websiteLabel: string;
  keyTechnique: string;
}

export interface GenreInspiration {
  id: string;
  title: string;
  genreTag: string;
  headline: string;
  vibeDescription: string;
  masters: MasterArtist[];
  recommendedBodies: CameraBody[];
  recommendedLenses: string[];
  recommendedRecipeIds: string[];
}

export interface DCFieldGuide {
  title: string;
  dcRingPrinciple: string[];
  goldenRules: {
    step: number;
    title: string;
    description: string;
    isCrucial?: boolean;
  }[];
  cinemaGlowTip: string;
}

export interface LensVaultItem {
  id: string;
  name: string;
  nickname: string;
  base: LensLocation;
  mount: string;
  focalLength: string;
  maxAperture: string;
  filterThread?: string;
  history: string;
  strengths: string;
  goldenMilestones: string;
  recommendedBodies: CameraBody[];
  recommendedRecipeIds: string[];
  specialFeatures?: string[];
  dcFieldGuide?: DCFieldGuide;
}



