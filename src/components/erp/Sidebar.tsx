import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Sparkles,
  Pill,
  Boxes,
  FlaskConical,
  Receipt,
  Users,
  Building2,
  Wallet,
  TrendingUp,
  FileText,
  Bell,
  Truck,
  Settings,
  ShieldCheck,
} from "lucide-react";

const groups: { label: string; items: { to: string; icon: typeof Pill; label: string }[] }[] = [
  {
    label: "Operations",
    items: [
      { to: "/", icon: LayoutDashboard, label: "Executive Dashboard" },
      { to: "/ai", icon: Sparkles, label: "AI Assistant" },
      { to: "/products", icon: Pill, label: "Apothecary Catalog" },
      { to: "/inventory", icon: Boxes, label: "Inventory" },
      { to: "/production", icon: FlaskConical, label: "Production Lines" },
    ],
  },
  {
    label: "Commerce",
    items: [
      { to: "/sales", icon: Receipt, label: "Sales & Invoices" },
      { to: "/crm", icon: Users, label: "Customer CRM" },
      { to: "/distributors", icon: Building2, label: "Distributors" },
      { to: "/delivery", icon: Truck, label: "Delivery & Logistics" },
    ],
  },
  {
    label: "Finance",
    items: [
      { to: "/payroll", icon: Wallet, label: "Payroll & HR" },
      { to: "/expenses", icon: Receipt, label: "Expenses" },
      { to: "/finance", icon: TrendingUp, label: "Financial Ledgers" },
      { to: "/reports", icon: FileText, label: "Reports Center" },
    ],
  },
  {
    label: "System",
    items: [
      { to: "/notifications", icon: Bell, label: "Notifications" },
      { to: "/settings", icon: Settings, label: "Settings" },
    ],
  },
];

export function Sidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="w-64 shrink-0 bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border relative z-20 h-screen sticky top-0">
      <div className="absolute inset-0 geo-watermark opacity-[0.07] pointer-events-none" />
      <div className="p-6 mb-2 relative">
        <div className="text-sidebar-primary font-display italic text-2xl tracking-tight leading-none">
          Abu Suhailat
        </div>
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-50 mt-1">
          Enterprise ERP v4.0
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-4 overflow-y-auto pb-4 relative">
        {groups.map((g) => (
          <div key={g.label} className="space-y-0.5">
            <div className="px-3 pb-1.5 text-[10px] uppercase tracking-widest opacity-40 font-mono">
              {g.label}
            </div>
            {g.items.map((it) => {
              const active = path === it.to;
              const Icon = it.icon;
              return (
                <Link
                  key={it.to}
                  to={it.to}
                  className={`flex items-center gap-3 px-3 py-2 rounded-sm transition-colors text-sm ${
                    active
                      ? "bg-sidebar-accent text-sidebar-primary"
                      : "opacity-70 hover:opacity-100 hover:bg-sidebar-accent/60"
                  }`}
                >
                  <span
                    className={`size-1.5 rounded-full shrink-0 ${
                      active
                        ? "bg-sidebar-primary shadow-[0_0_8px_var(--gold-leaf)]"
                        : "border border-sidebar-foreground/30"
                    }`}
                  />
                  <Icon className="size-4 opacity-70" strokeWidth={1.5} />
                  <span className="font-medium">{it.label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="p-5 border-t border-sidebar-border relative">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded bg-sidebar-primary/15 ring-1 ring-sidebar-primary/30 grid place-items-center text-sidebar-primary font-mono italic text-xs">
            AS
          </div>
          <div className="text-xs leading-tight">
            <p className="font-medium">Admin Console</p>
            <p className="opacity-50 flex items-center gap-1">
              <ShieldCheck className="size-3" /> System Active
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}