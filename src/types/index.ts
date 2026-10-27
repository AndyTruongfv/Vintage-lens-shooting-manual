export type Category = 'Portraits' | 'Cinema/Film' | 'Landscape/Macro' | 'Street/B&W';

export type CameraBody = 'Z5' | 'D800E' | 'D750';

export type NavTab = 'recipes' | 'vault' | 'masters';

export type LensLocation = 'Vietnam' | 'Finland';

export type Language = 'vi' | 'en';

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
  baseEn?: string;
  amber: string;
  magenta: string;
  note: string;
  noteEn?: string;
}

export interface Recipe {
  id: string;
  name: string;
  nameEn?: string;
  tag: string;
  tagEn?: string;
  category: Category;
  baseProfile: string;
  lensMatch: string;
  scenario: string;
  scenarioEn?: string;
  parameters: RecipeParameters;
  wb: WhiteBalance;
  recommendedBodies?: CameraBody[];
}

export interface CameraInfo {
  body: CameraBody;
  label: string;
  subtitle: string;
  subtitleEn?: string;
  sensor: string;
  releaseYear: string;
  icon: string;
  strengths: string;
  strengthsEn?: string;
  optimalUse: string;
  optimalUseEn?: string;
  recommendedLenses: string;
  recommendedProfiles: string;
  recommendedRecipeIds?: string[];
  tips: string[];
  tipsEn?: string[];
}

export interface MasterArtist {
  name: string;
  period: string;
  periodEn?: string;
  signatureStyle: string;
  signatureStyleEn?: string;
  description: string;
  descriptionEn?: string;
  websiteUrl: string;
  websiteLabel: string;
  keyTechnique: string;
  keyTechniqueEn?: string;
}

export interface GenreInspiration {
  id: string;
  title: string;
  titleEn?: string;
  genreTag: string;
  genreTagEn?: string;
  headline: string;
  headlineEn?: string;
  vibeDescription: string;
  vibeDescriptionEn?: string;
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
  nicknameEn?: string;
  base: LensLocation;
  mount: string;
  mountEn?: string;
  focalLength: string;
  maxAperture: string;
  filterThread?: string;
  history: string;
  historyEn?: string;
  strengths: string;
  strengthsEn?: string;
  goldenMilestones: string;
  goldenMilestonesEn?: string;
  recommendedBodies: CameraBody[];
  recommendedRecipeIds: string[];
  recommendedProfiles?: string;
  recommendedProfilesEn?: string;
  specialFeatures?: string[];
  specialFeaturesEn?: string[];
  dcFieldGuide?: DCFieldGuide;
}

export interface LensPurchaseInfo {
  lens_id: string;
  price?: string | null;
  seller?: string | null;
  purchase_date?: string | null;
  notes?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}




