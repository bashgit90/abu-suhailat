import { Printer, Share2, X, FileText, Mail, Phone, Globe, Crown } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { StatusPill } from "./PageHeader";
import type { Invoice } from "@/lib/store";

const CATEGORY_TONE: Record<string, string> = {
  Ulcer: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Typhoid: "bg-blue-50 text-blue-700 border-blue-200",
  Cold: "bg-amber-50 text-amber-700 border-amber-200",
  Pile: "bg-purple-50 text-purple-700 border-purple-200",
  Wellness: "bg-teal-50 text-teal-700 border-teal-200",
  Others: "bg-muted text-foreground/60 border-border",
};

export function InvoiceView({ inv, onClose }: { inv: Invoice; onClose: () => void }) {
  const items = (inv as any).items as Array<{ product: string; desc: string; category: string; qty: number; unit: string; price: number; discount: number }> | undefined;
  const rows = items?.length
    ? items
    : [{ product: "Herbal medicine order", desc: inv.type, category: "Others", qty: 1, unit: "Lot", price: inv.amount, discount: 0 }];

  const subtotal = rows.reduce((s, r) => s + r.qty * r.price, 0);
  const discount = rows.reduce((s, r) => s + r.qty * r.price * (r.discount / 100), 0);
  const vat = (subtotal - discount) * 0.15;
  const grand = subtotal - discount + vat;
  const overall = subtotal ? Math.round((discount / subtotal) * 100) : 0;

  const phone = (inv as any).phone ?? "+966 55 123 4567";
  const address = (inv as any).address ?? "—";

  const shareWA = () => {
    const text = `*Abu Suhailat ERP — Invoice ${inv.no}*%0ACustomer: ${inv.customer}%0AStatus: ${inv.status}%0ATotal: SAR ${grand.toFixed(2)}%0ADate: ${inv.date}`;
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <div className="bg-white text-ink relative">
      <div className="sticky top-0 z-10 flex items-center justify-end gap-2 p-3 bg-white/95 backdrop-blur border-b border-border print:hidden">
        <button onClick={shareWA} className="flex items-center gap-1.5 text-xs font-medium bg-[#25D366] text-white px-3 py-1.5 rounded-full hover:opacity-90">
          <Share2 className="size-3.5" /> WhatsApp
        </button>
        <button onClick={() => window.print()} className="flex items-center gap-1.5 text-xs font-medium bg-primary text-primary-foreground px-3 py-1.5 rounded-full hover:opacity-90">
          <Printer className="size-3.5" /> Print
        </button>
        <button onClick={onClose} className="size-7 grid place-items-center rounded-full border border-border" aria-label="Close">
          <X className="size-3.5" />
        </button>
      </div>

      <div className="p-6 md:p-10">
        {/* Header */}
        <div className="grid md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-1 flex items-start gap-3">
            <div className="size-14 rounded bg-accent/20 grid place-items-center text-2xl">🌿</div>
            <div>
              <div className="font-display italic text-2xl text-primary leading-none">Abu Suhailat ERP</div>
              <div className="text-xs text-foreground/60 mt-1">Traditional Medicine Enterprise<br/>Management Platform</div>
            </div>
          </div>
          <div className="md:col-span-1 text-center hidden md:block">
            <div className="font-display italic text-accent text-3xl">۝</div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-accent mt-1">Abu Suhailat</div>
            <div className="text-[9px] font-mono uppercase tracking-wider text-foreground/40">Herbal Solutions</div>
          </div>
          <div className="md:col-span-1 text-right">
            <div className="font-display italic text-3xl md:text-4xl text-primary">INVOICE</div>
            <div className="mt-2 inline-block border border-border rounded px-3 py-1 font-mono text-sm text-primary">{inv.no}</div>
            <div className="mt-2 space-y-0.5 text-xs">
              <div className="text-foreground/60">Date <span className="text-foreground">: {inv.date}</span></div>
              <div className="text-foreground/60">Time <span className="text-foreground">: 10:45 AM</span></div>
              <div className="flex items-center justify-end gap-2 mt-1">
                <span className="text-foreground/60">Status :</span>
                <StatusPill tone={inv.status === "Paid" ? "good" : inv.status === "Pending" || inv.status === "Partial" ? "warn" : "bad"}>{inv.status}</StatusPill>
              </div>
            </div>
          </div>
        </div>

        <div className="text-xs text-foreground/60 mt-4 space-y-0.5">
          <div className="font-medium text-foreground">Abu Suhailat Traditional Medicine Enterprise</div>
          <div>Al-Madina Street, Riyadh</div>
          <div>Saudi Arabia – 12611</div>
          <div className="flex items-center gap-1.5 pt-1"><Phone className="size-3" /> +966 55 123 4567</div>
          <div className="flex items-center gap-1.5"><Mail className="size-3" /> info@abusuhailaterp.com</div>
          <div className="flex items-center gap-1.5"><Globe className="size-3" /> www.abusuhailaterp.com</div>
        </div>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
          <div className="text-accent">◆</div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        </div>

        {/* Bill to / details */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border border-border rounded-lg p-4">
            <div className="text-[10px] font-mono uppercase tracking-widest text-foreground/50">BILL TO</div>
            <div className="mt-2 flex items-start gap-3">
              <div className="size-12 rounded-full bg-accent/15 grid place-items-center text-xl shrink-0">👤</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="font-display italic text-lg">{inv.customer}</div>
                  <span className="inline-flex items-center gap-1 text-[9px] font-mono uppercase bg-accent text-accent-foreground px-1.5 py-0.5 rounded">
                    <Crown className="size-2.5" /> VIP
                  </span>
                </div>
                <div className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 rounded px-1.5 py-0.5 inline-block mt-1">{inv.type} Customer</div>
                <div className="text-xs text-foreground/60 mt-1.5 flex items-center gap-1.5"><Phone className="size-3" /> {phone}</div>
                <div className="text-xs text-foreground/60">📍 {address}</div>
              </div>
            </div>
          </div>
          <div className="border border-border rounded-lg p-4">
            <div className="text-[10px] font-mono uppercase tracking-widest text-foreground/50 flex items-center gap-1.5"><FileText className="size-3" /> OTHER DETAILS</div>
            <dl className="mt-2 text-xs space-y-1.5">
              <Row k="Customer ID" v={`CUS-${inv.no.slice(-5)}`} />
              <Row k="Customer Type" v={inv.type} />
              <Row k="Payment Terms" v="Net 7 Days" />
              <Row k="Due Date" v="Jun 02, 2026 (7 Days)" />
              <Row k="Sales Executive" v="Hakeem Abdullah" />
            </dl>
          </div>
        </div>

        {/* Items table */}
        <div className="mt-5 border border-border rounded-lg overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-primary text-primary-foreground">
              <tr>
                {["#", "PRODUCT", "CATEGORY", "QTY", "UNIT PRICE", "DISCOUNT", "TOTAL"].map((h) => (
                  <th key={h} className="px-3 py-2.5 text-left font-mono tracking-wider text-[10px] uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((r, i) => {
                const total = r.qty * r.price * (1 - r.discount / 100);
                return (
                  <tr key={i} className="bg-white">
                    <td className="px-3 py-3 text-foreground/60">{i + 1}</td>
                    <td className="px-3 py-3">
                      <div className="font-medium">{r.product}</div>
                      <div className="text-foreground/50 text-[10px]">{r.desc}</div>
                    </td>
                    <td className="px-3 py-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded border ${CATEGORY_TONE[r.category] ?? CATEGORY_TONE.Others}`}>{r.category}</span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="font-medium">{r.qty}</div>
                      <div className="text-foreground/50 text-[10px]">{r.unit}</div>
                    </td>
                    <td className="px-3 py-3 font-mono">SAR {r.price.toFixed(2)}</td>
                    <td className="px-3 py-3"><span className={r.discount > 0 ? "text-emerald-700" : "text-foreground/40"}>{r.discount}%</span></td>
                    <td className="px-3 py-3 font-mono font-medium">SAR {total.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="grid md:grid-cols-2 gap-4 mt-5">
          <div className="border border-border rounded-lg p-4 text-xs">
            <div className="text-[10px] font-mono uppercase tracking-widest text-foreground/50">AMOUNT IN WORDS</div>
            <p className="italic text-foreground/80 mt-2">{numberToWords(grand)} Riyals Only.</p>
            <div className="text-[10px] font-mono uppercase tracking-widest text-foreground/50 mt-4 flex items-center gap-1.5"><FileText className="size-3" /> NOTE</div>
            <p className="text-foreground/70 mt-2">Thank you for choosing Abu Suhailat Traditional Medicine. We appreciate your business and trust in our products.</p>
            <div className="flex items-end gap-6 mt-6">
              <div className="font-display italic text-2xl text-foreground/70">H. Abdullah</div>
              <div className="size-16 rounded-full border-2 border-accent/60 grid place-items-center text-[9px] text-center text-accent leading-tight font-mono">ABU<br/>SUHAILAT<br/>SEAL</div>
            </div>
            <div className="text-xs mt-2">
              <div className="font-medium">Hakeem Abdullah</div>
              <div className="text-foreground/50">Authorized Signature</div>
            </div>
          </div>
          <div className="border border-border rounded-lg p-4 bg-beige-warm/40">
            <Total k="Subtotal" v={`SAR ${subtotal.toFixed(2)}`} />
            <Total k={`Discount (Overall ${overall}%)`} v={`- SAR ${discount.toFixed(2)}`} tone="emerald" />
            <Total k="VAT (15%)" v={`SAR ${vat.toFixed(2)}`} />
            <div className="h-px bg-border my-3" />
            <div className="flex items-center justify-between">
              <span className="font-medium">GRAND TOTAL</span>
              <span className="font-display italic text-3xl text-accent">SAR {grand.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="grid md:grid-cols-3 gap-4 mt-5 border-t border-border pt-4 text-xs">
          <div>
            <div className="font-medium flex items-center gap-1.5"><FileText className="size-3.5" /> PAYMENT INFORMATION</div>
            <dl className="mt-2 space-y-1 font-mono text-[11px]">
              <Row k="Bank Name" v="Al Rajhi Bank" />
              <Row k="Account Name" v="Abu Suhailat Enterprise" />
              <Row k="IBAN" v="SA12 8000 0123 4567 8901 2345" />
              <Row k="SWIFT / BIC" v="RJHISARI" />
            </dl>
          </div>
          <div>
            <div className="font-medium">PAYMENT METHODS</div>
            <div className="flex items-center justify-around mt-3 text-center text-[10px]">
              <div>🏦<div className="mt-1">Bank Transfer</div></div>
              <div>💳<div className="mt-1">Credit / Debit<br/>Card</div></div>
              <div>💵<div className="mt-1">Cash on<br/>Delivery</div></div>
            </div>
          </div>
          <div>
            <div className="font-medium">INVOICE VERIFICATION</div>
            <div className="flex items-center gap-3 mt-2">
              <div className="bg-white p-1 border border-border rounded">
                <QRCodeSVG value={`https://verify.abusuhailaterp.com/${inv.no}`} size={70} fgColor="#0F3D2E" level="M" />
              </div>
              <div className="text-foreground/60 text-[11px]">Scan the QR code to verify this invoice</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-emerald-deep text-accent text-center py-3 text-[11px] font-mono uppercase tracking-[0.25em]">
        Traditional Wisdom. Modern Solutions. 🌿
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-foreground/55">{k}</dt>
      <dd className="text-foreground/90 font-medium text-right">{v}</dd>
    </div>
  );
}

function Total({ k, v, tone }: { k: string; v: string; tone?: "emerald" }) {
  return (
    <div className="flex justify-between text-sm py-1">
      <span className="text-foreground/70">{k}</span>
      <span className={tone === "emerald" ? "text-emerald-700 font-medium" : "font-medium"}>{v}</span>
    </div>
  );
}

function numberToWords(n: number) {
  // Compact word output for invoice "amount in words"
  const fixed = n.toFixed(2);
  return `Approximately ${fixed.split(".")[0]} and ${fixed.split(".")[1]}/100`;
}
