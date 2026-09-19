import { Check, ChevronDown, Languages, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { setLocale, toggleTheme, usePreferences } from "@/lib/preferences";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const locales: Array<{ value: Locale; label: string }> = [
  { value: "es", label: "ES" },
  { value: "ca", label: "CA" },
  { value: "en", label: "EN" },
];

/**
 * Shared theme and language controls for the floating navbar and side panel.
 */
export function PreferenceControls({ panel = false }: { panel?: boolean }) {
  const { locale, theme } = usePreferences();
  const activeLocale = locales.find((item) => item.value === locale)?.label ?? "ES";

  if (panel) {
    return (
      <div className="space-y-2">
        <Button
          type="button"
          variant="ghost"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          aria-pressed={theme === "dark"}
          className="h-12 w-full justify-start rounded-full px-4 text-base font-semibold hover:bg-blush"
        >
          {theme === "dark" ? (
            <Sun aria-hidden="true" className="text-primary" />
          ) : (
            <Moon aria-hidden="true" />
          )}
          Modo {theme === "dark" ? "claro" : "oscuro"}
        </Button>

        <div className="flex min-h-12 items-center gap-3 rounded-full px-4">
          <Languages aria-hidden="true" className="size-4 text-muted-foreground" />
          <span className="mr-auto text-base font-semibold">Idioma</span>
          <div role="group" aria-label="Cambiar idioma" className="flex items-center gap-1">
            {locales.map((item) => {
              const active = locale === item.value;
              return (
                <Button
                  key={item.value}
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setLocale(item.value)}
                  aria-pressed={active}
                  aria-label={`Idioma: ${item.label}`}
                  className={cn(
                    "h-8 min-w-9 rounded-full px-2 text-xs font-bold",
                    active ? "bg-blush text-foreground hover:bg-blush" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        aria-pressed={theme === "dark"}
        className="size-9 rounded-full border border-border/60 bg-background/35 hover:bg-blush sm:size-10"
      >
        {theme === "dark" ? (
          <Sun aria-hidden="true" className="size-[18px] text-primary" />
        ) : (
          <Moon aria-hidden="true" className="size-[18px]" />
        )}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            aria-label={`Idioma actual: ${activeLocale}`}
            className="h-9 gap-1 rounded-full border border-border/60 bg-background/35 px-2.5 text-xs font-bold hover:bg-blush sm:h-10 sm:px-3"
          >
            {activeLocale}
            <ChevronDown aria-hidden="true" className="size-3.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          sideOffset={8}
          className="min-w-36 rounded-2xl border-border/60 bg-card/80 p-1.5 backdrop-blur-xl"
        >
          {locales.map((item) => (
            <DropdownMenuItem
              key={item.value}
              onSelect={() => setLocale(item.value)}
              className="min-h-10 cursor-pointer rounded-xl px-3 font-semibold focus:bg-blush"
            >
              {item.label}
              {locale === item.value ? <Check aria-hidden="true" className="ml-auto" /> : null}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
