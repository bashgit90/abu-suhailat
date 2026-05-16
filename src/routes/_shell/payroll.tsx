import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Panel } from "@/components/erp/PageHeader";
import { FormDialog } from "@/components/erp/FormDialog";
import { KpiCard } from "@/components/erp/KpiCard";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useStore, genId, type Staff } from "@/lib/store";
import { toast } from "sonner";
import { Eye, Phone, Mail, CalendarDays, Banknote, Trash2, X } from "lucide-react";

export const Route = createFileRoute("/_shell/payroll")({
  head: () => ({ meta: [{ title: "Payroll & HR — Abu Suhailat ERP" }] }),
  component: Page,
});

const CYCLE_DAYS = 2;

function nextPayDate() {
  const d = new Date();
  d.setDate(d.getDate() + CYCLE_DAYS);
  return d.toISOString().slice(0, 10);
}

function Page() {
  const staff = useStore((s) => s.staff);
  const addStaff = useStore((s) => s.addStaff);
  const removeStaff = useStore((s) => s.removeStaff);
  const [view, setView] = useState<string | null>(null);
  const sel = staff.find((e) => e.id === view);

  const cycleTotal = staff.reduce((s, e) => s + ((e.salary + e.bonus - e.deductions) / 30) * CYCLE_DAYS, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="HR · Payroll cycle every 2 days"
        title="Payroll & Workforce"
        description={`Bi-daily payroll runs — next disbursement scheduled for ${nextPayDate()}.`}
        actions={
          <div className="flex gap-2">
            <button
              onClick={() => toast.success(`Bi-daily payroll batch processed (${nextPayDate()})`)}
              className="text-xs px-3 py-1.5 border border-border rounded-sm hover:bg-muted"
            >
              Run 2-Day Cycle
            </button>
            <FormDialog
              title="Add Employee"
              triggerLabel="New Employee"
              fields={[
                { name: "name", label: "Full Name", required: true },
                { name: "role", label: "Role", required: true },
                { name: "phone", label: "Phone" },
                { name: "email", label: "Email" },
                { name: "salary", label: "Monthly Salary", type: "number", required: true },
                { name: "attendance", label: "Attendance %", type: "number", defaultValue: 100 },
                { name: "bonus", label: "Bonus", type: "number", defaultValue: 0 },
                { name: "deductions", label: "Deductions", type: "number", defaultValue: 0 },
                { name: "bank", label: "Bank Account", placeholder: "Bank • Number" },
                { name: "avatar", label: "Photo URL", placeholder: "https://…" },
              ]}
              onSubmit={(v: any) => {
                const id = genId("E");
                addStaff({
                  id, name: v.name, role: v.role,
                  salary: Number(v.salary), attendance: Number(v.attendance),
                  bonus: Number(v.bonus) || 0, deductions: Number(v.deductions) || 0,
                  bank: v.bank || "—",
                  phone: v.phone || "—",
                  email: v.email || "—",
                  joined: new Date().toISOString().slice(0, 10),
                  avatar: v.avatar || `https://i.pravatar.cc/200?u=${id}`,
                });
              }}
            />
          </div>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <KpiCard label="Headcount" value={staff.length.toString()} delta="Active" tone="emerald" sub="Workforce" index={0} />
        <KpiCard label="Avg Attendance" value={`${Math.round(staff.reduce((s, e) => s + e.attendance, 0) / Math.max(staff.length, 1))}%`} delta="MTD" tone="gold" sub="On time" index={1} />
        <KpiCard label="2-Day Payroll" value={`SAR ${(cycleTotal / 1000).toFixed(1)}k`} delta="Due in 2d" tone="emerald" sub="To disburse" index={2} />
        <KpiCard label="Total Bonuses" value={`SAR ${(staff.reduce((s, e) => s + e.bonus, 0) / 1000).toFixed(0)}k`} delta="Approved" tone="gold" sub="Performance" index={3} />
      </div>

      <Panel title="Employee Roster" meta={`${staff.length} on payroll`}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4 p-4 md:p-5">
          {staff.map((e) => (
            <EmployeeCard key={e.id} e={e} onView={() => setView(e.id)} onDelete={() => removeStaff(e.id)} />
          ))}
        </div>
      </Panel>

      <Dialog open={!!sel} onOpenChange={(o) => !o && setView(null)}>
        <DialogContent className="max-w-lg p-0 overflow-hidden">
          {sel && <EmployeeProfile e={sel} onClose={() => setView(null)} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function EmployeeCard({ e, onView, onDelete }: { e: Staff; onView: () => void; onDelete: () => void }) {
  const net = e.salary + e.bonus - e.deductions;
  const cycle = (net / 30) * CYCLE_DAYS;
  return (
    <div className="group bg-card border border-border rounded-lg p-4 flex gap-4 hover:shadow-md hover:-translate-y-0.5 transition">
      <img
        src={(e as any).avatar ?? `https://i.pravatar.cc/120?u=${e.id}`}
        alt={e.name}
        className="size-16 rounded-full object-cover ring-2 ring-accent/30 shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <div className="font-display italic text-base truncate">{e.name}</div>
            <div className="text-[11px] text-foreground/60 truncate">{e.role}</div>
          </div>
          <span className="text-[9px] font-mono uppercase bg-accent/15 text-accent-foreground px-1.5 py-0.5 rounded">{e.id}</span>
        </div>
        <div className="grid grid-cols-2 gap-1 mt-2 text-[10px] font-mono">
          <div><span className="text-foreground/50">Attend.</span> <span>{e.attendance}%</span></div>
          <div><span className="text-foreground/50">Bonus</span> <span>SAR {e.bonus.toLocaleString()}</span></div>
          <div className="col-span-2 mt-1 flex items-center justify-between">
            <span className="text-foreground/50 text-[10px] uppercase">2-day cycle</span>
            <span className="font-display italic text-sm text-primary">SAR {cycle.toFixed(0)}</span>
          </div>
        </div>
        <div className="flex items-center justify-end gap-1 mt-2">
          <button onClick={onView} className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded border border-border hover:bg-muted flex items-center gap-1">
            <Eye className="size-3" /> Profile
          </button>
          <button onClick={onDelete} className="size-7 grid place-items-center rounded text-foreground/40 hover:text-destructive hover:bg-destructive/10" aria-label="Delete">
            <Trash2 className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function EmployeeProfile({ e, onClose }: { e: Staff; onClose: () => void }) {
  const net = e.salary + e.bonus - e.deductions;
  const cycle = (net / 30) * CYCLE_DAYS;
  return (
    <div className="relative">
      <button onClick={onClose} className="absolute top-3 right-3 size-7 grid place-items-center rounded-full bg-white/80 z-10" aria-label="Close">
        <X className="size-3.5" />
      </button>
      <div className="h-28 bg-gradient-to-br from-emerald-deep to-emerald-forest relative">
        <div className="absolute inset-0 geo-watermark opacity-10" />
      </div>
      <div className="px-5 pb-5 -mt-12">
        <img
          src={(e as any).avatar ?? `https://i.pravatar.cc/200?u=${e.id}`}
          alt={e.name}
          className="size-24 rounded-full object-cover ring-4 ring-card mx-auto"
        />
        <div className="text-center mt-2">
          <div className="font-display italic text-2xl">{e.name}</div>
          <div className="text-xs text-foreground/60">{e.role} · {e.id}</div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
          <Info icon={<Phone className="size-3.5" />} k="Phone" v={(e as any).phone ?? "—"} />
          <Info icon={<Mail className="size-3.5" />} k="Email" v={(e as any).email ?? "—"} />
          <Info icon={<CalendarDays className="size-3.5" />} k="Joined" v={(e as any).joined ?? "—"} />
          <Info icon={<Banknote className="size-3.5" />} k="Bank" v={e.bank} />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <Stat k="Attendance" v={`${e.attendance}%`} />
          <Stat k="Bonus" v={`SAR ${e.bonus.toLocaleString()}`} />
          <Stat k="Deductions" v={`SAR ${e.deductions.toLocaleString()}`} />
        </div>

        <div className="mt-4 border-t border-border pt-3 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase text-foreground/50">2-Day Cycle Pay</div>
            <div className="font-display italic text-2xl text-primary">SAR {cycle.toFixed(0)}</div>
          </div>
          <button
            onClick={() => toast.success(`Disbursed SAR ${cycle.toFixed(0)} to ${e.name}`)}
            className="text-xs font-medium bg-primary text-primary-foreground px-3 py-1.5 rounded-sm"
          >
            Disburse Now
          </button>
        </div>
      </div>
    </div>
  );
}

function Info({ icon, k, v }: { icon: React.ReactNode; k: string; v: string }) {
  return (
    <div className="bg-muted/40 rounded p-2">
      <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-foreground/50">{icon} {k}</div>
      <div className="mt-1 text-foreground truncate">{v}</div>
    </div>
  );
}
function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="border border-border rounded p-2">
      <div className="text-[9px] font-mono uppercase text-foreground/50">{k}</div>
      <div className="font-display italic text-sm">{v}</div>
    </div>
  );
}
