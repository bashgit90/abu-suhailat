import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Panel, StatusPill } from "@/components/erp/PageHeader";
import { DataTable } from "@/components/erp/DataTable";
import { FormDialog } from "@/components/erp/FormDialog";
import { KpiCard } from "@/components/erp/KpiCard";
import { useStore } from "@/lib/store";
import { Eye, Printer } from "lucide-react";

export const Route = createFileRoute("/_shell/sales")({
  head: () => ({ meta: [{ title: "Sales & Invoices — Abu Suhailat ERP" }] }),
  component: SalesPage,
});

function SalesPage() {
  const invoices = useStore((s) => s.invoices);
  const addInvoice = useStore((s) => s.addInvoice);
  const removeInvoice = useStore((s) => s.removeInvoice);
  const [view, setView] = useState<string | null>(null);
  const sel = invoices.find((i) => i.no === view);

  const total = invoices.reduce((s, i) => s + i.amount, 0);
  const paid = invoices.filter((i) => i.status === "Paid").reduce((s, i) => s + i.amount, 0);
  const pending = invoices.filter((i) => i.status === "Pending" || i.status === "Partial").reduce((s, i) => s + i.amount, 0);
  const overdue = invoices.filter((i) => i.status === "Overdue").reduce((s, i) => s + i.amount, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Commerce"
        title="Sales & Invoices"
        description="Generate invoices, track payments, and manage receivables across all channels."
        actions={
          <FormDialog
            title="Create Invoice"
            triggerLabel="New Invoice"
            fields={[
              { name: "customer", label: "Customer", required: true },
              { name: "type", label: "Channel", type: "select", options: ["Retail", "Wholesale", "Distributor"], required: true },
              { name: "amount", label: "Amount (₦)", type: "number", required: true },
              { name: "status", label: "Status", type: "select", options: ["Paid", "Pending", "Partial", "Overdue"], defaultValue: "Pending" },
            ]}
            onSubmit={(v: any) => {
              const no = `INV-${Math.floor(Math.random() * 9000 + 1000)}`;
              addInvoice({
                no,
                customer: v.customer,
                type: v.type,
                amount: Number(v.amount),
                status: v.status || "Pending",
                date: new Date().toISOString().slice(0, 10),
              });
            }}
          />
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <KpiCard label="Total Billed" value={`₦${(total / 1000).toFixed(0)}k`} delta={`${invoices.length} invoices`} tone="emerald" sub="MTD" index={0} />
        <KpiCard label="Collected" value={`₦${(paid / 1000).toFixed(0)}k`} delta="Paid" tone="emerald" sub="Cleared" index={1} />
        <KpiCard label="Outstanding" value={`₦${(pending / 1000).toFixed(0)}k`} delta="Awaiting" tone="gold" sub="Pending" index={2} />
        <KpiCard label="Overdue" value={`₦${(overdue / 1000).toFixed(0)}k`} delta="Action req." tone="gold" sub="Past due" index={3} />
      </div>

      <Panel title="Invoice Ledger" meta={`${invoices.length} records`}>
        <DataTable
          rows={invoices}
          rowKey={(r) => r.no}
          onDelete={(r) => removeInvoice(r.no)}
          columns={[
            { key: "no", header: "No.", render: (r) => <span className="font-mono text-xs">#{r.no}</span> },
            { key: "customer", header: "Customer" },
            { key: "type", header: "Channel", render: (r) => <span className="text-xs text-foreground/60">{r.type}</span> },
            { key: "amount", header: "Amount", render: (r) => <span className="font-display italic">₦{r.amount.toLocaleString()}</span> },
            { key: "status", header: "Status", render: (r) => <StatusPill tone={r.status === "Paid" ? "good" : r.status === "Pending" || r.status === "Partial" ? "warn" : "bad"}>{r.status}</StatusPill> },
            { key: "date", header: "Date", render: (r) => <span className="font-mono text-[11px]">{r.date}</span> },
            {
              key: "_view", header: "",
              render: (r) => (
                <button onClick={() => setView(r.no)} className="text-foreground/40 hover:text-primary p-1" aria-label="View">
                  <Eye className="size-3.5" />
                </button>
              ),
            },
          ]}
        />
      </Panel>

      {sel && (
        <Panel title="Invoice Preview" meta={sel.no} className="max-w-3xl">
          <div className="p-8 bg-card">
            <div className="flex justify-between items-start mb-8 flex-wrap gap-4">
              <div>
                <div className="font-display italic text-2xl text-primary">Abu Suhailat</div>
                <div className="text-[10px] uppercase font-mono tracking-widest text-foreground/50">Traditional Medicine Enterprise</div>
                <div className="text-xs text-foreground/60 mt-2">Kano, Nigeria · +234 800 SUHAILAT</div>
              </div>
              <div className="text-right">
                <div className="font-display italic text-xl">INVOICE</div>
                <div className="text-xs font-mono text-foreground/60">#{sel.no}</div>
                <div className="text-xs font-mono text-foreground/60">{sel.date}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mb-6 text-sm">
              <div>
                <div className="text-[10px] uppercase font-mono text-foreground/40">Bill To</div>
                <div className="font-medium mt-1">{sel.customer}</div>
                <div className="text-xs text-foreground/60">{sel.type} channel</div>
              </div>
              <div>
                <div className="text-[10px] uppercase font-mono text-foreground/40">Status</div>
                <StatusPill tone={sel.status === "Paid" ? "good" : "warn"}>{sel.status}</StatusPill>
              </div>
            </div>
            <div className="border-t border-b border-border py-4 mb-4">
              <div className="flex justify-between text-sm">
                <span>Herbal medicine order ({sel.type})</span>
                <span className="font-display italic">₦{sel.amount.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex justify-between text-base font-display italic">
              <span>Total</span><span className="text-primary">₦{sel.amount.toLocaleString()}</span>
            </div>
            <div className="mt-8 flex gap-2 justify-end">
              <button onClick={() => window.print()} className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-border rounded-sm hover:bg-muted">
                <Printer className="size-3.5" /> Print
              </button>
              <button onClick={() => setView(null)} className="text-xs px-3 py-1.5 bg-primary text-primary-foreground rounded-sm">Close</button>
            </div>
          </div>
        </Panel>
      )}
    </div>
  );
}
