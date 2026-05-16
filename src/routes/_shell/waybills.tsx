import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Panel, StatusPill } from "@/components/erp/PageHeader";
import { DataTable } from "@/components/erp/DataTable";
import { FormDialog } from "@/components/erp/FormDialog";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useStore } from "@/lib/store";
import type { Waybill } from "@/lib/mock-data";
import { Eye, Printer, Share2, X, MapPin, Phone, User, Package, Truck } from "lucide-react";
import logoSrc from "/favicon.ico?url";

export const Route = createFileRoute("/_shell/waybills")({
  head: () => ({ meta: [{ title: "Waybills — Abu Suhailat ERP" }] }),
  component: Page,
});

function Page() {
  const waybills = useStore((s) => s.waybills);
  const addWaybill = useStore((s) => s.addWaybill);
  const removeWaybill = useStore((s) => s.removeWaybill);
  const [view, setView] = useState<string | null>(null);
  const sel = waybills.find((w) => w.id === view);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Logistics"
        title="Waybills"
        description="Issue printable waybills with sender and receiver details for every dispatch."
        actions={
          <FormDialog
            title="New Waybill"
            triggerLabel="New Waybill"
            fields={[
              { name: "senderName", label: "Sender Name", required: true, defaultValue: "Abu Suhailat HQ" },
              { name: "senderPhone", label: "Sender Phone", required: true, defaultValue: "+966 55 123 4567" },
              { name: "senderAddress", label: "Sender Address", required: true, defaultValue: "Riyadh" },
              { name: "receiverName", label: "Receiver Name", required: true },
              { name: "receiverPhone", label: "Receiver Phone", required: true },
              { name: "receiverAddress", label: "Receiver Address", required: true },
              { name: "cartons", label: "Cartons", type: "number", required: true, defaultValue: 1 },
              { name: "description", label: "Shipment Details", placeholder: "e.g. 5 cartons herbal medicine" },
              { name: "invoice", label: "Linked Invoice (optional)" },
              { name: "status", label: "Status", type: "select", options: ["Pending", "Dispatched", "In Transit", "Delivered"], defaultValue: "Pending" },
            ]}
            onSubmit={(v: any) => {
              const cartons = Number(v.cartons) || 1;
              const id = `WB-2026-${String(Math.floor(Math.random() * 9000 + 1000))}`;
              addWaybill({
                id,
                date: new Date().toISOString().slice(0, 10),
                status: v.status,
                senderName: v.senderName,
                senderPhone: v.senderPhone,
                senderAddress: v.senderAddress,
                receiverName: v.receiverName,
                receiverPhone: v.receiverPhone,
                receiverAddress: v.receiverAddress,
                cartons,
                description: v.description || `${cartons} cartons`,
                invoice: v.invoice || undefined,
              });
            }}
          />
        }
      />

      <Panel title="Waybill Register" meta={`${waybills.length} records`}>
        <DataTable
          rows={waybills}
          rowKey={(r) => r.id}
          onDelete={(r) => removeWaybill(r.id)}
          columns={[
            { key: "id", header: "Waybill", render: (r) => <span className="font-mono text-xs">{r.id}</span> },
            { key: "date", header: "Date", render: (r) => <span className="font-mono text-[11px]">{r.date}</span> },
            { key: "sender", header: "From", render: (r) => <span className="font-display italic">{r.senderName}</span> },
            { key: "receiver", header: "To", render: (r) => <span className="font-display italic">{r.receiverName}</span> },
            { key: "cartons", header: "Cartons", render: (r) => <span className="font-mono text-xs">{r.cartons}</span> },
            {
              key: "status", header: "Status",
              render: (r) => <StatusPill tone={r.status === "Delivered" ? "good" : r.status === "Pending" ? "bad" : "warn"}>{r.status}</StatusPill>,
            },
            {
              key: "_view", header: "",
              render: (r) => (
                <button onClick={() => setView(r.id)} className="p-1 text-foreground/40 hover:text-primary" aria-label="View">
                  <Eye className="size-3.5" />
                </button>
              ),
            },
          ]}
        />
      </Panel>

      <Dialog open={!!sel} onOpenChange={(o) => !o && setView(null)}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden max-h-[92vh] overflow-y-auto">
          {sel && <WaybillView w={sel} onClose={() => setView(null)} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function WaybillView({ w, onClose }: { w: Waybill; onClose: () => void }) {
  const shareWA = () => {
    const text = `*Abu Suhailat ERP — Waybill ${w.id}*%0A%0AFrom: ${w.senderName} (${w.senderPhone})%0ATo: ${w.receiverName} (${w.receiverPhone})%0AAddress: ${w.receiverAddress}%0AShipment: ${w.description}%0AStatus: ${w.status}%0ADate: ${w.date}`;
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };
  return (
    <div className="bg-white text-ink relative print:p-8">
      <div className="absolute top-4 right-4 flex items-center gap-2 print:hidden z-10">
        <button onClick={shareWA} className="flex items-center gap-1.5 text-xs font-medium bg-[#25D366] text-white px-3 py-1.5 rounded-full hover:opacity-90">
          <Share2 className="size-3.5" /> WhatsApp
        </button>
        <button onClick={() => window.print()} className="flex items-center gap-1.5 text-xs font-medium bg-primary text-primary-foreground px-3 py-1.5 rounded-full hover:opacity-90">
          <Printer className="size-3.5" /> Print
        </button>
        <button onClick={onClose} className="size-7 grid place-items-center rounded-full border border-border" aria-label="Close">
          <X className="size-3.5" />
        </button>
      </div>

      <div className="p-6 md:p-10">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded bg-accent/20 grid place-items-center text-2xl">🌿</div>
            <div>
              <div className="font-display italic text-xl md:text-2xl text-primary leading-none">Abu Suhailat ERP</div>
              <div className="text-xs text-foreground/60 mt-1">Logistics &amp; Distribution</div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end gap-2 text-accent">
              <Truck className="size-5" />
              <span className="font-display italic text-2xl md:text-3xl tracking-tight">WAYBILL</span>
            </div>
            <div className="mt-2 inline-block border border-border rounded px-3 py-1 font-mono text-sm text-primary">{w.id}</div>
            <div className="text-xs text-foreground/60 mt-1">Date: {w.date}</div>
            <div className="mt-1"><StatusPill tone={w.status === "Delivered" ? "good" : w.status === "Pending" ? "bad" : "info"}>{w.status}</StatusPill></div>
          </div>
        </div>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
          <div className="text-accent">◆</div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Party label="SENDER" name={w.senderName} phone={w.senderPhone} address={w.senderAddress} />
          <Party label="RECEIVER" name={w.receiverName} phone={w.receiverPhone} address={w.receiverAddress} />
        </div>

        <div className="mt-4 border border-border rounded-lg p-4 bg-beige-warm/40">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-foreground/50">
            <Package className="size-3" /> Shipment Details
          </div>
          <div className="mt-2 font-display italic text-lg">{w.description}</div>
          {w.invoice && <div className="text-xs font-mono text-foreground/50 mt-1">Linked: {w.invoice}</div>}
        </div>

        <div className="grid grid-cols-2 gap-8 mt-10 text-xs">
          <div>
            <div className="border-t border-foreground/30 pt-2">Sender Signature</div>
          </div>
          <div>
            <div className="border-t border-foreground/30 pt-2">Receiver Signature</div>
          </div>
        </div>
      </div>

      <div className="bg-emerald-deep text-accent text-center py-3 text-[11px] font-mono uppercase tracking-[0.25em]">
        Traditional Wisdom. Modern Solutions. 🌿
      </div>
    </div>
  );
}

function Party({ label, name, phone, address }: { label: string; name: string; phone: string; address: string }) {
  return (
    <div className="border border-border rounded-lg p-4 bg-beige-warm/40">
      <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-foreground/50">
        <MapPin className="size-3" /> {label}
      </div>
      <div className="mt-2 space-y-1.5 text-sm">
        <div className="flex items-center gap-2 font-display italic text-lg"><User className="size-4 text-foreground/40" /> {name}</div>
        <div className="flex items-center gap-2 text-foreground/70"><Phone className="size-3.5 text-foreground/40" /> {phone}</div>
        <div className="flex items-center gap-2 text-foreground/70"><MapPin className="size-3.5 text-foreground/40" /> {address}</div>
      </div>
    </div>
  );
}
