import { useState } from "react";
import { X } from "lucide-react";

export const CONSENT_KEY = "clo:cookie-consent";

export interface CookieConsent {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
}

interface Props {
  onSave: (consent: CookieConsent) => void;
  onClose: () => void;
}

export function CookiePreferences({ onSave, onClose }: Props) {
  // Marketing cookies are never enabled by default.
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-prefs-title"
        className="w-full max-w-lg rounded-3xl border-2 border-foreground bg-card p-6 shadow-pop"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id="cookie-prefs-title" className="text-2xl">
            Configurar cookies
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar preferencias de cookies"
            className="grid size-11 place-items-center rounded-full border border-border"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        </div>

        <ul className="mt-5 space-y-3">
          <li className="rounded-2xl border border-border p-4">
            <div className="flex items-center justify-between gap-4">
              <span className="font-bold">Necesarias</span>
              <span className="text-xs font-bold uppercase text-muted-foreground">Siempre activas</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Imprescindibles para que la web funcione: navegación, seguridad y tus antojos guardados.
            </p>
          </li>

          <li className="rounded-2xl border border-border p-4">
            <label className="flex items-center justify-between gap-4">
              <span className="font-bold">Analíticas</span>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="size-5 accent-[var(--primary)]"
              />
            </label>
            <p className="mt-1 text-sm text-muted-foreground">
              Nos ayudan a entender qué antojos se buscan más para mejorar las comparaciones.
            </p>
          </li>

          <li className="rounded-2xl border border-border p-4">
            <label className="flex items-center justify-between gap-4">
              <span className="font-bold">Marketing</span>
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="size-5 accent-[var(--primary)]"
              />
            </label>
            <p className="mt-1 text-sm text-muted-foreground">
              Desactivadas por defecto. No las activamos sin tu consentimiento explícito.
            </p>
          </li>
        </ul>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onSave({ necessary: true, analytics, marketing })}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full bg-primary px-4 text-sm font-bold text-primary-foreground"
          >
            Guardar preferencias
          </button>
          <button
            type="button"
            onClick={() => onSave({ necessary: true, analytics: true, marketing: true })}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border-2 border-border px-4 text-sm font-bold"
          >
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  );
}
