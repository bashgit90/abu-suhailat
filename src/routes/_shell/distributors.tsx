import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, StatusPill } from "@/components/erp/PageHeader";
import { DataTable } from "@/components/erp/DataTable";
import { FormDialog } from "@/components/erp/FormDialog";
import { useStore, genId } from "@/lib/store";

export const Route = createFileRoute("/_shell/distributors")({
  head: () => ({ meta: [{ title: "Distributors — Abu Suhailat ERP" }] }),
  component: Page,
});

function Page() {
  const distributors = useStore((s) => s.distributors);
  const addDistributor = useStore((s) => s.addDistributor);
  const removeDistributor = useStore((s) => s.removeDistributor);
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Wholesale"
        title="Distributor Network"
        description="Regional partners, order volume and outstanding balances."
        actions={
          <FormDialog
            title="Add Distributor"
            triggerLabel="New Distributor"
            fields={[
              { name: "name", label: "Company Name", required: true },
              { name: "region", label: "Region", type: "select", options: ["North-West", "North-East", "South-West", "South-East", "South-South", "Federal Capital", "North-Central"], required: true },
              { name: "orders", label: "Orders YTD", type: "number", defaultValue: 0 },
              { name: "balance", label: "Outstanding (₦)", type: "number", defaultValue: 0 },
              { name: "status", label: "Status", type: "select", options: ["Active", "Pending", "Suspended"], defaultValue: "Active" },
            ]}
            onSubmit={(v: any) => addDistributor({
              id: genId("D"), name: v.name, region: v.region,
              orders: Number(v.orders) || 0, balance: Number(v.balance) || 0, status: v.status || "Active",
            })}
          />
        }
      />
      <Panel title="Distributor Portal" meta={`${distributors.length} partners`}>
        <DataTable
          rows={distributors} rowKey={(r) => r.id} onDelete={(r) => removeDistributor(r.id)}
          columns={[
            { key: "id", header: "ID", render: (r) => <span className="font-mono text-xs">{r.id}</span> },
            { key: "name", header: "Name", render: (r) => <span className="font-display italic">{r.name}</span> },
            { key: "region", header: "Region" },
            { key: "orders", header: "Orders" },
            { key: "balance", header: "Balance", render: (r) => <span className={r.balance > 0 ? "text-destructive font-mono text-xs" : "font-mono text-xs text-foreground/40"}>₦{r.balance.toLocaleString()}</span> },
            { key: "status", header: "Status", render: (r) => <StatusPill tone={r.status === "Active" ? "good" : r.status === "Pending" ? "warn" : "bad"}>{r.status}</StatusPill> },
          ]}
        />
      </Panel>
    </div>
  );
}
