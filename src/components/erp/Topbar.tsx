import { useRouterState } from "@tanstack/react-router";
import { Bell, Search, Plus } from "lucide-react";

const titles: Record<string, { crumb: string; subtitle: string }> = {
  "/": { crumb: "/ Overview / Intelligence", subtitle: "Current Batch: #8821-M" },
  "/ai": { crumb: "/ Intelligence / Assistant", subtitle: "Conversational analytics" },
  "/products": { crumb: "/ Catalog / Products", subtitle: "Apothecary inventory" },
  "/inventory": { crumb: "/ Operations / Inventory", subtitle: "Warehouse health" },
  "/production": { crumb: "/ Operations / Production", subtitle: "Active batch lines" },
  "/sales": { crumb: "/ Commerce / Sales", subtitle: "Invoice ledger" },
  "/crm": { crumb: "/ Commerce / CRM", subtitle: "Customer registry" },
  "/distributors": { crumb: "/ Commerce / Wholesale", subtitle: "Distributor portal" },
  "/delivery": { crumb: "/ Commerce / Logistics", subtitle: "Dispatch & delivery" },
  "/payroll": { crumb: "/ Finance / Payroll", subtitle: "HR & compensation" },
  "/expenses": { crumb: "/ Finance / Expenses", subtitle: "Operating costs" },
  "/finance": { crumb: "/ Finance / Ledgers", subtitle: "Revenue & profit" },
  "/reports": { crumb: "/ Finance / Reports", subtitle: "Exportable archives" },
  "/notifications": { crumb: "/ System / Notifications", subtitle: "Alerts & events" },
  "/settings": { crumb: "/ System / Settings", subtitle: "Workspace controls" },
};

export function Topbar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const t = titles[path] ?? { crumb: path, subtitle: "" };
  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border h-16 flex items-center justify-between px-8">
      <div className="flex items-center gap-4 min-w-0">
        <span className="text-xs font-mono text-foreground/40 truncate">{t.crumb}</span>
        <div className="h-4 w-px bg-border" />
        <div className="text-sm font-display italic">{t.subtitle}</div>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" />
          <input
            placeholder="Search products, invoices, batches…"
            className="w-72 pl-9 pr-3 py-1.5 text-xs bg-card border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-accent/40"
          />
        </div>
        <div className="text-[10px] font-mono uppercase tracking-tighter bg-muted px-2 py-1 rounded-sm text-foreground/60">
          Sync · Realtime
        </div>
        <button className="relative p-2 rounded-sm hover:bg-muted transition-colors" aria-label="Notifications">
          <Bell className="size-4" strokeWidth={1.6} />
          <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-accent animate-pulse-gold" />
        </button>
        <button className="flex items-center gap-1.5 text-xs font-medium bg-primary text-primary-foreground px-3 py-1.5 rounded-sm hover:bg-emerald-forest transition-colors">
          <Plus className="size-3.5" /> New Batch
        </button>
      </div>
    </header>
  );
}