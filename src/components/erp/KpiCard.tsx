import { motion } from "framer-motion";

export function KpiCard({
  label,
  value,
  delta,
  sub,
  tone = "gold",
  index = 0,
}: {
  label: string;
  value: string;
  delta?: string;
  sub?: string;
  tone?: "gold" | "emerald";
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.19, 1, 0.22, 1] }}
      className={`bg-card p-6 shadow-sm border border-border border-t-2 ${
        tone === "gold" ? "border-t-accent" : "border-t-primary"
      }`}
    >
      <p className="text-[10px] font-mono uppercase tracking-widest text-foreground/40 mb-2">{label}</p>
      <h3 className="text-3xl font-display italic tracking-tight">{value}</h3>
      <div className="flex items-center justify-between mt-3 text-[10px] font-mono">
        {delta && <span className="text-primary/70">{delta}</span>}
        {sub && <span className="text-foreground/40">{sub}</span>}
      </div>
    </motion.div>
  );
}