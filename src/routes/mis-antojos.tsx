import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { DemoImageFrame } from "@/components/common/DemoImageFrame";
import { EmptyState } from "@/components/common/EmptyState";
import { SimilarityScore } from "@/components/common/SimilarityScore";
import { useFavorites } from "@/hooks/useFavorites";
import { getAlternativeSync, getOriginalByIdSync } from "@/services/productService";

export const Route = createFileRoute("/mis-antojos")({
  head: () => ({
    meta: [
      { title: "Mis antojos guardados · Como la Original" },
      {
        name: "description",
        content:
          "Tu lista personal de alternativas guardadas, agrupadas por producto original y almacenada solo en tu navegador.",
      },
      { property: "og:title", content: "Mis antojos · Como la Original" },
      { property: "og:description", content: "Las alternativas que has guardado para después." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/mis-antojos" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/mis-antojos" }],
  }),
  component: MisAntojos,
});

function MisAntojos() {
  const { favorites, remove } = useFavorites();

  const groups = favorites.reduce<Record<string, typeof favorites>>((acc, fav) => {
    const list = acc[fav.originalId] ?? [];
    list.push(fav);
    acc[fav.originalId] = list;
    return acc;
  }, {});

  return (
    <main className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <h1 className="text-4xl">Mis antojos</h1>
      <p className="mt-3 text-muted-foreground">
        Guardadas en este navegador. Si borras los datos del sitio, la lista desaparece.
      </p>

      {favorites.length === 0 ? (
        <div className="mt-10">
          <EmptyState
            icon="heart"
            title="Todavía no has guardado ningún antojo"
            description="Busca un producto y pulsa el corazón para tenerlo siempre a mano."
            action={
              <Link
                to="/"
                className="inline-flex min-h-12 items-center rounded-full bg-primary px-6 font-display font-extrabold text-primary-foreground"
              >
                Buscar mi antojo
              </Link>
            }
          />
        </div>
      ) : (
        <div className="mt-10 space-y-10">
          {Object.entries(groups).map(([originalId, items]) => {
            const original = getOriginalByIdSync(originalId);
            return (
              <section key={originalId}>
                <h2 className="text-2xl">
                  {original ? `Alternativas a ${original.name}` : "Otras alternativas"}
                </h2>
                <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                  {items.map((fav) => {
                    const product = getAlternativeSync(fav.alternativeId);
                    if (!product) return null;
                    return (
                      <li
                        key={fav.alternativeId}
                        className="flex gap-4 rounded-3xl border border-border bg-card p-4 shadow-soft"
                      >
                        <DemoImageFrame
                          image={product.packageImage}
                          icon={original?.icon ?? "cookie"}
                          className="w-24 shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold uppercase text-muted-foreground">
                            {product.brand}
                          </p>
                          <h3 className="text-lg">{product.name}</h3>
                          <div className="mt-2 flex items-center gap-3">
                            <SimilarityScore value={product.overallSimilarity} size="sm" label="" />
                            <Link
                              to="/producto/$slug"
                              params={{ slug: product.slug }}
                              className="text-sm font-bold underline"
                            >
                              Ver ficha
                            </Link>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(fav.alternativeId)}
                          aria-label={`Quitar ${product.name} de mis antojos`}
                          className="grid size-11 shrink-0 place-items-center self-start rounded-full border border-border transition-colors hover:bg-blush"
                        >
                          <Trash2 aria-hidden="true" className="size-4" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </main>
  );
}
