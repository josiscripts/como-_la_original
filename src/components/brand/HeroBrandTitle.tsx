import { useLocale, useTranslations } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import titleEs from "@/assets/title-es.png.asset.json";
import titleCa from "@/assets/title-ca.png.asset.json";
import titleEn from "@/assets/title-en.png.asset.json";

interface HeroBrandTitleProps {
  className?: string;
}

const titleByLocale = {
  es: titleEs.url,
  ca: titleCa.url,
  en: titleEn.url,
} as const;

/**
 * Central hero lettering: localized 3D lettering PNG (transparent background).
 * Only one image is rendered at a time, chosen from the active locale.
 */
export function HeroBrandTitle({ className }: HeroBrandTitleProps) {
  const locale = useLocale();
  const t = useTranslations();
  const src = titleByLocale[locale];
  const alt = `${t.heroBrandTitleLine1} ${t.heroBrandTitleLine2}`;

  return (
    <h1 className={cn("mx-auto w-full", className)}>
      <img
        key={locale}
        src={src}
        alt={alt}
        className="mx-auto h-auto w-[clamp(280px,86vw,760px)] max-w-full object-contain"
        width={1990}
        height={800}
        decoding="async"
      />
    </h1>
  );
}
