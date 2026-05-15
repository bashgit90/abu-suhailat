import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel } from "@/components/erp/PageHeader";
import { useStore } from "@/lib/store";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/_shell/settings")({
  head: () => ({ meta: [{ title: "Settings — Abu Suhailat ERP" }] }),
  component: Page,
});

function Page() {
  const user = useStore((s) => s.user);
  const [name, setName] = useState(user.name);
  const [role, setRole] = useState(user.role);

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="System" title="Workspace Settings" description="Manage company profile, team and preferences." />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel title="Profile">
          <form
            onSubmit={(e) => { e.preventDefault(); toast.success("Profile saved"); }}
            className="p-6 space-y-4"
          >
            <div>
              <Label className="text-xs font-mono uppercase">Display Name</Label>
              <Input className="mt-1.5 rounded-sm" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <Label className="text-xs font-mono uppercase">Role</Label>
              <Input className="mt-1.5 rounded-sm" value={role} onChange={(e) => setRole(e.target.value)} />
            </div>
            <Button type="submit" size="sm" className="rounded-sm">Save Changes</Button>
          </form>
        </Panel>
        <Panel title="Company">
          <form onSubmit={(e) => { e.preventDefault(); toast.success("Company info updated"); }} className="p-6 space-y-4">
            <div>
              <Label className="text-xs font-mono uppercase">Company Name</Label>
              <Input className="mt-1.5 rounded-sm" defaultValue="Abu Suhailat Traditional Medicine" />
            </div>
            <div>
              <Label className="text-xs font-mono uppercase">Address</Label>
              <Input className="mt-1.5 rounded-sm" defaultValue="Kano, Nigeria" />
            </div>
            <div>
              <Label className="text-xs font-mono uppercase">Currency</Label>
              <Input className="mt-1.5 rounded-sm" defaultValue="₦ Nigerian Naira" />
            </div>
            <Button type="submit" size="sm" className="rounded-sm">Update</Button>
          </form>
        </Panel>
        <Panel title="Security" className="lg:col-span-2">
          <form onSubmit={(e) => { e.preventDefault(); toast.success("Password updated"); }} className="p-6 grid md:grid-cols-3 gap-4">
            <div>
              <Label className="text-xs font-mono uppercase">Current Password</Label>
              <Input type="password" className="mt-1.5 rounded-sm" />
            </div>
            <div>
              <Label className="text-xs font-mono uppercase">New Password</Label>
              <Input type="password" className="mt-1.5 rounded-sm" />
            </div>
            <div>
              <Label className="text-xs font-mono uppercase">Confirm</Label>
              <Input type="password" className="mt-1.5 rounded-sm" />
            </div>
            <div className="md:col-span-3"><Button type="submit" size="sm" className="rounded-sm">Update Password</Button></div>
          </form>
        </Panel>
      </div>
    </div>
  );
}
