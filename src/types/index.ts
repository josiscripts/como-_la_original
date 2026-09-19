/**
 * Data models for Como la Original.
 * These shapes are the contract between the UI and the data layer
 * (mock data today, Wix CMS / API later). UI components must only
 * depend on these types, never on a concrete data source.
 */

import type { AppIconName } from "@/components/common/AppIcon";

export type DietaryNeed = "sin-gluten" | "sin-lactosa" | "sin-gluten-sin-lactosa";

export type VerificationStatus = "verificado" | "no-verificado" | "no-disponible";

export type Availability = "disponible" | "ocasional" | "no-disponible" | "desconocida";

export interface Category {
  id: string;
  slug: string;
  name: string;
  icon: AppIconName;
}

export interface DemoImage {
  /** Human label shown inside the demo placeholder. */
  label: string;
  /** Optional real photo URL. When absent, a clearly marked demo placeholder is rendered. */
  url?: string;
  alt: string;
}

export interface Store {
  id: string;
  name: string;
  logo?: string;
  productUrl: string;
  availability: Availability;
  lastChecked?: string;
}

export interface ReviewSummary {
  reviewCount: number;
  highlights: string[];
  tasteReviewScore: number;
  textureReviewScore: number;
  similarityReviewScore: number;
  source: string;
}

export interface OriginalProduct {
  id: string;
  slug: string;
  name: string;
  brandNote: string;
  categoryId: string;
  description: string;
  icon: AppIconName;
  image: DemoImage;
  seoTitle: string;
  seoDescription: string;
}

export interface AlternativeProduct {
  id: string;
  slug: string;
  name: string;
  brand: string;
  categoryId: string;
  description: string;
  packageImage: DemoImage;
  openProductImage: DemoImage;

  glutenFree: boolean;
  lactoseFree: boolean;
  celiacSuitable: boolean;
  verificationStatus: VerificationStatus;

  tasteScore: number;
  textureScore: number;
  similarityScore: number;
  fillingScore: number;
  overallSimilarity: number;

  originalProductId: string;
  reviewSummary: ReviewSummary;
  stores: Store[];
  allergens: string[];
  source: string;
  lastVerified?: string;

  seoTitle: string;
  seoDescription: string;
}

export interface ComparisonCriterion {
  key: string;
  label: string;
  icon: AppIconName;
  value: number;
}

export interface Comparison {
  originalProductId: string;
  alternativeProductId: string;
  criteria: ComparisonCriterion[];
  overallSimilarity: number;
  explanation: string;
}

export interface Favorite {
  alternativeId: string;
  originalId: string;
  savedAt: string;
}

export interface User {
  id: string;
  name?: string;
  email?: string;
}

export interface SearchSuggestion {
  id: string;
  label: string;
  kind: "original" | "alternativas" | "categoria";
  originalSlug: string;
}

export interface SearchResult {
  original: OriginalProduct;
  need: DietaryNeed;
  alternatives: AlternativeProduct[];
}
