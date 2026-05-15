import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, StatusPill } from "@/components/erp/PageHeader";
import { Download, FileText } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_shell/reports")({
  head: () => ({ meta: [{ title: "Reports — Abu Suhailat ERP" }] }),
  component: Page,
});

const reports = [
  { name: "Monthly Sales Report", period: "May 2026", type: "PDF", status: "Ready" },
  { name: "Inventory Audit", period: "Q2 2026", type: "XLSX", status: "Ready" },
  { name: "Payroll Statement", period: "May 2026", type: "PDF", status: "Pending" },
  { name: "Production Yield Analysis", period: "Apr 2026", type: "PDF", status: "Ready" },
  { name: "Customer Growth Report", period: "YTD", type: "XLSX", status: "Ready" },
  { name: "Tax Filing Summary", period: "Q1 2026", type: "PDF", status: "Ready" },
];

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Archives" title="Reports Center" description="Export PDF / Excel summaries across all modules." />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {reports.map((r) => (
          <Panel key={r.name} title={r.name} meta={r.type}>
            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-sm bg-primary/10 text-primary grid place-items-center">
                    <FileText className="size-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-foreground/50">{r.period}</div>
                    <StatusPill tone={r.status === "Ready" ? "good" : "warn"}>{r.status}</StatusPill>
                  </div>
                </div>
              </div>
              <button
                onClick={() => toast.success(`Generating ${r.name}…`)}
                className="w-full text-xs flex items-center justify-center gap-1.5 px-3 py-2 bg-primary text-primary-foreground rounded-sm hover:bg-emerald-forest transition"
              >
                <Download className="size-3.5" /> Export
              </button>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}
