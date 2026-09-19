import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/layout/LegalPage";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Política de cookies · Como la Original" },
      {
        name: "description",
        content:
          "Tipos de cookies que utiliza Como la Original, para qué sirven y cómo puedes configurarlas.",
      },
      { property: "og:title", content: "Política de cookies · Como la Original" },
      { property: "og:description", content: "Cookies necesarias, analíticas y de marketing." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/cookies" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/cookies" }],
  }),
  component: () => (
    <LegalPage
      title="Política de cookies"
      intro="Usamos cookies para que la web funcione y, si nos dejas, para entender cómo se usa."
    >
      <section>
        <h2>Cookies necesarias</h2>
        <p>
          Permiten la navegación, la seguridad y el funcionamiento básico, incluida la lista de
          antojos guardada en tu navegador. No requieren consentimiento.
        </p>
      </section>
      <section>
        <h2>Cookies analíticas</h2>
        <p>
          Nos ayudan a conocer de forma agregada qué productos se buscan más. Solo se activan si las
          aceptas.
        </p>
      </section>
      <section>
        <h2>Cookies de marketing</h2>
        <p>
          Están desactivadas por defecto y no se activan sin tu consentimiento explícito.
        </p>
      </section>
      <section>
        <h2>Cómo gestionarlas</h2>
        <p>
          Puedes cambiar tu elección en cualquier momento borrando los datos del sitio en tu
          navegador; volveremos a mostrarte el panel de configuración.
        </p>
      </section>
    </LegalPage>
  ),
});
