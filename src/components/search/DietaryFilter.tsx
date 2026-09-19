import { Check } from "lucide-react";
import { AppIcon, type AppIconName } from "@/components/common/AppIcon";
import type { DietaryNeed } from "@/types";

const options: Array<{ value: DietaryNeed; label: string; shortLabel: string; icon: AppIconName; hint: string }> = [
  {
    value: "sin-gluten",
    label: "Sin gluten",
    shortLabel: "Sin gluten",
    icon: "wheat-off",
    hint: "Sin trigo, cebada ni centeno",
  },
  {
    value: "sin-lactosa",
    label: "Sin lactosa",
    shortLabel: "Sin lactosa",
    icon: "milk-off",
    hint: "Sin lactosa añadida",
  },
  {
    value: "sin-gluten-sin-lactosa",
    label: "Sin gluten + Sin lactosa",
    shortLabel: "Ambas",
    icon: "sparkles",
    hint: "Las dos condiciones a la vez",
  },
];

interface Props {
  value: DietaryNeed;
  onChange: (value: DietaryNeed) => void;
  layout?: "grid" | "row" | "pills";
  legend?: string;
  note?: string;
}

export function DietaryFilter({
  value,
  onChange,
  layout = "grid",
  legend = "¿Qué necesitas?",
  note = "Solo mostraremos alternativas que cumplan esta condición cuando podamos verificarlo.",
}: Props) {
  const pills = layout === "pills";

  if (pills) {
    return (
      <fieldset className="text-center">
        <legend className="mb-3 w-full font-display text-xs font-extrabold uppercase tracking-[0.14em] text-muted-foreground">
          {legend}
        </legend>
        <div
          className="flex flex-wrap justify-center gap-2"
          role="radiogroup"
          aria-label="Necesidades alimentarias"
        >
          {options.map((option) => {
            const selected = value === option.value;
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => onChange(option.value)}
                className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-bold transition-all duration-200 ${
                  selected
                    ? "border-primary bg-primary/12 text-foreground shadow-soft"
                    : "border-border bg-card/80 text-muted-foreground hover:-translate-y-0.5 hover:border-primary/60 hover:text-foreground"
                }`}
              >
                {selected ? (
                  <Check aria-hidden="true" className="size-4 text-primary" />
                ) : null}
                 <AppIcon aria-hidden="true" name={option.icon} className="size-4" />
                {option.shortLabel}
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">{note}</p>
      </fieldset>
    );
  }

  return (
    <fieldset>
      <legend className="mb-3 font-display text-xl font-extrabold sm:text-2xl">{legend}</legend>
      <div
        className={layout === "grid" ? "grid gap-3 sm:grid-cols-3" : "flex flex-wrap gap-2"}
        role="radiogroup"
        aria-label="Necesidades alimentarias"
      >
        {options.map((option) => {
          const selected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(option.value)}
              className={`flex min-h-14 items-center gap-3 rounded-3xl border-2 bg-card px-4 py-3 text-left transition-all ${
                selected
                  ? "border-primary shadow-card"
                  : "border-border hover:border-primary/60 hover:shadow-soft"
              }`}
            >
               <AppIcon aria-hidden="true" name={option.icon} className="size-6 shrink-0" />
              <span className="min-w-0 flex-1">
                <span className="block font-display text-sm font-extrabold uppercase tracking-wide">
                  {option.label}
                </span>
                {layout === "grid" ? (
                  <span className="block text-xs text-muted-foreground">{option.hint}</span>
                ) : null}
              </span>
              <span
                aria-hidden="true"
                className={`grid size-6 shrink-0 place-items-center rounded-full border-2 ${
                  selected ? "border-primary bg-primary" : "border-border"
                }`}
              >
                {selected ? <Check className="size-3.5 text-primary-foreground" /> : null}
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">{note}</p>
    </fieldset>
  );
}
