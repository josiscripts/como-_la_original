import { useEffect, useState } from "react";

interface Props {
  value: number;
  size?: "sm" | "md" | "lg";
  label?: string;
}

const sizes = {
  sm: { box: 64, stroke: 7, text: "text-base" },
  md: { box: 92, stroke: 9, text: "text-xl" },
  lg: { box: 132, stroke: 11, text: "text-3xl" },
} as const;

export function SimilarityScore({ value, size = "md", label = "parecido al original" }: Props) {
  const { box, stroke, text } = sizes[size];
  const radius = (box - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const id = window.setTimeout(() => setShown(value), 80);
    return () => window.clearTimeout(id);
  }, [value]);

  return (
    <div className="inline-flex flex-col items-center gap-1">
      <div className="relative" style={{ width: box, height: box }}>
        <svg width={box} height={box} aria-hidden="true" className="-rotate-90">
          <circle
            cx={box / 2}
            cy={box / 2}
            r={radius}
            fill="none"
            stroke="var(--beige)"
            strokeWidth={stroke}
          />
          <circle
            cx={box / 2}
            cy={box / 2}
            r={radius}
            fill="none"
            stroke="var(--primary)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (circumference * shown) / 100}
            style={{ transition: "stroke-dashoffset 900ms cubic-bezier(0.22, 1, 0.36, 1)" }}
          />
        </svg>
        <span
          className={`absolute inset-0 grid place-items-center font-display font-extrabold ${text}`}
        >
          {value}%
        </span>
      </div>
      <span className="sr-only">{`${value}% ${label}`}</span>
    </div>
  );
}
