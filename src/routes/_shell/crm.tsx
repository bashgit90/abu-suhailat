import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, StatusPill } from "@/components/erp/PageHeader";
import { DataTable } from "@/components/erp/DataTable";
import { FormDialog } from "@/components/erp/FormDialog";
import { useStore, genId } from "@/lib/store";

export const Route = createFileRoute("/_shell/crm")({
  head: () => ({ meta: [{ title: "Customer CRM — Abu Suhailat ERP" }] }),
  component: CrmPage,
});

function CrmPage() {
  const customers = useStore((s) => s.customers);
  const addCustomer = useStore((s) => s.addCustomer);
  const removeCustomer = useStore((s) => s.removeCustomer);
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Commerce"
        title="Customer Registry"
        description="Tiered customer relationships, balances and lifetime value."
        actions={
          <FormDialog
            title="Add Customer"
            triggerLabel="New Customer"
            fields={[
              { name: "name", label: "Full Name", required: true },
              { name: "phone", label: "Phone", required: true },
              { name: "city", label: "City", required: true },
              { name: "tier", label: "Tier", type: "select", options: ["Regular", "VIP", "Wholesale", "Distributor"], required: true },
              { name: "spent", label: "Lifetime Spend (₦)", type: "number", defaultValue: 0 },
              { name: "balance", label: "Outstanding Balance (₦)", type: "number", defaultValue: 0 },
            ]}
            onSubmit={(v: any) => addCustomer({
              id: genId("C"), name: v.name, phone: v.phone, city: v.city, tier: v.tier,
              spent: Number(v.spent) || 0, balance: Number(v.balance) || 0,
            })}
          />
        }
      />
      <Panel title="All Customers" meta={`${customers.length} records`}>
        <DataTable
          rows={customers} rowKey={(r) => r.id} onDelete={(r) => removeCustomer(r.id)}
          columns={[
            { key: "id", header: "ID", render: (r) => <span className="font-mono text-xs">{r.id}</span> },
            { key: "name", header: "Name", render: (r) => <span className="font-display italic">{r.name}</span> },
            { key: "phone", header: "Phone", render: (r) => <span className="font-mono text-xs">{r.phone}</span> },
            { key: "city", header: "City" },
            { key: "tier", header: "Tier", render: (r) => <StatusPill tone={r.tier === "VIP" ? "good" : r.tier === "Wholesale" || r.tier === "Distributor" ? "info" : "warn"}>{r.tier}</StatusPill> },
            { key: "spent", header: "Lifetime", render: (r) => <span className="font-display italic">₦{r.spent.toLocaleString()}</span> },
            { key: "balance", header: "Balance", render: (r) => <span className={r.balance > 0 ? "text-destructive font-mono text-xs" : "font-mono text-xs text-foreground/40"}>₦{r.balance.toLocaleString()}</span> },
          ]}
        />
      </Panel>
    </div>
  );
}
