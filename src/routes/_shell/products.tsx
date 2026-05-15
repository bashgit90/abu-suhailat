import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { PageHeader, Panel, StatusPill } from "@/components/erp/PageHeader";
import { DataTable } from "@/components/erp/DataTable";
import { FormDialog } from "@/components/erp/FormDialog";
import { useStore, genId } from "@/lib/store";
import { Search } from "lucide-react";

export const Route = createFileRoute("/_shell/products")({
  head: () => ({ meta: [{ title: "Apothecary Catalog — Abu Suhailat ERP" }] }),
  component: ProductsPage,
});

function ProductsPage() {
  const products = useStore((s) => s.products);
  const addProduct = useStore((s) => s.addProduct);
  const removeProduct = useStore((s) => s.removeProduct);
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = products.filter(
    (p) => p.name.toLowerCase().includes(q.toLowerCase()) || p.code.toLowerCase().includes(q.toLowerCase()),
  );
  const sel = products.find((p) => p.id === selected) ?? products[0];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Catalog"
        title="Apothecary Catalog"
        description="Every product carries a verified QR code linked to its production batch."
        actions={
          <FormDialog
            title="Add New Product"
            triggerLabel="New Product"
            fields={[
              { name: "code", label: "Product Code", required: true, placeholder: "AS-XXX-000" },
              { name: "name", label: "Name", required: true },
              { name: "category", label: "Category", type: "select", options: ["Ulcer", "Typhoid", "Cold", "Pile", "Wellness", "Others"], required: true },
              { name: "stock", label: "Initial Stock", type: "number", required: true },
              { name: "minStock", label: "Min Stock Threshold", type: "number", defaultValue: 50 },
              { name: "retail", label: "Retail Price (₦)", type: "number", required: true },
              { name: "wholesale", label: "Wholesale Price (₦)", type: "number" },
              { name: "distributor", label: "Distributor Price (₦)", type: "number" },
              { name: "cost", label: "Production Cost (₦)", type: "number" },
              { name: "ingredients", label: "Ingredients", type: "textarea" },
              { name: "usage", label: "Usage Instructions", type: "textarea" },
            ]}
            onSubmit={(v: any) => {
              const stock = Number(v.stock) || 0;
              const min = Number(v.minStock) || 50;
              addProduct({
                id: genId("as").toLowerCase(),
                code: v.code,
                name: v.name,
                category: v.category,
                batch: `BT-${Math.floor(Math.random() * 9000 + 1000)}`,
                stock,
                minStock: min,
                retail: Number(v.retail) || 0,
                wholesale: Number(v.wholesale) || 0,
                distributor: Number(v.distributor) || 0,
                cost: Number(v.cost) || 0,
                produced: new Date().toISOString().slice(0, 10),
                expires: new Date(Date.now() + 365 * 86400000).toISOString().slice(0, 10),
                status: stock === 0 ? "Out" : stock < min ? "Low" : "In Stock",
                ingredients: v.ingredients,
                usage: v.usage,
              });
            }}
          />
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6">
        <Panel
          title="All Products"
          meta={
            <div className="relative w-44">
              <Search className="size-3 absolute left-2 top-1/2 -translate-y-1/2 text-foreground/40" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search…"
                className="w-full pl-7 pr-2 py-1 text-[11px] bg-background border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-accent/40"
              />
            </div>
          }
        >
          <DataTable
            rowKey={(r) => r.id}
            rows={filtered}
            onDelete={(r) => removeProduct(r.id)}
            columns={[
              { key: "code", header: "Code", render: (r) => <span className="font-mono text-xs cursor-pointer" onClick={() => setSelected(r.id)}>{r.code}</span> },
              { key: "name", header: "Name", render: (r) => <span className="font-display italic cursor-pointer" onClick={() => setSelected(r.id)}>{r.name}</span> },
              { key: "category", header: "Cat.", render: (r) => <span className="text-xs text-foreground/60">{r.category}</span> },
              { key: "stock", header: "Stock", render: (r) => <span className="font-mono text-xs">{r.stock}</span> },
              { key: "retail", header: "Retail", render: (r) => <span className="font-mono text-xs">₦{r.retail.toLocaleString()}</span> },
              {
                key: "status", header: "Status",
                render: (r) => <StatusPill tone={r.status === "In Stock" ? "good" : r.status === "Low" ? "warn" : "bad"}>{r.status}</StatusPill>,
              },
            ]}
          />
        </Panel>

        {sel && (
          <Panel title="Product Detail · QR Verify" meta={sel.batch}>
            <div className="p-5 space-y-4">
              <div>
                <div className="text-xs text-foreground/50 font-mono uppercase tracking-wider">{sel.code}</div>
                <h3 className="font-display italic text-xl mt-1">{sel.name}</h3>
              </div>
              <div className="bg-beige-warm p-4 rounded-sm flex items-center justify-center">
                <QRCodeSVG
                  value={`https://verify.abusuhailat.com/${sel.code}/${sel.batch}`}
                  size={140}
                  fgColor="#0F3D2E"
                  level="H"
                />
              </div>
              <dl className="text-xs space-y-2 font-mono">
                <div className="flex justify-between"><dt className="text-foreground/50">Category</dt><dd>{sel.category}</dd></div>
                <div className="flex justify-between"><dt className="text-foreground/50">Stock</dt><dd>{sel.stock} units</dd></div>
                <div className="flex justify-between"><dt className="text-foreground/50">Retail</dt><dd>₦{sel.retail.toLocaleString()}</dd></div>
                <div className="flex justify-between"><dt className="text-foreground/50">Wholesale</dt><dd>₦{sel.wholesale.toLocaleString()}</dd></div>
                <div className="flex justify-between"><dt className="text-foreground/50">Cost</dt><dd>₦{sel.cost.toLocaleString()}</dd></div>
                <div className="flex justify-between"><dt className="text-foreground/50">Expires</dt><dd>{sel.expires}</dd></div>
              </dl>
              <div className="text-xs space-y-2 border-t border-border pt-3">
                <div><span className="text-foreground/50 uppercase tracking-wider font-mono text-[10px]">Ingredients</span><p className="mt-1">{sel.ingredients}</p></div>
                <div><span className="text-foreground/50 uppercase tracking-wider font-mono text-[10px]">Usage</span><p className="mt-1">{sel.usage}</p></div>
              </div>
            </div>
          </Panel>
        )}
      </div>
    </div>
  );
}
