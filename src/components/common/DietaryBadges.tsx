import { AlertCircle, Check, HelpCircle } from "lucide-react";
import type { AlternativeProduct, VerificationStatus } from "@/types";

const statusMeta: Record<VerificationStatus, { text: string; className: string }> = {
  verificado: { text: "Verificado", className: "border-primary bg-primary/15" },
  "no-verificado": { text: "No verificado", className: "border-mauve bg-blush" },
  "no-disponible": { text: "No disponible", className: "border-border bg-muted" },
};

function Badge({
  label,
  value,
  status,
}: {
  label: string;
  value: boolean;
  status: VerificationStatus;
}) {
  const effective: VerificationStatus = value ? status : "no-disponible";
  const meta = statusMeta[effective];
  const Icon =
    effective === "verificado" ? Check : effective === "no-verificado" ? HelpCircle : AlertCircle;

  return (
    <li
      className={`flex items-center gap-2 rounded-2xl border-2 px-3 py-2 text-sm font-semibold ${meta.className}`}
    >
      <Icon aria-hidden="true" className="size-4 shrink-0" />
      <span>{label}</span>
      <span className="ml-auto text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
        {meta.text}
      </span>
    </li>
  );
}

export function DietaryBadges({ product }: { product: AlternativeProduct }) {
  return (
    <div>
      <ul className="grid gap-2 sm:grid-cols-3">
        <Badge label="Sin gluten" value={product.glutenFree} status={product.verificationStatus} />
        <Badge label="Sin lactosa" value={product.lactoseFree} status={product.verificationStatus} />
        <Badge
          label="Apto para celiacos"
          value={product.celiacSuitable}
          status={product.verificationStatus}
        />
      </ul>
      <p className="mt-3 text-xs text-muted-foreground">
        Información verificada según fuentes disponibles
        {product.lastVerified ? ` · última revisión ${product.lastVerified}` : ""}. Consulta siempre
        el etiquetado del fabricante antes de consumir.
      </p>
      {product.allergens.length > 0 ? (
        <p className="mt-2 text-xs font-semibold">
          Alérgenos indicados: <span className="font-normal">{product.allergens.join(", ")}</span>
        </p>
      ) : null}
    </div>
  );
}
