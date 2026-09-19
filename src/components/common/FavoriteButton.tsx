import { useState } from "react";
import { Heart } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";

interface Props {
  alternativeId: string;
  originalId: string;
  variant?: "full" | "icon";
  className?: string;
}

export function FavoriteButton({ alternativeId, originalId, variant = "full", className }: Props) {
  const { isFavorite, toggle } = useFavorites();
  const saved = isFavorite(alternativeId);
  const [pop, setPop] = useState(false);

  function handleClick() {
    toggle(alternativeId, originalId);
    setPop(true);
    window.setTimeout(() => setPop(false), 350);
  }

  const label = saved ? "Guardado en mis antojos" : "Guardar en mis favoritos";

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={saved}
        aria-label={label}
        title={label}
        className={cn(
          "grid size-11 place-items-center rounded-full border border-border bg-card transition-colors hover:bg-blush",
          saved && "border-mauve bg-blush",
          className,
        )}
      >
        <Heart
          aria-hidden="true"
          className={cn("size-5 text-mauve", saved && "fill-mauve", pop && "animate-pop")}
        />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={saved}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border-2 px-5 py-2.5 text-sm font-bold transition-colors",
        saved
          ? "border-mauve bg-mauve text-mauve-foreground"
          : "border-border bg-card hover:border-mauve hover:bg-blush",
        className,
      )}
    >
      <Heart
        aria-hidden="true"
        className={cn("size-4", saved ? "fill-current" : "text-mauve", pop && "animate-pop")}
      />
      {saved ? "Guardado" : "Guardar en mis favoritos"}
    </button>
  );
}
