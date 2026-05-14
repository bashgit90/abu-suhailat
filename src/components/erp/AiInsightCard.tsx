import { Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { aiPrompts } from "@/lib/mock-data";

export function AiInsightCard() {
  return (
    <div className="bg-primary text-primary-foreground p-7 relative overflow-hidden animate-ledger-in">
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <div className="size-28 border border-current rotate-45" />
        <div className="size-20 border border-current rotate-45 absolute top-8 right-8" />
      </div>
      <div className="relative z-10 space-y-5">
        <div className="flex items-center gap-2">
          <Sparkles className="size-3.5 text-accent" />
          <h3 className="text-[10px] font-mono uppercase tracking-widest">AI Intelligence Panel</h3>
        </div>
        <div className="p-4 bg-white/5 border border-white/10 rounded-sm">
          <p className="text-[10px] opacity-60 mb-2 font-mono uppercase tracking-wider">Question</p>
          <p className="text-sm italic font-display">"Predict next month sales trends for Ulcer Tonic."</p>
        </div>
        <div className="p-4 bg-accent/10 border-l-2 border-accent rounded-sm">
          <p className="text-[10px] text-accent mb-2 font-mono uppercase tracking-wider">AI Response</p>
          <p className="text-sm leading-relaxed text-primary-foreground/85">
            Based on rainfall data and distributor cycles in the North, we predict a{" "}
            <span className="text-accent font-medium">14% surge</span> in demand. Recommended production
            increase: <span className="text-accent font-medium">2,500 units</span>.
          </p>
        </div>
        <div className="space-y-1.5">
          <p className="text-[10px] font-mono uppercase tracking-wider opacity-50">Suggested prompts</p>
          {aiPrompts.slice(0, 3).map((p) => (
            <button key={p} className="block w-full text-left text-xs px-3 py-2 border border-white/10 hover:border-accent/40 hover:bg-white/5 transition-colors rounded-sm">
              {p}
            </button>
          ))}
        </div>
        <Link to="/ai" className="block text-center w-full py-2.5 border border-accent/40 text-accent text-[10px] font-mono uppercase tracking-widest hover:bg-accent hover:text-primary transition-colors">
          Open Full Assistant
        </Link>
      </div>
    </div>
  );
}