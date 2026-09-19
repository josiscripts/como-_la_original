import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, Heart, Menu, User } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { PreferenceControls } from "@/components/layout/PreferenceControls";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Inicio" },
  { to: "/como-funciona", label: "Cómo funciona" },
  { to: "/mis-antojos", label: "Mis antojos" },
  { to: "/sobre-nosotros", label: "Sobre nosotros" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { favorites } = useFavorites();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const [count, setCount] = useState(favorites.length);
  const [beat, setBeat] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (favorites.length === count) return undefined;
    setCount(favorites.length);
    setBeat(true);
    const t = window.setTimeout(() => setBeat(false), 400);
    return () => window.clearTimeout(t);
  }, [favorites.length, count]);

  function isActive(to: string) {
    return to === "/" ? pathname === "/" : pathname.startsWith(to);
  }

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40">
      <div
        className="mx-auto w-full max-w-[1120px] px-3 pt-3 sm:px-4 sm:pt-4 lg:px-5 lg:pt-[18px]"
      >
        <div
          className={cn(
            "pointer-events-auto flex h-14 items-center gap-2 rounded-full border px-2.5 backdrop-blur-xl backdrop-saturate-150 transition-[background-color,box-shadow,border-color] duration-300 sm:h-[60px] sm:px-3 lg:h-[66px] lg:gap-3 lg:px-4",
            scrolled
              ? "border-card/80 bg-card/80 shadow-card"
              : "border-card/65 bg-card/60 shadow-soft",
          )}
        >
          <div className="min-w-0 shrink pr-1 lg:w-[172px] lg:shrink-0">
            <Logo compact />
          </div>

          <nav aria-label="Navegación principal" className="mx-auto hidden lg:block">
            <ul className="flex items-center gap-0.5 xl:gap-1">
              {navItems.map((item) => {
                const active = isActive(item.to);
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "inline-flex h-10 items-center whitespace-nowrap rounded-full px-3 text-[13px] font-bold transition-colors xl:px-4 xl:text-sm",
                        active
                          ? "bg-blush text-foreground"
                          : "text-muted-foreground hover:bg-background/35 hover:text-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-1.5 lg:ml-0">
            <Link
              to="/mis-antojos"
              aria-label={`Mis antojos${favorites.length > 0 ? ` (${favorites.length})` : ""}`}
              className="group relative grid size-9 place-items-center rounded-full border border-border/60 bg-background/35 transition-colors hover:border-mauve hover:bg-blush sm:size-10"
            >
              <Heart
                aria-hidden="true"
                className={cn(
                  "size-[18px] text-mauve transition-all duration-200 group-hover:fill-mauve group-hover:scale-110",
                  beat && "animate-pop",
                )}
              />
              {favorites.length > 0 ? (
                <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-mauve px-1.5 text-[11px] font-bold text-mauve-foreground">
                  {favorites.length}
                </span>
              ) : null}
            </Link>

            <Link
              to="/contacto"
              aria-label="Contacto y perfil"
              className="hidden size-10 place-items-center rounded-full border border-border/60 bg-background/35 transition-colors hover:border-primary hover:bg-primary/15 xl:grid"
            >
              <User aria-hidden="true" className="size-[18px]" />
            </Link>

            <div>
              <PreferenceControls />
            </div>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Abrir menú"
                  className="size-9 rounded-full border border-border/60 bg-background/35 hover:bg-blush sm:size-10 lg:hidden"
                >
                  <Menu aria-hidden="true" className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                overlayClassName="bg-foreground/10 backdrop-blur-sm"
                className="inset-y-3 right-3 flex h-auto w-[min(88vw,390px)] flex-col gap-0 rounded-[2rem] border border-card/70 bg-card/75 p-4 shadow-pop backdrop-blur-xl backdrop-saturate-150 sm:inset-y-4 sm:right-4 sm:max-w-[390px] sm:p-5 lg:hidden [&>button]:right-5 [&>button]:top-5 [&>button]:grid [&>button]:size-10 [&>button]:place-items-center [&>button]:rounded-full [&>button]:bg-background/40"
              >
                <SheetHeader className="pr-12 text-left">
                  <SheetTitle className="sr-only">Menú principal</SheetTitle>
                  <SheetDescription className="sr-only">
                    Navegación, favoritos y preferencias de Como la Original.
                  </SheetDescription>
                  <Logo />
                </SheetHeader>

                <nav aria-label="Navegación móvil y tablet" className="mt-8">
                  <ul className="space-y-1">
                    {navItems.map((item) => (
                      <li key={item.to}>
                        <SheetClose asChild>
                          <Link
                            to={item.to}
                            aria-current={isActive(item.to) ? "page" : undefined}
                            className={cn(
                              "flex min-h-12 items-center rounded-full px-4 text-base font-bold transition-colors",
                              isActive(item.to)
                                ? "bg-blush text-foreground"
                                : "text-muted-foreground hover:bg-background/35 hover:text-foreground",
                            )}
                          >
                            {item.label}
                          </Link>
                        </SheetClose>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="my-5 h-px bg-border/70" />

                <SheetClose asChild>
                  <Link
                    to="/mis-antojos"
                    className="flex min-h-12 items-center gap-3 rounded-full px-4 text-base font-semibold transition-colors hover:bg-blush"
                  >
                    <Heart aria-hidden="true" className="size-4 text-mauve" />
                    Mis favoritos
                    {favorites.length > 0 ? (
                      <span className="ml-auto rounded-full bg-mauve px-2 py-0.5 text-xs font-bold text-mauve-foreground">
                        {favorites.length}
                      </span>
                    ) : null}
                  </Link>
                </SheetClose>

                <PreferenceControls panel />

                <div className="mt-auto pt-6">
                  <SheetClose asChild>
                    <Button asChild className="h-12 w-full rounded-full text-base font-bold shadow-soft">
                      <Link to="/">
                        Encontrar mi antojo
                        <ArrowRight aria-hidden="true" />
                      </Link>
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
