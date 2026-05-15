import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, StatusPill } from "@/components/erp/PageHeader";
import { useStore } from "@/lib/store";
import { Check, Trash2 } from "lucide-react";

export const Route = createFileRoute("/_shell/notifications")({
  head: () => ({ meta: [{ title: "Notifications — Abu Suhailat ERP" }] }),
  component: Page,
});

function Page() {
  const notifs = useStore((s) => s.notifications);
  const mark = useStore((s) => s.markNotificationRead);
  const clear = useStore((s) => s.clearNotifications);
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="System"
        title="Notifications"
        description="System alerts, stock warnings and payment reminders."
        actions={
          <button onClick={clear} className="text-xs flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-sm hover:bg-muted">
            <Trash2 className="size-3.5" /> Clear All
          </button>
        }
      />
      <Panel title="Inbox" meta={`${notifs.length} unread`}>
        <ul className="divide-y divide-border">
          {notifs.length === 0 && <li className="p-10 text-center text-xs text-muted-foreground">All caught up.</li>}
          {notifs.map((n) => (
            <li key={n.id} className="px-6 py-4 flex items-center gap-4 hover:bg-muted/30">
              <StatusPill tone={n.tone as any}>{n.kind}</StatusPill>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-display italic truncate">{n.title}</div>
                <div className="text-[10px] font-mono text-foreground/40">{n.time}</div>
              </div>
              <button onClick={() => mark(n.id)} className="p-1.5 rounded-sm text-foreground/40 hover:text-primary hover:bg-primary/10" aria-label="Mark read">
                <Check className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
