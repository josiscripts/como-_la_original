import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/logo_como_la_original_2.svg.asset.json";

interface LogoProps {
  compact?: boolean;
}

/**
 * Official brand mark. Renders the uploaded logo asset and links home.
 */
export function Logo({ compact = false }: LogoProps) {
  return (
    <Link
      to="/"
      aria-label="Como la Original — ir al inicio"
      className="group inline-flex items-center"
    >
      <img
        src={logoAsset.url}
        alt="Como la Original"
        width={1824}
        height={862}
        className={`h-auto w-auto object-contain transition-transform group-hover:scale-[1.02] ${
          compact ? "max-h-8" : "max-h-10"
        }`}
      />
    </Link>
  );
}
