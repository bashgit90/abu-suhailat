import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Panel, StatusPill } from "@/components/erp/PageHeader";
import { DataTable } from "@/components/erp/DataTable";
import { FormDialog } from "@/components/erp/FormDialog";
import { KpiCard } from "@/components/erp/KpiCard";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { InvoiceView } from "@/components/erp/InvoiceView";
import { useStore } from "@/lib/store";
import { Eye } from "lucide-react";

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
        description="Generate invoices, track payments, and share via print or WhatsApp."
        actions={
          <FormDialog
            title="Create Invoice"
            triggerLabel="New Invoice"
            fields={[
              { name: "customer", label: "Customer Name", required: true },
              { name: "phone", label: "Phone", placeholder: "+966 …" },
              { name: "address", label: "Address" },
              { name: "type", label: "Channel", type: "select", options: ["Retail", "Wholesale", "Distributor"], required: true },
              { name: "amount", label: "Amount (SAR)", type: "number", required: true },
              { name: "status", label: "Status", type: "select", options: ["Paid", "Pending", "Partial", "Overdue"], defaultValue: "Pending" },
            ]}
            onSubmit={(v: any) => {
              const no = `INV-2026-${String(Math.floor(Math.random() * 900000 + 100000))}`;
              addInvoice({
                no,
                customer: v.customer,
                phone: v.phone || "",
                address: v.address || "",
                type: v.type,
                amount: Number(v.amount),
                status: v.status || "Pending",
                date: new Date().toISOString().slice(0, 10),
                items: [],
              } as any);
            }}
          />
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <KpiCard label="Total Billed" value={`SAR ${total.toFixed(0)}`} delta={`${invoices.length} invoices`} tone="emerald" sub="MTD" index={0} />
        <KpiCard label="Collected" value={`SAR ${paid.toFixed(0)}`} delta="Paid" tone="emerald" sub="Cleared" index={1} />
        <KpiCard label="Outstanding" value={`SAR ${pending.toFixed(0)}`} delta="Awaiting" tone="gold" sub="Pending" index={2} />
        <KpiCard label="Overdue" value={`SAR ${overdue.toFixed(0)}`} delta="Action req." tone="gold" sub="Past due" index={3} />
      </div>

      <Panel title="Invoice Ledger" meta={`${invoices.length} records`}>
        <DataTable
          rows={invoices}
          rowKey={(r) => r.no}
          onDelete={(r) => removeInvoice(r.no)}
          columns={[
            { key: "no", header: "No.", render: (r) => <button onClick={() => setView(r.no)} className="font-mono text-xs text-primary hover:underline">#{r.no}</button> },
            { key: "customer", header: "Customer", render: (r) => <span className="font-display italic">{r.customer}</span> },
            { key: "type", header: "Channel", render: (r) => <span className="text-xs text-foreground/60">{r.type}</span> },
            { key: "amount", header: "Amount", render: (r) => <span className="font-mono text-xs">SAR {r.amount.toFixed(2)}</span> },
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

      <Dialog open={!!sel} onOpenChange={(o) => !o && setView(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden max-h-[92vh] overflow-y-auto">
          {sel && <InvoiceView inv={sel as any} onClose={() => setView(null)} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
