import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, StatusPill } from "@/components/erp/PageHeader";
import { DataTable } from "@/components/erp/DataTable";
import { KpiCard } from "@/components/erp/KpiCard";
import { InventoryLine } from "@/components/erp/Charts";
import { useStore } from "@/lib/store";
import { inventorySeries } from "@/lib/mock-data";
import { FormDialog } from "@/components/erp/FormDialog";
import { toast } from "sonner";
import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react";

export const Route = createFileRoute("/_shell/inventory")({
  head: () => ({ meta: [{ title: "Inventory — Abu Suhailat ERP" }] }),
  component: InventoryPage,
});

function InventoryPage() {
  const products = useStore((s) => s.products);
  const movements = useStore((s) => s.movements);
  const addMovement = useStore((s) => s.addMovement);
  const removeMovement = useStore((s) => s.removeMovement);

  const total = products.reduce((s, p) => s + p.stock, 0);
  const low = products.filter((p) => p.status === "Low").length;
  const value = products.reduce((s, p) => s + p.stock * p.cost, 0);
  const inToday = movements.filter((m) => m.type === "IN").reduce((s, m) => s + m.qty, 0);
  const outToday = movements.filter((m) => m.type === "OUT").reduce((s, m) => s + m.qty, 0);

  const productOptions = products.map((p) => `${p.code} — ${p.name}`);

  const submitMovement = (type: "IN" | "OUT") => (v: any) => {
    const code = String(v.product).split(" — ")[0];
    const prod = products.find((p) => p.code === code);
    if (!prod) { toast.error("Select a valid product"); return; }
    addMovement({
      id: `MV-${Math.floor(Math.random() * 9000 + 1000)}`,
      productCode: prod.code,
      productName: prod.name,
      type,
      qty: Math.abs(Number(v.qty)),
      reason: v.reason || (type === "IN" ? "Restock" : "Sale"),
      note: v.note,
      date: new Date().toISOString().slice(0, 10),
      by: v.by || "Warehouse",
    });
    toast.success(`Stock ${type === "IN" ? "received" : "issued"}: ${prod.code} ×${v.qty}`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Operations"
        title="Inventory & Warehouse"
        description="Track products in and out with full movement history."
        actions={
          <div className="flex gap-2">
            <FormDialog
              title="Stock In · Receive Goods"
              triggerLabel="Stock In"
              trigger={
                <button className="text-xs px-3 py-1.5 rounded-sm bg-emerald-deep text-primary-foreground flex items-center gap-1.5 hover:opacity-90">
                  <ArrowDownToLine className="size-3.5" /> Stock In
                </button>
              }
              fields={[
                { name: "product", label: "Product", type: "select", options: productOptions, required: true },
                { name: "qty", label: "Quantity Received", type: "number", required: true },
                { name: "reason", label: "Reason", type: "select", options: ["Restock", "Return", "Production", "Transfer"], defaultValue: "Restock" },
                { name: "by", label: "Received By" },
                { name: "note", label: "Note", type: "textarea" },
              ]}
              onSubmit={submitMovement("IN")}
            />
            <FormDialog
              title="Stock Out · Issue Goods"
              triggerLabel="Stock Out"
              trigger={
                <button className="text-xs px-3 py-1.5 rounded-sm bg-card border border-border text-foreground flex items-center gap-1.5 hover:bg-muted">
                  <ArrowUpFromLine className="size-3.5" /> Stock Out
                </button>
              }
              fields={[
                { name: "product", label: "Product", type: "select", options: productOptions, required: true },
                { name: "qty", label: "Quantity Issued", type: "number", required: true },
                { name: "reason", label: "Reason", type: "select", options: ["Sale", "Damage", "Sample", "Audit", "Transfer"], defaultValue: "Sale" },
                { name: "by", label: "Issued By" },
                { name: "note", label: "Note", type: "textarea" },
              ]}
              onSubmit={submitMovement("OUT")}
            />
          </div>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <KpiCard label="Total SKUs" value={products.length.toString()} delta="Catalog" tone="emerald" sub="Active" index={0} />
        <KpiCard label="Total Units" value={total.toLocaleString()} delta={`Low: ${low}`} tone="gold" sub="In stock" index={1} />
        <KpiCard label="Stock In" value={inToday.toLocaleString()} delta="Period" tone="emerald" sub="Received" index={2} />
        <KpiCard label="Stock Out" value={outToday.toLocaleString()} delta="Period" tone="gold" sub="Issued" index={3} />
      </div>

      <Panel title="Stock Movement Trend" meta="7 days">
        <div className="p-4"><InventoryLine data={inventorySeries} /></div>
      </Panel>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Panel title="Stock In / Out Ledger" meta={`${movements.length} movements`}>
          <DataTable
            rows={movements}
            rowKey={(r) => r.id}
            onDelete={(r) => removeMovement(r.id)}
            columns={[
              { key: "id", header: "ID", render: (r) => <span className="font-mono text-[11px]">{r.id}</span> },
              { key: "type", header: "Type", render: (r) => (
                <span className={`inline-flex items-center gap-1 text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${
                  r.type === "IN" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"
                }`}>
                  {r.type === "IN" ? <ArrowDownToLine className="size-3" /> : <ArrowUpFromLine className="size-3" />} {r.type}
                </span>
              )},
              { key: "productCode", header: "Product", render: (r) => (
                <div className="leading-tight">
                  <div className="font-mono text-[11px]">{r.productCode}</div>
                  <div className="text-foreground/50 text-[10px]">{r.productName}</div>
                </div>
              )},
              { key: "qty", header: "Qty", render: (r) => <span className={`font-mono text-sm ${r.type === "IN" ? "text-emerald-700" : "text-amber-700"}`}>{r.type === "IN" ? "+" : "-"}{r.qty}</span> },
              { key: "reason", header: "Reason", render: (r) => <span className="text-xs text-foreground/60">{r.reason}</span> },
              { key: "date", header: "Date", render: (r) => <span className="font-mono text-[11px]">{r.date}</span> },
            ]}
          />
        </Panel>

        <Panel title="Inventory Snapshot" meta={`Value SAR ${(value / 1000).toFixed(0)}k`}>
          <DataTable
            rows={products}
            rowKey={(r) => r.id}
            columns={[
              { key: "code", header: "Code", render: (r) => <span className="font-mono text-xs">{r.code}</span> },
              { key: "name", header: "Name", render: (r) => <span className="font-display italic">{r.name}</span> },
              { key: "stock", header: "Stock" },
              { key: "minStock", header: "Min" },
              { key: "status", header: "Status", render: (r) => <StatusPill tone={r.status === "In Stock" ? "good" : r.status === "Low" ? "warn" : "bad"}>{r.status}</StatusPill> },
            ]}
          />
        </Panel>
      </div>
    </div>
  );
}
