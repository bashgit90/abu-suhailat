import { createFileRoute } from "@tanstack/react-router";
import { KpiCard } from "@/components/erp/KpiCard";
import { Panel, StatusPill } from "@/components/erp/PageHeader";
import { RevenueChart, CategoryPie, InventoryLine } from "@/components/erp/Charts";
import { AiInsightCard } from "@/components/erp/AiInsightCard";
import { kpis, revenueSeries, categorySales, inventorySeries } from "@/lib/mock-data";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/_shell/")({
  head: () => ({
    meta: [
      { title: "Executive Dashboard — Abu Suhailat ERP" },
      { name: "description", content: "AI-powered enterprise overview for traditional medicine production." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const user = useStore((s) => s.user);
  const batches = useStore((s) => s.batches);
  const invoices = useStore((s) => s.invoices);

  return (
    <div className="space-y-8">
      <div className="animate-ledger-in">
        <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent/80 mb-2">
          The Illuminated Ledger · {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </div>
        <h1 className="text-2xl md:text-4xl font-display italic tracking-tight">
          {user.greeting}, {user.name}
        </h1>
        <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-2xl">
          Here's what's happening across your traditional medicine enterprise today.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {kpis.map((k, i) => (
          <KpiCard key={k.label} {...k} tone={k.tone as "gold" | "emerald"} index={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <Panel
          className="lg:col-span-2 animate-ledger-in"
          title="Revenue Performance"
          meta={
            <span className="flex gap-3 md:gap-4">
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-accent" /> Retail
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-primary" /> Wholesale
              </span>
            </span>
          }
        >
          <div className="p-2 md:p-4">
            <RevenueChart data={revenueSeries} />
          </div>
        </Panel>
        <AiInsightCard />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <Panel title="Category Mix" meta="Units sold (MTD)" className="animate-ledger-in">
          <div className="p-4">
            <CategoryPie data={categorySales} />
            <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] font-mono">
              {categorySales.map((c) => (
                <div key={c.name} className="flex justify-between text-foreground/70">
                  <span>{c.name}</span>
                  <span>{c.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </Panel>

        <Panel title="Inventory Drawdown" meta="7-day window" className="animate-ledger-in">
          <div className="p-4">
            <InventoryLine data={inventorySeries} />
          </div>
        </Panel>

        <Panel title="Quick Health" meta="Live" className="animate-ledger-in">
          <div className="p-5 space-y-4 text-sm">
            {[
              { l: "Pending Invoices", v: invoices.filter((i) => i.status === "Pending").length.toString() },
              { l: "Active Batches", v: batches.length.toString() },
              { l: "Net Profit Margin", v: "31.2%" },
              { l: "Outstanding Debt", v: "₦437k" },
              { l: "Payroll Due", v: "May 30" },
            ].map((row) => (
              <div key={row.l} className="flex items-center justify-between">
                <span className="text-foreground/60 text-xs uppercase tracking-wider font-mono">
                  {row.l}
                </span>
                <span className="font-display italic text-base">{row.v}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel title="Production Batch Status" meta="Last 24 Hours" className="animate-ledger-in">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[720px]">
            <thead className="bg-muted/40">
              <tr>
                {["Batch ID", "Product", "Supervisor", "QR Hash", "Progress", "Status"].map((h) => (
                  <th key={h} className="px-4 md:px-6 py-3 text-[10px] font-mono uppercase text-foreground/40">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {batches.map((b) => (
                <tr key={b.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 md:px-6 py-4 font-mono text-xs">{b.id}</td>
                  <td className="px-4 md:px-6 py-4 text-sm font-display italic">{b.product}</td>
                  <td className="px-4 md:px-6 py-4 text-sm">{b.supervisor}</td>
                  <td className="px-4 md:px-6 py-4 text-[10px] font-mono text-foreground/40">SHA: {b.hash}</td>
                  <td className="px-4 md:px-6 py-4 w-40">
                    <div className="h-1 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${b.progress}%` }} />
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <StatusPill tone={b.status === "Validated" ? "good" : b.status === "Processing" || b.status === "Extracting" ? "warn" : "info"}>
                      {b.status}
                    </StatusPill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel title="Recent Invoices" meta="Auto-synced" className="animate-ledger-in">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[640px]">
            <thead className="bg-muted/40">
              <tr>
                {["Invoice", "Customer", "Channel", "Amount", "Status", "Date"].map((h) => (
                  <th key={h} className="px-4 md:px-6 py-3 text-[10px] font-mono uppercase text-foreground/40">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {invoices.slice(0, 6).map((r) => (
                <tr key={r.no} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 md:px-6 py-4 font-mono text-xs">#{r.no}</td>
                  <td className="px-4 md:px-6 py-4 text-sm">{r.customer}</td>
                  <td className="px-4 md:px-6 py-4 text-xs text-foreground/60">{r.type}</td>
                  <td className="px-4 md:px-6 py-4 text-sm font-display italic">₦{r.amount.toLocaleString()}</td>
                  <td className="px-4 md:px-6 py-4">
                    <StatusPill tone={r.status === "Paid" ? "good" : r.status === "Pending" || r.status === "Partial" ? "warn" : "bad"}>
                      {r.status}
                    </StatusPill>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-[11px] font-mono text-foreground/50">{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
