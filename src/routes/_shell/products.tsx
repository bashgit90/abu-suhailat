import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { PageHeader, Panel, StatusPill } from "@/components/erp/PageHeader";
import { FormDialog } from "@/components/erp/FormDialog";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useStore, genId } from "@/lib/store";
import type { Product } from "@/lib/mock-data";
import { Search, X, Trash2 } from "lucide-react";

const CAT_TINT: Record<string, string> = {
  Ulcer: "from-emerald-100 to-emerald-50",
  Typhoid: "from-sky-100 to-sky-50",
  Cold: "from-amber-100 to-amber-50",
  Pile: "from-purple-100 to-purple-50",
  Wellness: "from-teal-100 to-teal-50",
  Others: "from-stone-100 to-stone-50",
};
const CAT_EMOJI: Record<string, string> = { Ulcer: "🌿", Typhoid: "🧪", Cold: "💊", Pile: "🫙", Wellness: "🍯", Others: "🌱" };

export const Route = createFileRoute("/_shell/products")({
  head: () => ({ meta: [{ title: "Apothecary Catalog — Abu Suhailat ERP" }] }),
  component: ProductsPage,
});

function ProductsPage() {
  const products = useStore((s) => s.products);
  const addProduct = useStore((s) => s.addProduct);
  const removeProduct = useStore((s) => s.removeProduct);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<string>("All");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = products.filter(
    (p) =>
      (filter === "All" || p.category === filter) &&
      (p.name.toLowerCase().includes(q.toLowerCase()) || p.code.toLowerCase().includes(q.toLowerCase())),
  );

  const grouped = useMemo(() => {
    const map = new Map<string, Product[]>();
    for (const p of filtered) {
      const arr = map.get(p.category) ?? [];
      arr.push(p);
      map.set(p.category, arr);
    }
    return Array.from(map.entries());
  }, [filtered]);

  const sel = products.find((p) => p.id === selected);
  const cats = ["All", "Ulcer", "Typhoid", "Cold", "Pile", "Wellness", "Others"];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Catalog"
        title="Apothecary Catalog"
        description="Visual product catalog grouped by category. Tap a card for QR verification."
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
              { name: "retail", label: "Retail Price", type: "number", required: true },
              { name: "wholesale", label: "Wholesale Price", type: "number" },
              { name: "distributor", label: "Distributor Price", type: "number" },
              { name: "cost", label: "Production Cost", type: "number" },
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
                emoji: CAT_EMOJI[v.category] ?? "🌿",
              });
            }}
          />
        }
      />

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 justify-between">
        <div className="flex flex-wrap gap-1.5">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`text-[11px] font-mono uppercase tracking-wider px-3 py-1.5 rounded-full border transition ${
                filter === c
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground/60 border-border hover:text-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products…"
            className="w-full pl-9 pr-3 py-2 text-xs bg-card border border-border rounded-full focus:outline-none focus:ring-1 focus:ring-accent/40"
          />
        </div>
      </div>

      {grouped.length === 0 && (
        <div className="text-center py-16 text-sm text-muted-foreground">No products match your filters.</div>
      )}

      {grouped.map(([cat, items]) => (
        <section key={cat} className="space-y-3">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display italic text-xl">
              {CAT_EMOJI[cat]} {cat}
            </h2>
            <span className="text-[10px] font-mono uppercase text-foreground/40">{items.length} item{items.length === 1 ? "" : "s"}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {items.map((p) => (
              <ProductCard key={p.id} p={p} onOpen={() => setSelected(p.id)} onDelete={() => removeProduct(p.id)} />
            ))}
          </div>
        </section>
      ))}

      <Dialog open={!!sel} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-md p-0 overflow-hidden">
          {sel && <ProductDetail p={sel} onClose={() => setSelected(null)} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ProductCard({ p, onOpen, onDelete }: { p: Product; onOpen: () => void; onDelete: () => void }) {
  return (
    <div className="group relative bg-card border border-border rounded-lg overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition">
      <button onClick={onOpen} className="block w-full text-left">
        <div className={`aspect-square bg-gradient-to-br ${CAT_TINT[p.category] ?? CAT_TINT.Others} grid place-items-center text-5xl md:text-6xl`}>
          {p.emoji ?? "🌿"}
        </div>
        <div className="p-3 space-y-1">
          <div className="text-[10px] font-mono uppercase text-foreground/40 tracking-wider">{p.code}</div>
          <div className="font-display italic text-sm leading-tight line-clamp-2">{p.name}</div>
          <div className="flex items-center justify-between pt-1">
            <span className="font-mono text-xs text-primary">SAR {p.retail.toLocaleString()}</span>
            <StatusPill tone={p.status === "In Stock" ? "good" : p.status === "Low" ? "warn" : "bad"}>{p.status}</StatusPill>
          </div>
          <div className="text-[10px] text-foreground/50 font-mono">{p.stock} in stock</div>
        </div>
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onDelete(); }}
        className="absolute top-2 right-2 size-7 grid place-items-center rounded-full bg-white/80 backdrop-blur text-foreground/40 hover:text-destructive opacity-0 group-hover:opacity-100 transition"
        aria-label="Delete"
      >
        <Trash2 className="size-3.5" />
      </button>
    </div>
  );
}

function ProductDetail({ p, onClose }: { p: Product; onClose: () => void }) {
  return (
    <div className="relative">
      <button onClick={onClose} className="absolute top-3 right-3 size-7 grid place-items-center rounded-full bg-white/80 z-10" aria-label="Close">
        <X className="size-3.5" />
      </button>
      <div className={`aspect-[2/1] bg-gradient-to-br ${CAT_TINT[p.category] ?? CAT_TINT.Others} grid place-items-center text-7xl`}>{p.emoji ?? "🌿"}</div>
      <div className="p-5 space-y-3">
        <div>
          <div className="text-[10px] font-mono uppercase text-foreground/40 tracking-wider">{p.code}</div>
          <h3 className="font-display italic text-2xl mt-1">{p.name}</h3>
          <StatusPill tone={p.status === "In Stock" ? "good" : p.status === "Low" ? "warn" : "bad"}>{p.status}</StatusPill>
        </div>
        <div className="bg-beige-warm/60 p-3 rounded flex items-center justify-center">
          <QRCodeSVG value={`https://verify.abusuhailat.com/${p.code}/${p.batch}`} size={120} fgColor="#0F3D2E" level="H" />
        </div>
        <dl className="text-xs grid grid-cols-2 gap-2 font-mono">
          <Cell k="Category" v={p.category} />
          <Cell k="Batch" v={p.batch} />
          <Cell k="Stock" v={`${p.stock}`} />
          <Cell k="Retail" v={`SAR ${p.retail.toLocaleString()}`} />
          <Cell k="Wholesale" v={`SAR ${p.wholesale.toLocaleString()}`} />
          <Cell k="Cost" v={`SAR ${p.cost.toLocaleString()}`} />
          <Cell k="Produced" v={p.produced} />
          <Cell k="Expires" v={p.expires} />
        </dl>
        <div className="border-t border-border pt-3 text-xs space-y-2">
          <div><span className="text-foreground/50 font-mono uppercase text-[10px]">Ingredients</span><p className="mt-1">{p.ingredients}</p></div>
          <div><span className="text-foreground/50 font-mono uppercase text-[10px]">Usage</span><p className="mt-1">{p.usage}</p></div>
        </div>
      </div>
    </div>
  );
}

function Cell({ k, v }: { k: string; v: string }) {
  return (
    <div className="bg-muted/40 rounded p-2">
      <div className="text-[9px] text-foreground/50 uppercase">{k}</div>
      <div className="text-foreground">{v}</div>
    </div>
  );
}
