import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/layout/LegalPage";

export const Route = createFileRoute("/terminos")({
  head: () => ({
    meta: [
      { title: "Términos y condiciones · Como la Original" },
      {
        name: "description",
        content:
          "Condiciones de uso de Como la Original: alcance del servicio de comparación y límites de responsabilidad.",
      },
      { property: "og:title", content: "Términos y condiciones · Como la Original" },
      { property: "og:description", content: "Reglas de uso de la plataforma de comparación." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/terminos" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/terminos" }],
  }),
  component: () => (
    <LegalPage
      title="Términos y condiciones"
      intro="Al usar Como la Original aceptas las condiciones descritas en esta página."
    >
      <section>
        <h2>Servicio ofrecido</h2>
        <p>
          Como la Original es un servicio de búsqueda, descubrimiento y comparación de alternativas
          alimentarias. No es una tienda: no vendemos productos ni procesamos pagos.
        </p>
      </section>
      <section>
        <h2>Uso de la información</h2>
        <ul>
          <li>Los índices de similitud son valoraciones orientativas.</li>
          <li>La información no sustituye al etiquetado oficial ni al consejo médico.</li>
          <li>Si tienes alergias o intolerancias, verifica siempre el envase del producto.</li>
        </ul>
      </section>
      <section>
        <h2>Propiedad intelectual</h2>
        <p>
          Las marcas citadas pertenecen a sus respectivos titulares y se mencionan con fines
          comparativos e informativos.
        </p>
      </section>
      <section>
        <h2>Modificaciones</h2>
        <p>Podemos actualizar estas condiciones; la versión vigente será siempre la publicada aquí.</p>
      </section>
    </LegalPage>
  ),
});
