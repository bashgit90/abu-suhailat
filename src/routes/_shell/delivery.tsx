import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, StatusPill } from "@/components/erp/PageHeader";
import { DataTable } from "@/components/erp/DataTable";
import { FormDialog } from "@/components/erp/FormDialog";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/_shell/delivery")({
  head: () => ({ meta: [{ title: "Delivery & Logistics — Abu Suhailat ERP" }] }),
  component: Page,
});

function Page() {
  const deliveries = useStore((s) => s.deliveries);
  const addDelivery = useStore((s) => s.addDelivery);
  const removeDelivery = useStore((s) => s.removeDelivery);
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Logistics"
        title="Delivery & Dispatch"
        description="Track shipments and dispatch agents across regions."
        actions={
          <FormDialog
            title="Schedule Delivery"
            triggerLabel="New Delivery"
            fields={[
              { name: "invoice", label: "Invoice No.", required: true },
              { name: "agent", label: "Agent", required: true },
              { name: "destination", label: "Destination", required: true },
              { name: "status", label: "Status", type: "select", options: ["Pending", "Dispatched", "In Transit", "Delivered"], defaultValue: "Pending" },
              { name: "eta", label: "ETA", placeholder: "e.g. Tomorrow" },
            ]}
            onSubmit={(v: any) => addDelivery({
              id: `DLV-${Math.floor(Math.random() * 9000 + 1000)}`,
              invoice: v.invoice, agent: v.agent, destination: v.destination,
              status: v.status || "Pending", eta: v.eta || "—",
            })}
          />
        }
      />
      <Panel title="Active Shipments" meta="Live">
        <DataTable
          rows={deliveries} rowKey={(r) => r.id} onDelete={(r) => removeDelivery(r.id)}
          columns={[
            { key: "id", header: "Tracking", render: (r) => <span className="font-mono text-xs">{r.id}</span> },
            { key: "invoice", header: "Invoice", render: (r) => <span className="font-mono text-xs">{r.invoice}</span> },
            { key: "agent", header: "Agent" },
            { key: "destination", header: "Destination", render: (r) => <span className="font-display italic">{r.destination}</span> },
            { key: "status", header: "Status", render: (r) => <StatusPill tone={r.status === "Delivered" ? "good" : r.status === "Pending" ? "bad" : "warn"}>{r.status}</StatusPill> },
            { key: "eta", header: "ETA", render: (r) => <span className="font-mono text-xs">{r.eta}</span> },
          ]}
        />
      </Panel>
    </div>
  );
}
