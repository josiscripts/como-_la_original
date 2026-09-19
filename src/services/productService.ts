import {
  alternativeProducts,
  categories,
  comparisons,
  originalProducts,
  popularSearches,
} from "@/data/catalog";
import type {
  AlternativeProduct,
  Category,
  Comparison,
  DietaryNeed,
  OriginalProduct,
  SearchResult,
  SearchSuggestion,
} from "@/types";

/**
 * Data access layer. Today it resolves from local demo data; the async
 * signatures exist so this module can be swapped for a Wix CMS / REST
 * implementation without touching a single UI component.
 */

const LATENCY = 450;

function delay<T>(value: T, ms = LATENCY): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export function matchesNeed(product: AlternativeProduct, need: DietaryNeed): boolean {
  if (need === "sin-gluten") return product.glutenFree;
  if (need === "sin-lactosa") return product.lactoseFree;
  return product.glutenFree && product.lactoseFree;
}

export const needLabels: Record<DietaryNeed, string> = {
  "sin-gluten": "Sin gluten",
  "sin-lactosa": "Sin lactosa",
  "sin-gluten-sin-lactosa": "Sin gluten + Sin lactosa",
};

export function isDietaryNeed(value: string | undefined): value is DietaryNeed {
  return (
    value === "sin-gluten" || value === "sin-lactosa" || value === "sin-gluten-sin-lactosa"
  );
}

export function getCategories(): Category[] {
  return categories;
}

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getPopularSearches(): string[] {
  return popularSearches;
}

export function listOriginalsSync(): OriginalProduct[] {
  return originalProducts;
}

export function findOriginalSync(slugOrTerm: string): OriginalProduct | undefined {
  const term = slugOrTerm.trim().toLowerCase();
  if (!term) return undefined;
  return (
    originalProducts.find((o) => o.slug === term) ??
    originalProducts.find((o) => o.name.toLowerCase() === term) ??
    originalProducts.find((o) => o.name.toLowerCase().includes(term)) ??
    originalProducts.find((o) => {
      const category = getCategory(o.categoryId);
      return category ? category.name.toLowerCase().includes(term) : false;
    })
  );
}

export function getAlternativeSync(slug: string): AlternativeProduct | undefined {
  return alternativeProducts.find((a) => a.slug === slug);
}

export function getOriginalByIdSync(id: string): OriginalProduct | undefined {
  return originalProducts.find((o) => o.id === id);
}

export function getComparisonSync(alternativeId: string): Comparison | undefined {
  return comparisons.find((c) => c.alternativeProductId === alternativeId);
}

export function getAlternativesForOriginalSync(
  originalId: string,
  need?: DietaryNeed,
): AlternativeProduct[] {
  return alternativeProducts
    .filter((a) => a.originalProductId === originalId)
    .filter((a) => (need ? matchesNeed(a, need) : true))
    .sort((a, b) => b.overallSimilarity - a.overallSimilarity)
    .slice(0, 5);
}

export function getSuggestions(term: string): SearchSuggestion[] {
  const q = term.trim().toLowerCase();
  if (q.length < 1) return [];
  const matches = originalProducts.filter((o) => {
    const category = getCategory(o.categoryId);
    return (
      o.name.toLowerCase().includes(q) ||
      o.brandNote.toLowerCase().includes(q) ||
      (category?.name.toLowerCase().includes(q) ?? false)
    );
  });

  return matches.slice(0, 3).flatMap((o) => [
    { id: `${o.slug}-original`, label: `${o.name} Original`, kind: "original" as const, originalSlug: o.slug },
    {
      id: `${o.slug}-alt`,
      label: `Alternativas a ${o.name}`,
      kind: "alternativas" as const,
      originalSlug: o.slug,
    },
    {
      id: `${o.slug}-cat`,
      label: `${getCategory(o.categoryId)?.name ?? "Productos"} tipo ${o.name}`,
      kind: "categoria" as const,
      originalSlug: o.slug,
    },
  ]);
}

// ---------------------------------------------------------------- async API

export async function search(term: string, need: DietaryNeed): Promise<SearchResult | null> {
  const original = findOriginalSync(term);
  if (!original) return delay(null);
  return delay({
    original,
    need,
    alternatives: getAlternativesForOriginalSync(original.id, need),
  });
}

export async function getAlternative(slug: string): Promise<AlternativeProduct | null> {
  return delay(getAlternativeSync(slug) ?? null, 200);
}

export async function getOriginal(slug: string): Promise<OriginalProduct | null> {
  return delay(originalProducts.find((o) => o.slug === slug) ?? null, 200);
}
