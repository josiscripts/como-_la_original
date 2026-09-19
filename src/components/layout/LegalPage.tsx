import type { ReactNode } from "react";

export function LegalPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-4xl">{title}</h1>
      <p className="mt-3 text-muted-foreground">{intro}</p>
      <div className="mt-8 space-y-6 text-sm leading-relaxed [&_h2]:text-xl [&_p]:text-muted-foreground [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_ul]:text-muted-foreground">
        {children}
      </div>
      <p className="mt-10 rounded-2xl bg-beige px-4 py-3 text-xs text-muted-foreground">
        Texto orientativo pendiente de revisión legal. Sustitúyelo por el redactado definitivo antes
        de publicar.
      </p>
    </main>
  );
}
