import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Sparkle } from "@/components/brand/Doodles";
import { HeroBrandTitle } from "@/components/brand/HeroBrandTitle";
import { DemoImageFrame } from "@/components/common/DemoImageFrame";
import { AppIcon, type AppIconName } from "@/components/common/AppIcon";
import { SimilarityScore } from "@/components/common/SimilarityScore";
import { DietaryFilter } from "@/components/search/DietaryFilter";
import { SearchBar } from "@/components/search/SearchBar";
import {
  getAlternativesForOriginalSync,
  getCategories,
  listOriginalsSync,
} from "@/services/productService";
import type { DietaryNeed } from "@/types";
import heroAsset from "@/assets/hero-snacks.png.asset.json";
import darkHeroDesktop from "@/assets/fondo-oscuro-pc.png.asset.json";
import darkHeroMobile from "@/assets/fondo-oscuro-movil.png.asset.json";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Como la Original · Encuentra lo más parecido a tu antojo" },
      {
        name: "description",
        content:
          "Tú dime qué se te antoja. Nosotros encontramos lo más parecido que puedas comer: alternativas sin gluten y sin lactosa comparadas con el original.",
      },
      { property: "og:title", content: "Como la Original · Tu antojo, comparado" },
      {
        property: "og:description",
        content:
          "Busca tu antojo y descubre las alternativas más parecidas, con puntuación de sabor, textura y relleno.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Como la Original",
          description:
            "Plataforma de búsqueda y comparación de alternativas alimentarias parecidas al producto original.",
        }),
      },
    ],
  }),
  component: Home,
});

const popularIcons: Record<string, AppIconName> = {
  Oreo: "cookie",
  KitKat: "candy",
  "Kinder Bueno": "wafer",
  Magnum: "ice-cream",
};

const steps = [
  { icon: "search" as AppIconName, title: "Dinos tu antojo", text: "Escribe el producto que te apetece de verdad." },
  { icon: "salad" as AppIconName, title: "Elige tu necesidad", text: "Sin gluten, sin lactosa o ambas." },
  { icon: "trophy" as AppIconName, title: "Compara y decide", text: "Ranking con el parecido a tu original." },
];

function Home() {
  const navigate = useNavigate();
  const [term, setTerm] = useState("");
  const [need, setNeed] = useState<DietaryNeed>("sin-gluten");

  const categories = getCategories();
  const originals = listOriginalsSync();
  const featured = originals[0];
  const featuredTop = featured ? getAlternativesForOriginalSync(featured.id)[0] : undefined;

  function go(value: string) {
    if (!value.trim()) return;
    void navigate({ to: "/resultados", search: { q: value, need } });
  }

  return (
    <main>
      <section className="relative m-0 flex h-[100svh] min-h-[100svh] w-full items-center justify-center overflow-hidden px-0 pb-6 pt-[92px] sm:pb-8 sm:pt-[104px]">
        <div
          aria-hidden="true"
          className="hero-light-decor pointer-events-none absolute inset-0 bg-cream"
          style={{
            backgroundImage:
              "radial-gradient(140% 110% at 50% 42%, color-mix(in oklab, var(--card) 70%, transparent) 0%, transparent 78%)",
          }}
        />

        <picture aria-hidden="true" className="hero-dark-background pointer-events-none absolute inset-0 hidden">
          <source media="(min-width: 1024px)" srcSet={darkHeroDesktop.url} />
          <img src={darkHeroMobile.url} alt="" className="size-full object-cover object-center" />
        </picture>

        {/* Oreo entrando desde la izquierda */}
        <div
          aria-hidden="true"
          className="hero-light-decor pointer-events-none absolute -left-16 inset-y-0 hidden h-full w-[36%] lg:block xl:-left-10"
          style={{ maskImage: "linear-gradient(to right, black 46%, transparent 92%)" }}
        >
          <img
            src={heroAsset.url}
            alt=""
            className="size-full origin-center scale-[1.55] object-cover object-left drop-shadow-[0_28px_36px_rgba(58,46,42,0.16)] motion-safe:animate-float-slow"
            style={{ ["--clo-tilt" as string]: "-3deg" }}
          />
        </div>

        {/* Croissant entrando desde la derecha */}
        <div
          aria-hidden="true"
          className="hero-light-decor pointer-events-none absolute -right-16 inset-y-0 hidden h-full w-[36%] lg:block xl:-right-10"
          style={{ maskImage: "linear-gradient(to left, black 46%, transparent 92%)" }}
        >
          <img
            src={heroAsset.url}
            alt=""
            className="size-full origin-center scale-[1.55] object-cover object-right drop-shadow-[0_28px_36px_rgba(58,46,42,0.16)] motion-safe:animate-float-slower"
            style={{ ["--clo-tilt" as string]: "3deg" }}
          />
        </div>

        {/* Composición móvil / tablet */}
        <div
          aria-hidden="true"
          className="hero-light-decor pointer-events-none absolute -left-16 top-[8%] h-52 w-52 sm:-left-12 sm:h-72 sm:w-72 md:-left-10 md:top-[10%] md:h-80 md:w-80 lg:hidden"
          style={{ maskImage: "radial-gradient(66% 66% at 45% 50%, black 28%, transparent 100%)" }}
        >
          <img
            src={heroAsset.url}
            alt=""
            className="size-full scale-[1.25] object-cover object-left motion-safe:animate-float-slow"
            style={{ ["--clo-tilt" as string]: "-2deg" }}
          />
        </div>
        <div
          aria-hidden="true"
          className="hero-light-decor pointer-events-none absolute -right-16 bottom-[4%] h-52 w-52 sm:-right-12 sm:h-72 sm:w-72 md:-right-10 md:h-80 md:w-80 lg:hidden"
          style={{ maskImage: "radial-gradient(66% 66% at 55% 50%, black 28%, transparent 100%)" }}
        >
          <img
            src={heroAsset.url}
            alt=""
            className="size-full scale-[1.25] object-cover object-right motion-safe:animate-float-slower"
            style={{ ["--clo-tilt" as string]: "2deg" }}
          />
        </div>

        {/* Migas y destellos */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-[22%] top-[26%] size-2 rounded-full bg-cocoa/25 motion-safe:animate-drift"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-[28%] bottom-[24%] size-1.5 rounded-full bg-cocoa/20 motion-safe:animate-drift"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-[24%] top-[32%] size-1.5 rounded-full bg-cocoa/20 motion-safe:animate-drift"
        />
        <Sparkle
          aria-hidden="true"
          className="pointer-events-none absolute right-[20%] bottom-[26%] size-4 text-primary/40 motion-safe:animate-drift"
        />

        <div
          className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-4 text-center sm:px-6"
          style={{ gap: "clamp(0.4rem, 1.9vh, 1.5rem)" }}
        >
          <p className="inline-flex items-center gap-2 rounded-full bg-blush px-4 py-1.5 font-display text-[10px] font-extrabold uppercase tracking-[0.2em] text-mauve sm:text-[11px] sm:tracking-[0.22em]">
            <Sparkle aria-hidden="true" className="size-3.5" />
            Tu antojo, comparado
            <Sparkle aria-hidden="true" className="size-3.5" />
          </p>

          <HeroBrandTitle className="mx-auto w-full max-w-full" />
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:text-sm">
            Busca tu antojo y descubre la alternativa
          </p>
          <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
            ¿Qué se te antoja?
          </h1>

          <div className="mx-auto mt-1 w-full max-w-[680px] sm:mt-2 lg:max-w-2xl">
            <SearchBar
              value={term}
              onChange={setTerm}
              onSubmit={go}
              size="hero"
              submitLabel="Buscar mi antojo"
            />
          </div>

          <ul className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {["Oreo", "KitKat", "Kinder Bueno", "Magnum"].map((p) => (
              <li key={p}>
                <button
                  type="button"
                  onClick={() => {
                    setTerm(p);
                    go(p);
                  }}
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-border bg-card/85 px-3 text-[0.8rem] font-semibold shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-card sm:min-h-10 sm:px-3.5 sm:text-sm"
                >
                   <AppIcon aria-hidden="true" name={popularIcons[p] ?? "sparkles"} className="size-4" />
                  {p}
                </button>
              </li>
            ))}
            <li>
              <a
                href="#antojos"
                className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-primary/50 bg-primary/10 px-3 text-[0.8rem] font-bold text-primary shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-card sm:min-h-10 sm:px-3.5 sm:text-sm"
              >
                 <AppIcon aria-hidden="true" name="sparkles" className="size-4" />
                Ver todo
              </a>
            </li>
          </ul>

          <div className="mx-auto w-full max-w-xl">
            <DietaryFilter
              value={need}
              onChange={setNeed}
              layout="pills"
              legend="¿Qué necesitas?"
              note="Solo mostraremos alternativas que podamos verificar."
            />
          </div>

          <button
            type="button"
            onClick={() => go(term)}
            className="group mt-1 inline-flex min-h-12 w-[min(85%,340px)] items-center justify-center gap-2 rounded-full bg-primary px-6 font-display text-base font-extrabold text-primary-foreground shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-pop sm:mt-2 sm:w-auto sm:px-9 lg:min-h-14 lg:text-lg"
          >
            Encontrar mi antojo
            <ArrowRight
              aria-hidden="true"
              className="size-5 transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>

      </section>


      <section className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <h2 className="text-center text-3xl">Así funciona</h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-3">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="rounded-3xl border-2 border-border bg-card p-6 text-center shadow-soft"
            >
               <AppIcon aria-hidden="true" name={s.icon} className="mx-auto size-10" />
              <p className="mt-3 font-display text-xs font-extrabold uppercase tracking-wide text-primary">
                Paso {i + 1}
              </p>
              <h3 className="mt-1 text-xl">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {featured && featuredTop ? (
        <section className="mx-auto mt-12 max-w-5xl px-4 sm:px-6">
          <div className="grid items-center gap-8 rounded-4xl bg-blush p-6 sm:p-10 md:grid-cols-2">
            <div>
              <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-mauve">
                Ejemplo de comparación
              </p>
              <h2 className="mt-2 text-3xl">
                {featured.name} vs {featuredTop.name}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">{featuredTop.description}</p>
              <div className="mt-5 flex items-center gap-4">
                <SimilarityScore value={featuredTop.overallSimilarity} size="md" />
                <Link
                  to="/producto/$slug"
                  params={{ slug: featuredTop.slug }}
                  className="inline-flex min-h-12 items-center rounded-full bg-foreground px-6 font-display font-extrabold text-background"
                >
                  Ver la comparativa
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <DemoImageFrame image={featured.image} icon={featured.icon} tone="cream" />
              <DemoImageFrame
                image={featuredTop.packageImage}
                 icon={featured.icon}
                tone="beige"
              />
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto mt-16 max-w-5xl px-4 sm:px-6">
        <h2 className="text-3xl">Explora por categoría</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                type="button"
                onClick={() => go(cat.name)}
                className="h-full w-full rounded-3xl border-2 border-border bg-card p-6 text-left shadow-soft transition-transform hover:-translate-y-1"
              >
                 <AppIcon aria-hidden="true" name={cat.icon} className="size-8" />
                <p className="mt-2 font-display text-lg font-extrabold">{cat.name}</p>
                <p className="text-sm text-muted-foreground">Ver alternativas parecidas</p>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section id="antojos" className="mx-auto mt-16 max-w-5xl scroll-mt-24 px-4 sm:px-6">
        <h2 className="text-3xl">Antojos con alternativa</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {originals.map((o) => (
            <li key={o.id}>
              <Link
                to="/original/$slug"
                params={{ slug: o.slug }}
                className="block h-full rounded-3xl border-2 border-border bg-card p-5 shadow-soft transition-transform hover:-translate-y-1"
              >
                 <DemoImageFrame image={o.image} icon={o.icon} tone="cream" />
                <p className="mt-3 font-display text-lg font-extrabold">{o.name}</p>
                <p className="text-sm text-muted-foreground">{o.brandNote}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto mt-16 max-w-3xl px-4 text-center sm:px-6">
        <div className="rounded-4xl bg-cream px-6 py-12">
          <h2 className="text-3xl">¿No encuentras tu antojo?</h2>
          <p className="mt-2 text-muted-foreground">
            Cuéntanoslo y lo añadimos al catálogo de comparaciones.
          </p>
          <Link
            to="/contacto"
            className="mt-6 inline-flex min-h-12 items-center rounded-full bg-primary px-6 font-display font-extrabold text-primary-foreground"
          >
            Sugerir un producto
          </Link>
        </div>
      </section>
    </main>
  );
}
