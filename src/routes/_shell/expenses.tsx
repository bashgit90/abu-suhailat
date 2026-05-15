import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel } from "@/components/erp/PageHeader";
import { DataTable } from "@/components/erp/DataTable";
import { FormDialog } from "@/components/erp/FormDialog";
import { CategoryBars } from "@/components/erp/Charts";
import { useStore, genId } from "@/lib/store";

export const Route = createFileRoute("/_shell/expenses")({
  head: () => ({ meta: [{ title: "Expenses — Abu Suhailat ERP" }] }),
  component: Page,
});

function Page() {
  const expenses = useStore((s) => s.expenses);
  const addExpense = useStore((s) => s.addExpense);
  const removeExpense = useStore((s) => s.removeExpense);
  const chart = expenses.map((e) => ({ name: e.cat, value: e.amount }));
  const total = expenses.reduce((s, e) => s + e.amount, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Finance"
        title="Operating Expenses"
        description="Cost centers and recurring outflows tracked monthly."
        actions={
          <FormDialog
            title="Log Expense"
            triggerLabel="New Expense"
            fields={[
              { name: "cat", label: "Category", type: "select", options: ["Raw Materials", "Salaries", "Packaging", "Transportation", "Utilities", "Marketing", "Maintenance", "Other"], required: true },
              { name: "amount", label: "Amount (₦)", type: "number", required: true },
              { name: "date", label: "Date", type: "date" },
            ]}
            onSubmit={(v: any) => addExpense({
              id: genId("EX"), cat: v.cat, amount: Number(v.amount),
              share: Math.round((Number(v.amount) / Math.max(total, 1)) * 100),
              date: v.date || new Date().toISOString().slice(0, 10),
            })}
          />
        }
      />
      <Panel title="Cost Distribution" meta={`Total ₦${(total / 1000000).toFixed(2)}M`}>
        <div className="p-4"><CategoryBars data={chart} /></div>
      </Panel>
      <Panel title="Expense Ledger" meta={`${expenses.length} entries`}>
        <DataTable
          rows={expenses} rowKey={(r) => r.id ?? r.cat} onDelete={(r) => removeExpense(r.id!)}
          columns={[
            { key: "id", header: "ID", render: (r) => <span className="font-mono text-xs">{r.id}</span> },
            { key: "cat", header: "Category", render: (r) => <span className="font-display italic">{r.cat}</span> },
            { key: "amount", header: "Amount", render: (r) => <span className="font-mono text-xs">₦{r.amount.toLocaleString()}</span> },
            { key: "share", header: "% of Total", render: (r) => <span className="font-mono text-xs">{r.share}%</span> },
            { key: "date", header: "Date", render: (r) => <span className="font-mono text-xs">{r.date}</span> },
          ]}
        />
      </Panel>
    </div>
  );
}
