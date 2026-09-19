import { needLabels } from "@/services/productService";
import type { DietaryNeed } from "@/types";
import { CircleCheck } from "lucide-react";

interface Props {
  originalName: string;
  need: DietaryNeed;
  count: number;
}

export function RankingHeader({ originalName, need, count }: Props) {
  return (
    <header className="rounded-4xl bg-blush px-6 py-7 sm:px-8">
      <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-mauve">
        Alternativas para tu antojo
      </p>
      <h1 className="mt-2 text-3xl sm:text-4xl">
        Las {count} alternativas más parecidas a {originalName}
      </h1>
      <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-card px-4 py-1.5 text-sm font-bold">
        <CircleCheck aria-hidden="true" className="size-4" />
        {needLabels[need]}
      </p>
    </header>
  );
}
