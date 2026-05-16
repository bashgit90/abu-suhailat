import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Pill, Receipt, Truck, Menu } from "lucide-react";
import { useSidebarMobile } from "./Sidebar";

const tabs = [
  { to: "/", icon: LayoutDashboard, label: "Home" },
  { to: "/products", icon: Pill, label: "Catalog" },
  { to: "/sales", icon: Receipt, label: "Sales" },
  { to: "/waybills", icon: Truck, label: "Waybill" },
];

export function MobileBottomNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { setOpen } = useSidebarMobile();
  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-card/95 backdrop-blur border-t border-border shadow-[0_-8px_24px_rgba(15,61,46,0.08)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid grid-cols-5">
        {tabs.map((t) => {
          const active = path === t.to;
          const Icon = t.icon;
          return (
            <li key={t.to}>
              <Link
                to={t.to}
                className={`flex flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-mono uppercase tracking-wider transition-colors ${
                  active ? "text-primary" : "text-foreground/50"
                }`}
              >
                <Icon
                  className="size-5"
                  strokeWidth={active ? 2 : 1.5}
                />
                <span>{t.label}</span>
                {active && <span className="size-1 rounded-full bg-accent" />}
              </Link>
            </li>
          );
        })}
        <li>
          <button
            onClick={() => setOpen(true)}
            className="w-full flex flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-mono uppercase tracking-wider text-foreground/50"
          >
            <Menu className="size-5" strokeWidth={1.5} />
            <span>More</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
