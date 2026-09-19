import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Cookie } from "lucide-react";
import { CookiePreferences, type CookieConsent, CONSENT_KEY } from "./CookiePreferences";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    setVisible(!window.localStorage.getItem(CONSENT_KEY));
  }, []);

  function save(consent: CookieConsent) {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    setPanelOpen(false);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <>
      <div
        role="dialog"
        aria-label="Aviso de cookies"
        aria-modal="false"
        className="fixed inset-x-3 bottom-3 z-50 rounded-3xl border-2 border-foreground bg-card p-5 shadow-pop sm:inset-x-auto sm:right-5 sm:max-w-md"
      >
        <h2 className="flex items-center gap-2 text-lg"><Cookie aria-hidden="true" className="size-5" /> Cookies</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Utilizamos cookies para mejorar tu experiencia, analizar el uso de la web y ofrecer
          determinadas funcionalidades.{" "}
          <Link to="/cookies" className="font-semibold text-foreground underline">
            Más información
          </Link>
          .
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => save({ necessary: true, analytics: true, marketing: true })}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full bg-primary px-4 text-sm font-bold text-primary-foreground"
          >
            Aceptar todas
          </button>
          <button
            type="button"
            onClick={() => save({ necessary: true, analytics: false, marketing: false })}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border-2 border-border px-4 text-sm font-bold"
          >
            Rechazar no necesarias
          </button>
          <button
            type="button"
            onClick={() => setPanelOpen(true)}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-full px-4 text-sm font-semibold underline"
          >
            Configurar cookies
          </button>
        </div>
      </div>

      {panelOpen ? <CookiePreferences onSave={save} onClose={() => setPanelOpen(false)} /> : null}
    </>
  );
}
