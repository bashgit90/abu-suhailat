import { useRouterState } from "@tanstack/react-router";
import { Bell, Search, Plus } from "lucide-react";
import { SidebarToggle } from "./Sidebar";
import { useStore } from "@/lib/store";

const titles: Record<string, { crumb: string; subtitle: string }> = {
  "/": { crumb: "/ Overview / Intelligence", subtitle: "Executive overview" },
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
  const notifCount = useStore((s) => s.notifications.length);
  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border h-16 flex items-center justify-between px-4 md:px-8 gap-2">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <SidebarToggle />
        <span className="text-xs font-mono text-foreground/40 truncate hidden sm:inline">{t.crumb}</span>
        <div className="h-4 w-px bg-border hidden sm:block" />
        <div className="text-sm font-display italic truncate">{t.subtitle}</div>
      </div>
      <div className="flex items-center gap-2 md:gap-3">
        <div className="relative hidden lg:block">
          <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" />
          <input
            placeholder="Search products, invoices, batches…"
            className="w-72 pl-9 pr-3 py-1.5 text-xs bg-card border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-accent/40"
          />
        </div>
        <div className="text-[10px] font-mono uppercase tracking-tighter bg-muted px-2 py-1 rounded-sm text-foreground/60 hidden md:block">
          Sync · Realtime
        </div>
        <button className="relative p-2 rounded-sm hover:bg-muted transition-colors" aria-label="Notifications">
          <Bell className="size-4" strokeWidth={1.6} />
          {notifCount > 0 && (
            <span className="absolute top-1 right-1 size-1.5 rounded-full bg-accent animate-pulse-gold" />
          )}
        </button>
        <button className="hidden sm:flex items-center gap-1.5 text-xs font-medium bg-primary text-primary-foreground px-3 py-1.5 rounded-sm hover:bg-emerald-forest transition-colors">
          <Plus className="size-3.5" /> New Batch
        </button>
      </div>
    </header>
  );
}
