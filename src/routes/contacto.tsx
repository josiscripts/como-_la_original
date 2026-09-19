import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PartyPopper } from "lucide-react";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto · Como la Original" },
      {
        name: "description",
        content:
          "Escríbenos para sugerir un producto, corregir información o proponer una colaboración con Como la Original.",
      },
      { property: "og:title", content: "Contacto · Como la Original" },
      {
        property: "og:description",
        content: "Sugiere productos y ayúdanos a mejorar las comparaciones.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contacto" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contacto" }],
  }),
  component: Contacto,
});

const reasons = [
  "Sugerir un producto",
  "Corregir información",
  "Colaboración o marca",
  "Otra consulta",
];

function Contacto() {
  const [sent, setSent] = useState(false);

  return (
    <main className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <h1 className="text-4xl">Cuéntanos tu antojo</h1>
      <p className="mt-3 text-muted-foreground">
        ¿Echas en falta un producto? ¿Has visto un dato que no cuadra? Escríbenos: cada mensaje nos
        ayuda a mejorar las comparaciones.
      </p>

      {sent ? (
        <div
          role="status"
          className="mt-8 rounded-3xl border-2 border-primary bg-primary/10 p-6 text-center"
        >
          <p className="flex items-center justify-center gap-2 text-2xl"><PartyPopper aria-hidden="true" className="size-6" /> ¡Mensaje recibido!</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Gracias por escribirnos. Es una demo, así que el mensaje no se envía a ningún servidor.
          </p>
          <button
            type="button"
            onClick={() => setSent(false)}
            className="mt-4 inline-flex min-h-11 items-center rounded-full border-2 border-border px-5 text-sm font-bold"
          >
            Escribir otro mensaje
          </button>
        </div>
      ) : (
        <form
          className="mt-8 space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <div>
            <label htmlFor="nombre" className="font-display text-sm font-extrabold">
              Nombre
            </label>
            <input
              id="nombre"
              name="nombre"
              required
              autoComplete="name"
              className="mt-1 min-h-12 w-full rounded-2xl border-2 border-border bg-card px-4 outline-none focus-visible:border-primary"
            />
          </div>

          <div>
            <label htmlFor="email" className="font-display text-sm font-extrabold">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-1 min-h-12 w-full rounded-2xl border-2 border-border bg-card px-4 outline-none focus-visible:border-primary"
            />
          </div>

          <div>
            <label htmlFor="motivo" className="font-display text-sm font-extrabold">
              Motivo
            </label>
            <select
              id="motivo"
              name="motivo"
              className="mt-1 min-h-12 w-full rounded-2xl border-2 border-border bg-card px-4 outline-none focus-visible:border-primary"
            >
              {reasons.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="mensaje" className="font-display text-sm font-extrabold">
              Mensaje
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows={5}
              required
              className="mt-1 w-full rounded-2xl border-2 border-border bg-card p-4 outline-none focus-visible:border-primary"
            />
          </div>

          <label className="flex items-start gap-3 text-sm text-muted-foreground">
            <input type="checkbox" required className="mt-1 size-5 accent-[var(--primary)]" />
            He leído y acepto la política de privacidad.
          </label>

          <button
            type="submit"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary px-6 font-display text-lg font-extrabold text-primary-foreground transition-transform hover:scale-[1.01] sm:w-auto"
          >
            Enviar mensaje
          </button>
        </form>
      )}
    </main>
  );
}
