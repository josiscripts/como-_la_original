import { Check, Star } from "lucide-react";
import type { ReviewSummary } from "@/types";
import { AppIcon, type AppIconName } from "./AppIcon";

function StarScore({ icon, label, value }: { icon: AppIconName; label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-cream px-4 py-3 text-center">
       <p className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold">
         <AppIcon aria-hidden="true" name={icon} className="size-4" />
        {label}
      </p>
      <p className="mt-1 flex items-center justify-center gap-1 font-display text-lg font-extrabold">
        <Star aria-hidden="true" className="size-4 fill-primary text-primary" />
        <span>{value.toFixed(1).replace(".", ",")}/5</span>
      </p>
    </div>
  );
}

export function ReviewSummaryCard({ summary }: { summary: ReviewSummary }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-6">
      <h3 className="flex items-center gap-2 text-xl"><AppIcon aria-hidden="true" name="message" className="size-5" /> ¿Qué dice la gente?</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {summary.reviewCount} opiniones analizadas · {summary.source}
      </p>

      <ul className="mt-4 space-y-2">
        {summary.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2 text-sm">
            <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <StarScore icon="taste" label="Sabor" value={summary.tasteReviewScore} />
        <StarScore icon="texture" label="Textura" value={summary.textureReviewScore} />
        <StarScore icon="cookie" label="Parecido" value={summary.similarityReviewScore} />
      </div>
    </div>
  );
}
