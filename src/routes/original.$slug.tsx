import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { AppIcon } from "@/components/common/AppIcon";
import { DemoImageFrame } from "@/components/common/DemoImageFrame";
import { ProductCard } from "@/components/product/ProductCard";
import {
  findOriginalSync,
  getAlternativesForOriginalSync,
  getCategory,
} from "@/services/productService";

export const Route = createFileRoute("/original/$slug")({
  loader: ({ params }) => {
    const original = findOriginalSync(params.slug);
    if (!original) throw notFound();
    return { original, alternatives: getAlternativesForOriginalSync(original.id) };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Producto no disponible · Como la Original" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { original } = loaderData;
    return {
      meta: [
        { title: original.seoTitle },
        { name: "description", content: original.seoDescription },
        { property: "og:title", content: original.seoTitle },
        { property: "og:description", content: original.seoDescription },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/original/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/original/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: original.seoTitle,
            itemListElement: loaderData.alternatives.map((a, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: a.name,
            })),
          }),
        },
      ],
    };
  },
  component: OriginalLanding,
});

function OriginalLanding() {
  const { original, alternatives } = Route.useLoaderData();
  const category = getCategory(original.categoryId);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Breadcrumb items={[{ label: "Inicio", to: "/" }, { label: original.name }]} />

      <section className="mt-6 grid gap-8 rounded-4xl bg-blush p-6 sm:p-10 md:grid-cols-[1fr_260px]">
        <div>
          <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-mauve">
            {category ? <span className="inline-flex items-center gap-1.5"><AppIcon aria-hidden="true" name={category.icon} className="size-4" />{category.name}</span> : "Producto original"}
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl">
            Alternativas a {original.name}: lo más parecido que puedes comer
          </h1>
          <p className="mt-3 text-muted-foreground">{original.description}</p>
          <Link
            to="/resultados"
            search={{ q: original.slug, need: "sin-gluten" }}
            className="mt-6 inline-flex min-h-12 items-center rounded-full bg-primary px-6 font-display font-extrabold text-primary-foreground"
          >
            Comparar alternativas
          </Link>
        </div>
        <DemoImageFrame image={original.image} icon={original.icon} tone="cream" />
      </section>

      <section className="mt-12">
        <h2 className="text-2xl">Las alternativas mejor valoradas</h2>
        <div className="mt-5 space-y-6">
          {alternatives.map((alt, i) => (
            <ProductCard
              key={alt.id}
              product={alt}
              rank={i + 1}
              icon={original.icon}
              index={i}
            />
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-3xl bg-cream p-6 sm:p-8">
        <h2 className="text-2xl">Preguntas frecuentes sobre {original.name}</h2>
        <dl className="mt-4 space-y-4 text-sm">
          <div>
            <dt className="font-display text-lg font-extrabold">
              ¿Existe una versión sin gluten de {original.name}?
            </dt>
            <dd className="mt-1 text-muted-foreground">
              Depende del país y del fabricante. Por eso comparamos alternativas de otras marcas y te
              mostramos el estado de verificación de cada una.
            </dd>
          </div>
          <div>
            <dt className="font-display text-lg font-extrabold">
              ¿Cuál es la alternativa más parecida?
            </dt>
            <dd className="mt-1 text-muted-foreground">
              La que encabeza este ranking según nuestro índice de similitud: sabor, textura, relleno
              y parecido general.
            </dd>
          </div>
          <div>
            <dt className="font-display text-lg font-extrabold">¿Puedo comprarla aquí?</dt>
            <dd className="mt-1 text-muted-foreground">
              No. Como la Original solo compara: te indicamos dónde suele encontrarse cada producto.
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
