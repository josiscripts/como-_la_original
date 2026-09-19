import type { Comparison, OriginalProduct } from "@/types";
import { AppIcon } from "./AppIcon";

interface Props {
  comparison: Comparison;
  original: OriginalProduct;
  alternativeName: string;
  compact?: boolean;
}

export function ComparisonChart({ comparison, original, alternativeName, compact }: Props) {
  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-6">
      <div className="mb-5 flex flex-wrap items-center gap-2 text-sm font-bold uppercase tracking-wide">
        <span>{original.name} original</span>
        <span aria-hidden="true" className="rounded-full bg-blush px-2 py-0.5 text-xs">
          VS
        </span>
        <span className="text-mauve">{alternativeName}</span>
      </div>

      <ul className="space-y-4">
        {comparison.criteria.map((c) => (
          <li key={c.key}>
            <div className="mb-1 flex items-center justify-between text-sm font-semibold">
               <span className="inline-flex items-center gap-1.5">
                 <AppIcon aria-hidden="true" name={c.icon} className="size-4 shrink-0" />
                {c.label}
              </span>
              <span className="font-display font-extrabold tabular-nums">{c.value}%</span>
            </div>
            <div
              className="h-2.5 overflow-hidden rounded-full bg-beige"
              role="img"
              aria-label={`${c.label}: ${c.value}% de parecido`}
            >
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-700 ease-out"
                style={{ width: `${c.value}%` }}
              />
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-cream px-4 py-3">
        <span className="font-display text-xl font-extrabold">
          {comparison.overallSimilarity}% parecido
        </span>
        <span className="text-xs text-muted-foreground">
          {compact
            ? "Porque parecerse no significa solamente tener el mismo aspecto."
            : comparison.explanation}
        </span>
      </div>
    </div>
  );
}
