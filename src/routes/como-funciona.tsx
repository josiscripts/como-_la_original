import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/como-funciona")({
  head: () => ({
    meta: [
      { title: "Cómo funciona · Como la Original" },
      {
        name: "description",
        content:
          "Así calculamos el parecido entre tu antojo original y las alternativas: criterios, datos y límites del índice de similitud.",
      },
      { property: "og:title", content: "Cómo encontramos alternativas tan parecidas" },
      {
        property: "og:description",
        content: "El método de Como la Original, paso a paso y sin humo.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/como-funciona" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/como-funciona" }],
  }),
  component: ComoFunciona,
});

const steps = [
  {
    n: "01",
    title: "Identificamos el producto original",
    text: "Partimos del antojo concreto que buscas y de su categoría.",
  },
  {
    n: "02",
    title: "Aplicamos tus necesidades alimentarias",
    text: "Filtramos por sin gluten, sin lactosa o ambas condiciones.",
  },
  {
    n: "03",
    title: "Analizamos características del producto",
    text: "Formato, ingredientes principales, proporciones y elaboración.",
  },
  {
    n: "04",
    title: "Comparamos sabor, textura y relleno",
    text: "Puntuamos cada criterio frente al original, uno a uno.",
  },
  {
    n: "05",
    title: "Calculamos un índice de similitud",
    text: "Combinamos los criterios en un porcentaje único y comparable.",
  },
  {
    n: "06",
    title: "Ordenamos las mejores alternativas",
    text: "Mostramos un ranking de 5 opciones, de más a menos parecida.",
  },
];

function ComoFunciona() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <h1 className="max-w-2xl text-4xl sm:text-5xl">
        ¿Cómo encontramos alternativas tan parecidas?
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        No hay magia: hay método. Comparamos cada alternativa con el original criterio a criterio y
        te enseñamos el resultado completo, no solo el titular.
      </p>

      <ol className="mt-10 grid gap-4 sm:grid-cols-2">
        {steps.map((s) => (
          <li key={s.n} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <p className="font-display text-3xl font-extrabold text-primary">{s.n}</p>
            <h2 className="mt-2 text-lg">{s.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
          </li>
        ))}
      </ol>

      <section className="mt-12 rounded-3xl bg-blush p-6 sm:p-8">
        <h2 className="text-2xl">Qué puedes esperar (y qué no)</h2>
        <ul className="mt-4 space-y-2 text-sm">
          <li>
            Las puntuaciones dependen de los datos disponibles para cada producto. Cuando faltan
            datos, lo indicamos en lugar de rellenar huecos.
          </li>
          <li>
            No afirmamos que un producto sea apto para celiacos: mostramos el estado de verificación
            de cada característica.
          </li>
          <li>
            Hoy el índice se calcula con criterios definidos manualmente. No usamos inteligencia
            artificial en el cálculo.
          </li>
          <li>Como la Original no vende productos ni gestiona compras.</li>
        </ul>
        <Link
          to="/"
          className="mt-6 inline-flex min-h-12 items-center rounded-full bg-primary px-6 font-display font-extrabold text-primary-foreground"
        >
          Buscar mi antojo
        </Link>
      </section>
    </main>
  );
}
