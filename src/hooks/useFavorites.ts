import { useCallback, useSyncExternalStore } from "react";
import { favoritesService } from "@/services/favoritesService";
import type { Favorite } from "@/types";

const EMPTY: Favorite[] = [];

let cache: Favorite[] = EMPTY;
let cacheKey = "";

function getSnapshot(): Favorite[] {
  const next = favoritesService.list();
  const key = JSON.stringify(next);
  if (key !== cacheKey) {
    cacheKey = key;
    cache = next;
  }
  return cache;
}

export function useFavorites() {
  const favorites = useSyncExternalStore(
    favoritesService.subscribe,
    getSnapshot,
    () => EMPTY,
  );

  const toggle = useCallback(
    (alternativeId: string, originalId: string) =>
      favoritesService.toggle(alternativeId, originalId),
    [],
  );

  const remove = useCallback((alternativeId: string) => favoritesService.remove(alternativeId), []);

  const isFavorite = useCallback(
    (alternativeId: string) => favorites.some((f) => f.alternativeId === alternativeId),
    [favorites],
  );

  return { favorites, toggle, remove, isFavorite };
}
