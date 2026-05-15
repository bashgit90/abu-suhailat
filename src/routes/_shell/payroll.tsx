import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel } from "@/components/erp/PageHeader";
import { DataTable } from "@/components/erp/DataTable";
import { FormDialog } from "@/components/erp/FormDialog";
import { KpiCard } from "@/components/erp/KpiCard";
import { useStore, genId } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/_shell/payroll")({
  head: () => ({ meta: [{ title: "Payroll & HR — Abu Suhailat ERP" }] }),
  component: Page,
});

function Page() {
  const staff = useStore((s) => s.staff);
  const addStaff = useStore((s) => s.addStaff);
  const removeStaff = useStore((s) => s.removeStaff);
  const total = staff.reduce((s, e) => s + e.salary + e.bonus - e.deductions, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="HR"
        title="Payroll & Workforce"
        description="Salaries, attendance and bonuses for the production team."
        actions={
          <div className="flex gap-2">
            <button
              onClick={() => toast.success("Payroll batch processed for May")}
              className="text-xs px-3 py-1.5 border border-border rounded-sm hover:bg-muted"
            >
              Process Payroll
            </button>
            <FormDialog
              title="Add Employee"
              triggerLabel="New Employee"
              fields={[
                { name: "name", label: "Full Name", required: true },
                { name: "role", label: "Role", required: true },
                { name: "salary", label: "Monthly Salary (₦)", type: "number", required: true },
                { name: "attendance", label: "Attendance %", type: "number", defaultValue: 100 },
                { name: "bonus", label: "Bonus (₦)", type: "number", defaultValue: 0 },
                { name: "deductions", label: "Deductions (₦)", type: "number", defaultValue: 0 },
                { name: "bank", label: "Bank Account", placeholder: "Bank • Number" },
              ]}
              onSubmit={(v: any) => addStaff({
                id: genId("E"), name: v.name, role: v.role,
                salary: Number(v.salary), attendance: Number(v.attendance),
                bonus: Number(v.bonus) || 0, deductions: Number(v.deductions) || 0,
                bank: v.bank || "—",
              })}
            />
          </div>
        }
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <KpiCard label="Headcount" value={staff.length.toString()} delta="Active" tone="emerald" sub="Workforce" index={0} />
        <KpiCard label="Avg Attendance" value={`${Math.round(staff.reduce((s, e) => s + e.attendance, 0) / Math.max(staff.length, 1))}%`} delta="MTD" tone="gold" sub="On time" index={1} />
        <KpiCard label="Net Payroll" value={`₦${(total / 1000).toFixed(0)}k`} delta="May" tone="emerald" sub="To disburse" index={2} />
        <KpiCard label="Total Bonuses" value={`₦${(staff.reduce((s, e) => s + e.bonus, 0) / 1000).toFixed(0)}k`} delta="Approved" tone="gold" sub="Performance" index={3} />
      </div>
      <Panel title="Employee Roster" meta={`${staff.length} on payroll`}>
        <DataTable
          rows={staff} rowKey={(r) => r.id} onDelete={(r) => removeStaff(r.id)}
          columns={[
            { key: "id", header: "ID", render: (r) => <span className="font-mono text-xs">{r.id}</span> },
            { key: "name", header: "Name", render: (r) => <span className="font-display italic">{r.name}</span> },
            { key: "role", header: "Role" },
            { key: "salary", header: "Salary", render: (r) => <span className="font-mono text-xs">₦{r.salary.toLocaleString()}</span> },
            { key: "attendance", header: "Att.", render: (r) => <span className="font-mono text-xs">{r.attendance}%</span> },
            { key: "bonus", header: "Bonus", render: (r) => <span className="font-mono text-xs">₦{r.bonus.toLocaleString()}</span> },
            { key: "net", header: "Net", render: (r) => <span className="font-display italic">₦{(r.salary + r.bonus - r.deductions).toLocaleString()}</span> },
            { key: "bank", header: "Bank", render: (r) => <span className="font-mono text-[10px] text-foreground/50">{r.bank}</span> },
          ]}
        />
      </Panel>
    </div>
  );
}
