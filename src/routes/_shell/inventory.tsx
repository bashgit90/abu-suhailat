import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, StatusPill } from "@/components/erp/PageHeader";
import { DataTable } from "@/components/erp/DataTable";
import { KpiCard } from "@/components/erp/KpiCard";
import { InventoryLine } from "@/components/erp/Charts";
import { useStore } from "@/lib/store";
import { inventorySeries } from "@/lib/mock-data";
import { FormDialog } from "@/components/erp/FormDialog";
import { toast } from "sonner";

export const Route = createFileRoute("/_shell/inventory")({
  head: () => ({ meta: [{ title: "Inventory — Abu Suhailat ERP" }] }),
  component: InventoryPage,
});

function InventoryPage() {
  const products = useStore((s) => s.products);
  const total = products.reduce((s, p) => s + p.stock, 0);
  const low = products.filter((p) => p.status === "Low").length;
  const out = products.filter((p) => p.status === "Out").length;
  const value = products.reduce((s, p) => s + p.stock * p.cost, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Operations"
        title="Inventory & Warehouse"
        description="Real-time stock movements with AI-suggested reorder points."
        actions={
          <FormDialog
            title="Stock Adjustment"
            triggerLabel="Adjust Stock"
            fields={[
              { name: "product", label: "Product Code", required: true },
              { name: "qty", label: "Quantity (+/-)", type: "number", required: true },
              { name: "reason", label: "Reason", type: "select", options: ["Restock", "Damage", "Sale", "Return", "Audit"] },
              { name: "note", label: "Note", type: "textarea" },
            ]}
            onSubmit={(v: any) => toast.success(`Adjusted ${v.product} by ${v.qty}`)}
          />
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <KpiCard label="Total SKUs" value={products.length.toString()} delta="+2 this week" tone="emerald" sub="Catalog" index={0} />
        <KpiCard label="Total Units" value={total.toLocaleString()} delta="-318 today" tone="gold" sub="In stock" index={1} />
        <KpiCard label="Low Stock" value={low.toString()} delta="Reorder due" tone="gold" sub="Below threshold" index={2} />
        <KpiCard label="Stock Value" value={`₦${(value / 1000000).toFixed(1)}M`} delta="At cost" tone="emerald" sub="Asset value" index={3} />
      </div>

      <Panel title="Stock Movement" meta="7 days">
        <div className="p-4"><InventoryLine data={inventorySeries} /></div>
      </Panel>

      <Panel title="Inventory Ledger" meta={`${products.length} SKUs`}>
        <DataTable
          rows={products}
          rowKey={(r) => r.id}
          columns={[
            { key: "code", header: "Code", render: (r) => <span className="font-mono text-xs">{r.code}</span> },
            { key: "name", header: "Name", render: (r) => <span className="font-display italic">{r.name}</span> },
            { key: "batch", header: "Batch", render: (r) => <span className="font-mono text-xs">{r.batch}</span> },
            { key: "stock", header: "Stock" },
            { key: "minStock", header: "Min" },
            { key: "expires", header: "Expires", render: (r) => <span className="font-mono text-xs">{r.expires}</span> },
            { key: "status", header: "Status", render: (r) => <StatusPill tone={r.status === "In Stock" ? "good" : r.status === "Low" ? "warn" : "bad"}>{r.status}</StatusPill> },
          ]}
        />
      </Panel>
    </div>
  );
}
