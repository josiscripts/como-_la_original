import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { EmptyState } from "@/components/common/EmptyState";
import { LoadingState } from "@/components/common/LoadingState";
import { ProductCard } from "@/components/product/ProductCard";
import { RankingHeader } from "@/components/product/RankingHeader";
import { DietaryFilter } from "@/components/search/DietaryFilter";
import { SearchBar } from "@/components/search/SearchBar";
import { isDietaryNeed, search } from "@/services/productService";
import type { DietaryNeed, SearchResult } from "@/types";

interface ResultsSearch {
  q: string;
  need: DietaryNeed;
}

export const Route = createFileRoute("/resultados")({
  validateSearch: (raw: Record<string, unknown>): ResultsSearch => {
    const need = typeof raw["need"] === "string" ? raw["need"] : undefined;
    return {
      q: typeof raw["q"] === "string" ? raw["q"] : "",
      need: isDietaryNeed(need) ? need : "sin-gluten",
    };
  },
  head: () => ({
    meta: [
      { title: "Resultados de tu antojo · Como la Original" },
      {
        name: "description",
        content:
          "Ranking de las alternativas más parecidas a tu antojo, con puntuación de sabor, textura y parecido al original.",
      },
      { property: "og:title", content: "Las alternativas más parecidas a tu antojo" },
      {
        property: "og:description",
        content: "Compara sabor, textura y relleno frente al producto original.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/resultados" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/resultados" }],
  }),
  component: Resultados,
});

function Resultados() {
  const { q, need } = Route.useSearch();
  const navigate = useNavigate({ from: "/resultados" });
  const [term, setTerm] = useState(q);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<SearchResult | null>(null);

  useEffect(() => {
    setTerm(q);
  }, [q]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    search(q, need).then((data) => {
      if (!active) return;
      setResult(data);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [q, need]);

  function update(next: Partial<ResultsSearch>) {
    void navigate({ search: (prev) => ({ ...prev, ...next }) });
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Breadcrumb items={[{ label: "Inicio", to: "/" }, { label: "Resultados" }]} />

      <div className="mt-6 grid gap-4 rounded-3xl border border-border bg-card p-5 shadow-soft md:grid-cols-[1.4fr_1fr]">
        <SearchBar
          value={term}
          onChange={setTerm}
          onSubmit={(value) => update({ q: value })}
          size="compact"
        />
        <DietaryFilter value={need} onChange={(value) => update({ need: value })} layout="row" />
      </div>

      {loading ? (
        <div className="mt-10">
          <LoadingState />
        </div>
      ) : !result || result.alternatives.length === 0 ? (
        <div className="mt-10">
          <EmptyState
            icon="help"
            title="Todavía no tenemos una alternativa para este antojo"
            description="Estamos ampliando el catálogo cada semana. Cuéntanos qué buscabas y lo añadimos."
            action={
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  to="/contacto"
                  className="inline-flex min-h-12 items-center rounded-full bg-primary px-6 font-display font-extrabold text-primary-foreground"
                >
                  Sugerir este producto
                </Link>
                <Link
                  to="/"
                  className="inline-flex min-h-12 items-center rounded-full border-2 border-border px-6 font-display font-extrabold"
                >
                  Probar otro antojo
                </Link>
              </div>
            }
          />
        </div>
      ) : (
        <>
          <div className="mt-8">
            <RankingHeader
              originalName={result.original.name}
              need={result.need}
              count={result.alternatives.length}
            />
          </div>

          <div className="mt-6 space-y-6">
            {result.alternatives.map((alt, i) => (
              <ProductCard
                key={alt.id}
                product={alt}
                rank={i + 1}
                icon={result.original.icon}
                index={i}
              />
            ))}
          </div>

          <div className="mt-10 rounded-3xl bg-beige p-6 text-sm text-muted-foreground">
            Las puntuaciones son orientativas y se basan en los datos disponibles de cada producto.
            Revisa siempre el etiquetado antes de consumir.{" "}
            <Link to="/como-funciona" className="font-bold text-foreground underline">
              Cómo calculamos el parecido
            </Link>
          </div>
        </>
      )}
    </main>
  );
}
