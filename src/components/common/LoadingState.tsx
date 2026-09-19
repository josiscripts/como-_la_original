export function LoadingState({ message = "Buscando alternativas…" }: { message?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-3xl border border-border bg-card px-6 py-14 text-center"
    >
      <div className="mx-auto flex w-fit gap-1.5" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="size-3 animate-bounce rounded-full bg-primary"
            style={{ animationDelay: `${i * 120}ms` }}
          />
        ))}
      </div>
      <p className="mt-4 font-display text-lg font-extrabold">{message}</p>
      <p className="mt-1 text-sm text-muted-foreground">Comparando sabor, textura y relleno…</p>
    </div>
  );
}

export function ResultSkeleton() {
  return (
    <div className="space-y-4" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-40 animate-pulse rounded-3xl border border-border bg-card" />
      ))}
    </div>
  );
}
