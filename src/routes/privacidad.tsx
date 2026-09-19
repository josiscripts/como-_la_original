import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/layout/LegalPage";

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: [
      { title: "Política de privacidad · Como la Original" },
      {
        name: "description",
        content:
          "Qué datos tratamos en Como la Original, con qué finalidad y cómo puedes ejercer tus derechos.",
      },
      { property: "og:title", content: "Política de privacidad · Como la Original" },
      { property: "og:description", content: "Tratamiento de datos y derechos del usuario." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/privacidad" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/privacidad" }],
  }),
  component: () => (
    <LegalPage
      title="Política de privacidad"
      intro="Explicamos qué información tratamos cuando usas Como la Original."
    >
      <section>
        <h2>Datos que tratamos</h2>
        <ul>
          <li>Datos que nos envías voluntariamente a través del formulario de contacto.</li>
          <li>Datos técnicos de navegación agregados, si aceptas las cookies analíticas.</li>
        </ul>
      </section>
      <section>
        <h2>Tus antojos guardados</h2>
        <p>
          La lista «Mis antojos» se guarda únicamente en el almacenamiento local de tu navegador. No
          se envía a ningún servidor ni se asocia a tu identidad.
        </p>
      </section>
      <section>
        <h2>Finalidad y base legal</h2>
        <p>
          Tratamos los datos para responder a tus consultas (interés legítimo y consentimiento) y para
          mejorar el servicio mediante estadísticas agregadas (consentimiento).
        </p>
      </section>
      <section>
        <h2>Derechos</h2>
        <p>
          Puedes solicitar acceso, rectificación, supresión, oposición, limitación y portabilidad
          escribiéndonos desde la página de contacto.
        </p>
      </section>
    </LegalPage>
  ),
});
