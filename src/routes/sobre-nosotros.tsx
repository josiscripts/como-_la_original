import { createFileRoute, Link } from "@tanstack/react-router";
import { Blob, Sparkle } from "@/components/brand/Doodles";
import { AppIcon, type AppIconName } from "@/components/common/AppIcon";

export const Route = createFileRoute("/sobre-nosotros")({
  head: () => ({
    meta: [
      { title: "Sobre nosotros · Como la Original" },
      {
        name: "description",
        content:
          "Todos tenemos antojos. Como la Original nace para ayudarte a encontrar algo que se parezca de verdad a lo que te apetece.",
      },
      { property: "og:title", content: "Sobre Como la Original" },
      {
        property: "og:description",
        content: "Por qué existimos y qué nos importa cuando comparamos alternativas.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/sobre-nosotros" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/sobre-nosotros" }],
  }),
  component: SobreNosotros,
});

function SobreNosotros() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <section className="relative overflow-hidden rounded-4xl bg-blush px-6 py-14 text-center sm:px-12">
        <Blob className="pointer-events-none absolute -right-16 -top-20 size-64 text-cream" />
        <Sparkle aria-hidden="true" className="mx-auto size-8 text-primary" />
        <h1 className="relative mt-4 text-3xl sm:text-4xl">
          Todos tenemos antojos. El problema es cuando nuestro antojo favorito no encaja con lo que
          podemos o queremos comer.
        </h1>
      </section>

      <div className="mt-12 space-y-6 text-base leading-relaxed">
        <p>
          Como la Original nació de una frustración muy concreta: buscar una alternativa a tu snack
          de siempre y acabar con una lista interminable de productos que no se parecen en nada al
          que te apetecía.
        </p>
        <p>
          Nuestra misión es simple. Convertir esa búsqueda en algo rápido, claro y hasta divertido:
          tú dices qué se te antoja, nosotros comparamos y te enseñamos qué se le parece de verdad.
        </p>
        <p className="rounded-3xl bg-cream p-6 font-display text-xl font-extrabold">
          No queremos decirte simplemente qué puedes comer. Queremos ayudarte a encontrar algo que
          realmente se parezca a lo que te apetece.
        </p>
        <p>
          Por eso nunca damos un veredicto sin explicación: cada porcentaje viene acompañado de los
          criterios que lo componen y del estado de verificación de la información alimentaria.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          { icon: "search" as AppIconName, title: "Transparentes", text: "Enseñamos el porqué de cada puntuación." },
          { icon: "heart" as AppIconName, title: "Cercanos", text: "Hablamos de antojos, no de dietas." },
          { icon: "shield-check" as AppIconName, title: "Prudentes", text: "Nunca afirmamos lo que no podemos verificar." },
        ].map((v) => (
          <div key={v.title} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <AppIcon aria-hidden="true" name={v.icon} className="size-8" />
            <h2 className="mt-2 text-lg">{v.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{v.text}</p>
          </div>
        ))}
      </div>

      <Link
        to="/"
        className="mt-10 inline-flex min-h-12 items-center rounded-full bg-primary px-6 font-display font-extrabold text-primary-foreground"
      >
        Encontrar mi alternativa
      </Link>
    </main>
  );
}
