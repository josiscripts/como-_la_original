import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/layout/LegalPage";

export const Route = createFileRoute("/aviso-legal")({
  head: () => ({
    meta: [
      { title: "Aviso legal · Como la Original" },
      {
        name: "description",
        content:
          "Información legal sobre el titular del sitio Como la Original, su finalidad y las condiciones de uso.",
      },
      { property: "og:title", content: "Aviso legal · Como la Original" },
      { property: "og:description", content: "Titularidad y condiciones de uso del sitio." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/aviso-legal" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/aviso-legal" }],
  }),
  component: () => (
    <LegalPage
      title="Aviso legal"
      intro="Condiciones generales de acceso y uso del sitio web Como la Original."
    >
      <section>
        <h2>Titular del sitio</h2>
        <p>
          Como la Original (en adelante, «el Sitio») es una plataforma informativa de comparación de
          alternativas alimentarias. Los datos identificativos del titular se completarán antes de la
          publicación.
        </p>
      </section>
      <section>
        <h2>Objeto</h2>
        <p>
          El Sitio ofrece información comparativa entre productos alimentarios. No comercializa
          productos, no gestiona pedidos ni intermedia en compras realizadas en tiendas de terceros.
        </p>
      </section>
      <section>
        <h2>Responsabilidad sobre la información</h2>
        <ul>
          <li>La información alimentaria puede variar según el lote, el país o el fabricante.</li>
          <li>Los porcentajes de similitud son valoraciones orientativas, no datos oficiales.</li>
          <li>Consulta siempre el etiquetado del producto antes de consumirlo.</li>
        </ul>
      </section>
      <section>
        <h2>Enlaces a terceros</h2>
        <p>
          El Sitio puede enlazar a tiendas externas. No controlamos sus contenidos, precios ni
          disponibilidad y no asumimos responsabilidad sobre las operaciones realizadas en ellas.
        </p>
      </section>
    </LegalPage>
  ),
});
