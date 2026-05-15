import { useState, type ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export type FieldDef = {
  name: string;
  label: string;
  type?: "text" | "number" | "select" | "textarea" | "date";
  options?: string[];
  placeholder?: string;
  required?: boolean;
  defaultValue?: string | number;
};

export function FormDialog<T extends Record<string, any>>({
  title,
  description,
  triggerLabel = "Add New",
  fields,
  onSubmit,
  trigger,
}: {
  title: string;
  description?: string;
  triggerLabel?: string;
  fields: FieldDef[];
  onSubmit: (values: T) => void;
  trigger?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Record<string, any>>(() =>
    Object.fromEntries(fields.map((f) => [f.name, f.defaultValue ?? ""])),
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    for (const f of fields) {
      if (f.required && !values[f.name]) {
        toast.error(`${f.label} is required`);
        return;
      }
    }
    onSubmit(values as T);
    toast.success(`${title.replace("Add ", "").replace("New ", "")} saved`);
    setOpen(false);
    setValues(Object.fromEntries(fields.map((f) => [f.name, f.defaultValue ?? ""])));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button size="sm" className="gap-1.5 rounded-sm">
            <Plus className="size-3.5" /> {triggerLabel}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display italic text-xl">{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          {fields.map((f) => (
            <div key={f.name} className="grid gap-1.5">
              <Label className="text-xs uppercase tracking-wider font-mono text-foreground/60">{f.label}</Label>
              {f.type === "select" ? (
                <select
                  value={values[f.name] ?? ""}
                  onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
                  className="h-9 rounded-sm border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent/40"
                >
                  <option value="">Select…</option>
                  {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : f.type === "textarea" ? (
                <textarea
                  value={values[f.name] ?? ""}
                  placeholder={f.placeholder}
                  onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
                  className="min-h-20 rounded-sm border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent/40"
                />
              ) : (
                <Input
                  type={f.type ?? "text"}
                  value={values[f.name] ?? ""}
                  placeholder={f.placeholder}
                  onChange={(e) =>
                    setValues((v) => ({
                      ...v,
                      [f.name]: f.type === "number" ? Number(e.target.value) : e.target.value,
                    }))
                  }
                  className="h-9 rounded-sm"
                />
              )}
            </div>
          ))}
          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" size="sm" className="rounded-sm" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm" className="rounded-sm">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
