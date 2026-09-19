import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { getSuggestions } from "@/services/productService";
import type { SearchSuggestion } from "@/types";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  size?: "hero" | "compact";
  autoFocusOnMount?: boolean;
  /** Rotating placeholder examples (hero only). Falls back to a static one. */
  placeholders?: string[];
}

const kindLabel: Record<SearchSuggestion["kind"], string> = {
  original: "Producto original",
  alternativas: "Ver alternativas",
  categoria: "Categoría",
};

export function SearchBar({
  value,
  onChange,
  onSubmit,
  size = "hero",
  autoFocusOnMount = false,
  placeholders,
}: Props) {
  const inputId = useId();
  const listId = `${inputId}-suggestions`;
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [placeholderVisible, setPlaceholderVisible] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSuggestions(getSuggestions(value));
  }, [value]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    if (!placeholders || placeholders.length < 2) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const interval = window.setInterval(() => {
      setPlaceholderVisible(false);
      window.setTimeout(() => {
        setPlaceholderIndex((i) => (i + 1) % placeholders.length);
        setPlaceholderVisible(true);
      }, 400);
    }, 3200);
    return () => window.clearInterval(interval);
  }, [placeholders]);

  const hero = size === "hero";
  const rotating = placeholders?.[placeholderIndex];
  const placeholderText = rotating ?? "Busca Oreo, KitKat, Magnum, Donuts…";

  return (
    <div ref={wrapperRef} className="relative w-full">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          setOpen(false);
          onSubmit(value);
        }}
      >
        <label htmlFor={inputId} className="sr-only">
          Busca un producto original
        </label>
        <div
          className={`flex items-center gap-2 rounded-full border bg-card transition-all focus-within:border-primary ${
            hero
              ? "border-border/80 p-1.5 pl-4 shadow-card focus-within:shadow-pop sm:pl-6"
              : "border-2 border-foreground px-3 py-1.5 shadow-card"
          }`}
        >
          <Search
            aria-hidden="true"
            className={hero ? "size-5 shrink-0 text-muted-foreground" : "size-4 shrink-0"}
          />
          <div className="relative min-w-0 flex-1">
            <input
              id={inputId}
              type="search"
              value={value}
              autoFocus={autoFocusOnMount}
              onChange={(e) => {
                onChange(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              role="combobox"
              aria-expanded={open && suggestions.length > 0}
              aria-controls={listId}
              aria-autocomplete="list"
              placeholder={rotating && hero ? " " : placeholderText}
              className={`w-full bg-transparent outline-none placeholder:text-muted-foreground ${
                hero ? "min-h-12 text-base sm:min-h-14 sm:text-lg" : "min-h-10 text-sm"
              }`}
            />
            {rotating && hero && !value ? (
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute inset-y-0 left-0 flex items-center truncate text-base text-muted-foreground transition-opacity duration-500 sm:text-lg ${
                  placeholderVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                {rotating}
              </span>
            ) : null}
          </div>
          <button
            type="submit"
            className={`group/btn inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary font-display font-extrabold text-primary-foreground transition-transform hover:scale-[1.03] ${
              hero ? "min-h-12 px-5 text-sm sm:px-7 sm:text-base" : "min-h-9 px-4 text-xs"
            }`}
          >
            Buscar
            {hero ? (
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform group-hover/btn:translate-x-1"
              />
            ) : null}
          </button>
        </div>
      </form>

      {open && suggestions.length > 0 ? (
        <ul
          id={listId}
          role="listbox"
          aria-label="Sugerencias de búsqueda"
          className="absolute z-30 mt-2 w-full overflow-hidden rounded-3xl border border-border bg-card text-left shadow-pop"
        >
          {suggestions.map((s) => (
            <li key={s.id} role="option" aria-selected={false}>
              <button
                type="button"
                onClick={() => {
                  onChange(s.label);
                  setOpen(false);
                  onSubmit(s.originalSlug);
                }}
                className="flex w-full items-center justify-between gap-3 px-5 py-3 text-left text-sm transition-colors hover:bg-cream"
              >
                <span className="font-semibold">{s.label}</span>
                <span className="text-xs text-muted-foreground">{kindLabel[s.kind]}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
