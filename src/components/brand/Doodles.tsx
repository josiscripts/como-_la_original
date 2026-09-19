import type { SVGProps } from "react";

export function Sparkle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 0c.6 5.6 3.1 8.8 12 12-8.9 3.2-11.4 6.4-12 12-.6-5.6-3.1-8.8-12-12C8.9 8.8 11.4 5.6 12 0Z" />
    </svg>
  );
}

export function Squiggle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 20" fill="none" aria-hidden="true" {...props}>
      <path
        d="M2 14C14 2 26 2 38 14s24 12 36 0 24-12 36 0"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Blob({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M43.6 -60.6C56.1 -52.6 65.3 -38.9 70.3 -23.8C75.3 -8.7 76.1 7.9 70.6 21.9C65.2 35.9 53.5 47.4 40.1 56.5C26.6 65.5 11.3 72.1 -4.2 77.8C-19.7 83.5 -39.4 88.3 -52 80.3C-64.6 72.4 -70.1 51.6 -74.2 32.8C-78.4 14 -81.2 -2.9 -76.6 -17.4C-72 -31.9 -60 -44 -46.6 -51.8C-33.2 -59.6 -18.4 -63.1 -2.3 -60C13.9 -56.8 31.1 -68.6 43.6 -60.6Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}
