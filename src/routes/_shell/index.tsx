import { createFileRoute } from "@tanstack/react-router";
import { KpiCard } from "@/components/erp/KpiCard";
import { Panel, StatusPill } from "@/components/erp/PageHeader";
import { RevenueChart, CategoryPie, InventoryLine } from "@/components/erp/Charts";
import { AiInsightCard } from "@/components/erp/AiInsightCard";
import {
  kpis,
  revenueSeries,
  categorySales,
  inventorySeries,
  productionBatches,
  recentInvoices,
} from "@/lib/mock-data";

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
  return (
    <div className="space-y-8">
      <div>
        <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent/80 mb-2">
          The Illuminated Ledger
        </div>
        <h1 className="text-3xl font-display italic tracking-tight">Executive Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Year-to-date performance across production, distribution, and finance.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((k, i) => (
          <KpiCard key={k.label} {...k} tone={k.tone as "gold" | "emerald"} index={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Panel
          className="lg:col-span-2 animate-ledger-in"
          title="Revenue Performance"
          meta={
            <span className="flex gap-4">
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-accent" /> Retail
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-primary" /> Wholesale
              </span>
            </span>
          }
        >
          <div className="p-4">
            <RevenueChart data={revenueSeries} />
          </div>
        </Panel>
        <AiInsightCard />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
              { l: "Pending Invoices", v: "12", tone: "warn" as const },
              { l: "Low Stock SKUs", v: "4", tone: "bad" as const },
              { l: "Active Batches", v: "8", tone: "info" as const },
              { l: "Net Profit Margin", v: "31.2%", tone: "good" as const },
              { l: "Outstanding Debt", v: "₦437k", tone: "warn" as const },
              { l: "Payroll Due", v: "May 30", tone: "info" as const },
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

      <Panel
        title="Production Batch Status"
        meta="Last 24 Hours"
        className="animate-ledger-in"
      >
        <table className="w-full text-left">
          <thead className="bg-muted/40">
            <tr>
              {["Batch ID", "Product", "Supervisor", "QR Hash", "Progress", "Status"].map((h) => (
                <th key={h} className="px-6 py-3 text-[10px] font-mono uppercase text-foreground/40">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {productionBatches.map((b) => (
              <tr key={b.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-mono text-xs">{b.id}</td>
                <td className="px-6 py-4 text-sm font-display italic">{b.product}</td>
                <td className="px-6 py-4 text-sm">{b.supervisor}</td>
                <td className="px-6 py-4 text-[10px] font-mono text-foreground/40">SHA-256: {b.hash}…</td>
                <td className="px-6 py-4 w-40">
                  <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${b.progress}%` }} />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <StatusPill
                    tone={
                      b.status === "Validated"
                        ? "good"
                        : b.status === "Processing" || b.status === "Extracting"
                        ? "warn"
                        : "info"
                    }
                  >
                    {b.status}
                  </StatusPill>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>

      <Panel title="Recent Invoices" meta="Auto-synced" className="animate-ledger-in">
        <table className="w-full text-left">
          <thead className="bg-muted/40">
            <tr>
              {["Invoice", "Customer", "Channel", "Amount", "Status", "Date"].map((h) => (
                <th key={h} className="px-6 py-3 text-[10px] font-mono uppercase text-foreground/40">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {recentInvoices.map((r) => (
              <tr key={r.no} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-mono text-xs">#{r.no}</td>
                <td className="px-6 py-4 text-sm">{r.customer}</td>
                <td className="px-6 py-4 text-xs text-foreground/60">{r.type}</td>
                <td className="px-6 py-4 text-sm font-display italic">₦{r.amount.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <StatusPill
                    tone={
                      r.status === "Paid"
                        ? "good"
                        : r.status === "Pending" || r.status === "Partial"
                        ? "warn"
                        : "bad"
                    }
                  >
                    {r.status}
                  </StatusPill>
                </td>
                <td className="px-6 py-4 text-[11px] font-mono text-foreground/50">{r.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}