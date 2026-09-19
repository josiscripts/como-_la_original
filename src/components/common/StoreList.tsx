import { ExternalLink } from "lucide-react";
import type { Availability, Store } from "@/types";
import { AppIcon } from "./AppIcon";

const availabilityMeta: Record<Availability, { label: string; className: string }> = {
  disponible: { label: "Disponible", className: "bg-primary/20" },
  ocasional: { label: "Disponibilidad ocasional", className: "bg-blush" },
  "no-disponible": { label: "No disponible", className: "bg-muted" },
  desconocida: { label: "Disponibilidad por confirmar", className: "bg-muted" },
};

export function StoreList({ stores, productName }: { stores: Store[]; productName: string }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-6">
      <h3 className="flex items-center gap-2 text-xl"><AppIcon aria-hidden="true" name="map-pin" className="size-5" /> ¿Dónde encontrarlo?</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Como la Original no vende productos. Te llevamos a la tienda para que compruebes precio y
        disponibilidad.
      </p>

      <ul className="mt-4 space-y-2">
        {stores.map((store) => {
          const meta = availabilityMeta[store.availability];
          return (
            <li
              key={store.id}
              className="flex flex-wrap items-center gap-3 rounded-2xl border border-border px-4 py-3"
            >
              <span aria-hidden="true" className="grid size-9 place-items-center rounded-full bg-cream text-sm font-bold">
                {store.name.slice(0, 1)}
              </span>
              <span className="font-semibold">{store.name}</span>
              <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${meta.className}`}>
                {meta.label}
              </span>
              <a
                href={store.productUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-foreground px-4 text-xs font-bold uppercase tracking-wide transition-colors hover:bg-foreground hover:text-background"
              >
                Ver dónde comprar
                <ExternalLink aria-hidden="true" className="size-3.5" />
                <span className="sr-only">{`${productName} en ${store.name} (se abre en una pestaña nueva)`}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
