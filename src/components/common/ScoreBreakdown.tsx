import { AppIcon, type AppIconName } from "./AppIcon";

interface Score {
  icon: AppIconName;
  label: string;
  /** score out of 10 */
  value: number;
}

export function ScoreBreakdown({ scores, title }: { scores: Score[]; title?: string }) {
  return (
    <div>
      {title ? (
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          {title}
        </h3>
      ) : null}
      <ul className="space-y-3">
        {scores.map((s) => (
          <li key={s.label} className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1">
             <span className="inline-flex items-center gap-1.5 text-sm font-semibold">
               <AppIcon aria-hidden="true" name={s.icon} className="size-4 shrink-0" />
              {s.label}
            </span>
            <span className="font-display text-sm font-extrabold tabular-nums">
              {s.value.toFixed(1).replace(".", ",")}/10
            </span>
            <div
              className="col-span-2 h-2 overflow-hidden rounded-full bg-beige"
              role="img"
              aria-label={`${s.label}: ${s.value} sobre 10`}
            >
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-700 ease-out"
                style={{ width: `${s.value * 10}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
