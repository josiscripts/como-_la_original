import type { DemoImage } from "@/types";
import { AppIcon, type AppIconName } from "./AppIcon";

interface Props {
  image: DemoImage;
  icon?: AppIconName;
  ratio?: "square" | "wide";
  tone?: "cream" | "blush" | "beige";
  className?: string;
}

const tones = {
  cream: "bg-cream",
  blush: "bg-blush",
  beige: "bg-beige",
} as const;

/**
 * Renders a real photo when one exists, otherwise a clearly marked demo
 * placeholder. We never present a generated illustration as a real photo.
 */
export function DemoImageFrame({
  image,
  icon = "cookie",
  ratio = "square",
  tone = "cream",
  className = "",
}: Props) {
  const aspect = ratio === "square" ? "aspect-square" : "aspect-[4/3]";

  if (image.url) {
    return (
      <img
        src={image.url}
        alt={image.alt}
        loading="lazy"
        className={`${aspect} w-full rounded-2xl object-cover ${className}`}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={`${image.alt} (imagen demo, no es una fotografía real del producto)`}
      className={`${aspect} ${tones[tone]} relative flex w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-dashed border-border ${className}`}
    >
      <AppIcon aria-hidden="true" name={icon} className="size-10 opacity-80" strokeWidth={2} />
      <span className="px-3 text-center text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        {image.label}
      </span>
      <span className="absolute left-2 top-2 rounded-full bg-foreground/85 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-background">
        Imagen demo
      </span>
    </div>
  );
}
