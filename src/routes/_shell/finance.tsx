import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel } from "@/components/erp/PageHeader";
import { KpiCard } from "@/components/erp/KpiCard";
import { RevenueChart, CategoryBars } from "@/components/erp/Charts";
import { revenueSeries } from "@/lib/mock-data";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/_shell/finance")({
  head: () => ({ meta: [{ title: "Financial Ledgers — Abu Suhailat ERP" }] }),
  component: Page,
});

function Page() {
  const invoices = useStore((s) => s.invoices);
  const expenses = useStore((s) => s.expenses);
  const revenue = invoices.reduce((s, i) => s + i.amount, 0);
  const cost = expenses.reduce((s, e) => s + e.amount, 0);
  const profit = revenue - cost;
  const margin = revenue ? ((profit / revenue) * 100).toFixed(1) : "0";

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Finance" title="Financial Ledgers" description="Cash flow, P&L and AI forecasts." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <KpiCard label="Total Revenue" value={`₦${(revenue / 1000000).toFixed(2)}M`} delta="+12%" tone="emerald" sub="MTD" index={0} />
        <KpiCard label="Total Cost" value={`₦${(cost / 1000000).toFixed(2)}M`} delta="OpEx" tone="gold" sub="Outflows" index={1} />
        <KpiCard label="Net Profit" value={`₦${(profit / 1000000).toFixed(2)}M`} delta={profit > 0 ? "Surplus" : "Loss"} tone="emerald" sub="After cost" index={2} />
        <KpiCard label="Margin" value={`${margin}%`} delta="Healthy" tone="gold" sub="P/R ratio" index={3} />
      </div>
      <Panel title="Revenue Trend" meta="12 months">
        <div className="p-4"><RevenueChart data={revenueSeries} /></div>
      </Panel>
      <Panel title="Cost Centers" meta="MTD">
        <div className="p-4"><CategoryBars data={expenses.map((e) => ({ name: e.cat, value: e.amount }))} /></div>
      </Panel>
    </div>
  );
}
