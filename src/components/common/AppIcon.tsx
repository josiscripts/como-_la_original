import {
  Candy,
  Check,
  CircleHelp,
  Cookie,
  Donut,
  Droplets,
  Heart,
  IceCreamBowl,
  MapPin,
  Medal,
  MessageCircle,
  Milk,
  MilkOff,
  PartyPopper,
  Salad,
  Search,
  ShieldCheck,
  Smile,
  Sparkles,
  Trophy,
  Utensils,
  WheatOff,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

export type AppIconName =
  | "bread"
  | "candy"
  | "check"
  | "cookie"
  | "donut"
  | "glaze"
  | "heart"
  | "help"
  | "ice-cream"
  | "map-pin"
  | "medal"
  | "message"
  | "milk"
  | "milk-off"
  | "party"
  | "salad"
  | "search"
  | "shield-check"
  | "sparkles"
  | "taste"
  | "texture"
  | "trophy"
  | "utensils"
  | "wafer"
  | "wheat-off";

const lucideIcons: Partial<Record<AppIconName, LucideIcon>> = {
  candy: Candy,
  check: Check,
  cookie: Cookie,
  donut: Donut,
  glaze: Droplets,
  heart: Heart,
  help: CircleHelp,
  "ice-cream": IceCreamBowl,
  "map-pin": MapPin,
  medal: Medal,
  message: MessageCircle,
  milk: Milk,
  "milk-off": MilkOff,
  party: PartyPopper,
  salad: Salad,
  search: Search,
  "shield-check": ShieldCheck,
  sparkles: Sparkles,
  taste: Smile,
  trophy: Trophy,
  utensils: Utensils,
  "wheat-off": WheatOff,
};

function FoodDetailIcon({ name, ...props }: LucideProps & { name: "bread" | "texture" | "wafer" }) {
  if (name === "texture") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M7.5 3.5c-1.7.4-3 2-3 4.2 0 2.7 1.3 4.2 1.3 7.2 0 3.2 1.1 5.6 2.8 5.6 2 0 1.7-4.5 3.4-4.5s1.4 4.5 3.4 4.5c1.7 0 2.8-2.4 2.8-5.6 0-3 1.3-4.5 1.3-7.2 0-2.2-1.3-3.8-3-4.2-1.5-.4-2.9.5-4.5.5s-3-1-4.5-.5Z" />
      </svg>
    );
  }

  if (name === "wafer") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M8 5v14M16 5v14M3 10h18M3 15h18" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 19V9.5C5 6.5 7.8 4 12 4s7 2.5 7 5.5V19Z" />
      <path d="M8 9h.01M12 7.5h.01M16 10h.01" />
    </svg>
  );
}

export function AppIcon({ name, ...props }: LucideProps & { name: AppIconName }) {
  if (name === "bread" || name === "texture" || name === "wafer") {
    return <FoodDetailIcon name={name} {...props} />;
  }

  const Icon = lucideIcons[name] ?? Sparkles;
  return <Icon {...props} />;
}