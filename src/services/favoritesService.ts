import type { Favorite } from "@/types";

const KEY = "clo:favorites";

function read(): Favorite[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Favorite[]) : [];
  } catch {
    return [];
  }
}

function write(items: Favorite[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("clo:favorites-changed"));
}

export const favoritesService = {
  list: read,
  has(alternativeId: string): boolean {
    return read().some((f) => f.alternativeId === alternativeId);
  },
  toggle(alternativeId: string, originalId: string): boolean {
    const items = read();
    const exists = items.some((f) => f.alternativeId === alternativeId);
    if (exists) {
      write(items.filter((f) => f.alternativeId !== alternativeId));
      return false;
    }
    write([...items, { alternativeId, originalId, savedAt: new Date().toISOString() }]);
    return true;
  },
  remove(alternativeId: string) {
    write(read().filter((f) => f.alternativeId !== alternativeId));
  },
  subscribe(listener: () => void): () => void {
    if (typeof window === "undefined") return () => {};
    window.addEventListener("clo:favorites-changed", listener);
    window.addEventListener("storage", listener);
    return () => {
      window.removeEventListener("clo:favorites-changed", listener);
      window.removeEventListener("storage", listener);
    };
  },
};
