import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { AppIcon } from "@/components/common/AppIcon";
import { ComparisonChart } from "@/components/common/ComparisonChart";
import { DemoImageFrame } from "@/components/common/DemoImageFrame";
import { DietaryBadges } from "@/components/common/DietaryBadges";
import { FavoriteButton } from "@/components/common/FavoriteButton";
import { ReviewSummaryCard } from "@/components/common/ReviewSummaryCard";
import { ScoreBreakdown } from "@/components/common/ScoreBreakdown";
import { SimilarityScore } from "@/components/common/SimilarityScore";
import { StoreList } from "@/components/common/StoreList";
import {
  getAlternativeSync,
  getAlternativesForOriginalSync,
  getCategory,
  getComparisonSync,
  getOriginalByIdSync,
} from "@/services/productService";

export const Route = createFileRoute("/producto/$slug")({
  loader: ({ params }) => {
    const product = getAlternativeSync(params.slug);
    if (!product) throw notFound();
    const original = getOriginalByIdSync(product.originalProductId);
    if (!original) throw notFound();
    return {
      product,
      original,
      comparison: getComparisonSync(product.id) ?? null,
      related: getAlternativesForOriginalSync(original.id).filter((a) => a.id !== product.id),
    };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Producto no disponible · Como la Original" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    return {
      meta: [
        { title: product.seoTitle },
        { name: "description", content: product.seoDescription },
        { property: "og:title", content: product.seoTitle },
        { property: "og:description", content: product.seoDescription },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/producto/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/producto/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            brand: { "@type": "Brand", name: product.brand },
            description: product.seoDescription,
          }),
        },
      ],
    };
  },
  component: ProductoDetalle,
});

function ProductoDetalle() {
  const { product, original, comparison, related } = Route.useLoaderData();
  const category = getCategory(product.categoryId);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Breadcrumb
        items={[
          { label: "Inicio", to: "/" },
          { label: original.name, to: "/original/$slug", params: { slug: original.slug } },
          { label: product.name },
        ]}
      />

      <section className="mt-6 grid gap-8 md:grid-cols-2">
        <div className="grid gap-4 sm:grid-cols-2">
          <DemoImageFrame image={product.packageImage} icon={original.icon} />
          <DemoImageFrame image={product.openProductImage} icon="utensils" tone="blush" />
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
            {product.brand}
            {category ? <span className="inline-flex items-center gap-1.5"> · <AppIcon aria-hidden="true" name={category.icon} className="size-4" />{category.name}</span> : ""}
          </p>
          <h1 className="mt-1 text-3xl sm:text-4xl">{product.name}</h1>
          <p className="mt-3 text-muted-foreground">{product.description}</p>

          <div className="mt-6 flex items-center gap-5 rounded-3xl bg-cream p-5">
            <SimilarityScore value={product.overallSimilarity} size="lg" />
            <p className="text-sm">
              Comparado con <strong>{original.name}</strong> según sabor, textura, relleno y parecido
              general.
            </p>
          </div>

          <div className="mt-5">
            <DietaryBadges product={product} />
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <FavoriteButton alternativeId={product.id} originalId={original.id} />
            <Link
              to="/original/$slug"
              params={{ slug: original.slug }}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-border px-5 text-sm font-bold"
            >
              Ver todas las alternativas
              <ExternalLink aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl">Puntuaciones detalladas</h2>
        <div className="mt-4 rounded-3xl border border-border bg-card p-6 shadow-soft">
          <ScoreBreakdown
            scores={[
              { icon: "taste", label: "Sabor", value: product.tasteScore },
              { icon: "texture", label: "Textura", value: product.textureScore },
              { icon: "cookie", label: "Parecido al original", value: product.similarityScore },
              { icon: "milk", label: "Crema / relleno", value: product.fillingScore },
            ]}
          />
        </div>
      </section>

      {comparison ? (
        <section className="mt-12">
          <h2 className="text-2xl">Comparativa con el original</h2>
          <div className="mt-4">
            <ComparisonChart
              comparison={comparison}
              original={original}
              alternativeName={product.name}
            />
          </div>
        </section>
      ) : null}

      <section className="mt-12 grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl">Qué dice la gente</h2>
          <div className="mt-4">
            <ReviewSummaryCard summary={product.reviewSummary} />
          </div>
        </div>
        <div>
          <h2 className="text-2xl">Dónde encontrarlo</h2>
          <div className="mt-4">
            <StoreList stores={product.stores} productName={product.name} />
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl">Información alimentaria</h2>
        <div className="mt-4 rounded-3xl border border-border bg-card p-6 text-sm shadow-soft">
          <p>
            <strong>Alérgenos declarados:</strong>{" "}
            {product.allergens.length > 0 ? product.allergens.join(", ") : "Sin datos disponibles"}
          </p>
          <p className="mt-2 text-muted-foreground">
            Fuente: {product.source}
            {product.lastVerified ? ` · Última verificación: ${product.lastVerified}` : ""}
          </p>
          <p className="mt-3 rounded-2xl bg-beige p-4 text-muted-foreground">
            La información puede variar según el lote o el país. Verifica siempre el etiquetado del
            producto antes de consumirlo.
          </p>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-2xl">Otras alternativas parecidas</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((alt) => (
              <li key={alt.id}>
                <Link
                  to="/producto/$slug"
                  params={{ slug: alt.slug }}
                  className="block h-full rounded-3xl border border-border bg-card p-4 shadow-soft transition-transform hover:-translate-y-1"
                >
                  <DemoImageFrame image={alt.packageImage} icon={original.icon} />
                  <p className="mt-3 text-xs font-bold uppercase text-muted-foreground">{alt.brand}</p>
                  <p className="font-display text-lg font-extrabold">{alt.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {alt.overallSimilarity}% parecido
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
