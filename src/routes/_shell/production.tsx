import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, StatusPill } from "@/components/erp/PageHeader";
import { DataTable } from "@/components/erp/DataTable";
import { FormDialog } from "@/components/erp/FormDialog";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/_shell/production")({
  head: () => ({ meta: [{ title: "Production — Abu Suhailat ERP" }] }),
  component: ProductionPage,
});

function ProductionPage() {
  const batches = useStore((s) => s.batches);
  const addBatch = useStore((s) => s.addBatch);
  const removeBatch = useStore((s) => s.removeBatch);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Operations"
        title="Production Lines"
        description="Active herbal extraction, distillation and packaging batches with QR-traceable hashes."
        actions={
          <FormDialog
            title="Start New Batch"
            triggerLabel="New Batch"
            fields={[
              { name: "product", label: "Product", required: true },
              { name: "supervisor", label: "Supervisor", required: true },
              { name: "status", label: "Initial Stage", type: "select", options: ["Extracting", "Processing", "Packaging", "Validated"], defaultValue: "Extracting" },
              { name: "progress", label: "Initial Progress %", type: "number", defaultValue: 5 },
            ]}
            onSubmit={(v: any) => {
              const id = `BT-${Math.floor(Math.random() * 9000 + 1000)}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
              const hash = Math.random().toString(16).slice(2, 10).toUpperCase();
              addBatch({
                id,
                product: v.product,
                supervisor: v.supervisor,
                hash,
                status: v.status || "Extracting",
                progress: Number(v.progress) || 5,
              });
            }}
          />
        }
      />

      <Panel title="Active Production Batches" meta="Live">
        <DataTable
          rows={batches}
          rowKey={(r) => r.id}
          onDelete={(r) => removeBatch(r.id)}
          columns={[
            { key: "id", header: "Batch", render: (r) => <span className="font-mono text-xs">{r.id}</span> },
            { key: "product", header: "Product", render: (r) => <span className="font-display italic">{r.product}</span> },
            { key: "supervisor", header: "Supervisor" },
            { key: "hash", header: "QR Hash", render: (r) => <span className="font-mono text-[10px] text-foreground/40">SHA: {r.hash}</span> },
            {
              key: "progress", header: "Progress",
              render: (r) => (
                <div className="w-32">
                  <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${r.progress}%` }} />
                  </div>
                  <span className="text-[10px] font-mono text-foreground/50">{r.progress}%</span>
                </div>
              ),
            },
            { key: "status", header: "Status", render: (r) => <StatusPill tone={r.status === "Validated" ? "good" : r.status === "Processing" || r.status === "Extracting" ? "warn" : "info"}>{r.status}</StatusPill> },
          ]}
        />
      </Panel>
    </div>
  );
}
