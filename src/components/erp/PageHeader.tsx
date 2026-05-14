export function Panel({
  title,
  meta,
  children,
  className = "",
}: {
  title?: string;
  meta?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`bg-card border border-border shadow-sm ${className}`}>
      {(title || meta) && (
        <header className="px-6 py-4 border-b border-border flex items-center justify-between">
          {title && <h2 className="text-sm font-medium uppercase tracking-tight">{title}</h2>}
          {meta && <div className="text-[10px] font-mono uppercase text-foreground/40">{meta}</div>}
        </header>
      )}
      <div>{children}</div>
    </section>
  );
}

export function StatusPill({ tone, children }: { tone: "good" | "warn" | "bad" | "info"; children: React.ReactNode }) {
  const map: Record<string, string> = {
    good: "bg-green-50 text-green-700 border-green-200",
    warn: "bg-accent/10 text-accent-foreground border-accent/30",
    bad: "bg-red-50 text-red-700 border-red-200",
    info: "bg-primary/5 text-primary border-primary/15",
  };
  return (
    <span className={`inline-flex items-center text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 border ${map[tone]}`}>
      {children}
    </span>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-6 mb-8 animate-ledger-in">
      <div>
        {eyebrow && (
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent/80 mb-2">
            {eyebrow}
          </div>
        )}
        <h1 className="text-3xl font-display italic tracking-tight text-foreground">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </div>
  );
}