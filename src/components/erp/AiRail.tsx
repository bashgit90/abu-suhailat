import { Sparkles, MessageSquare, Activity, Wand2 } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function AiRail() {
  return (
    <div className="w-12 shrink-0 bg-card border-l border-border hidden lg:flex flex-col items-center py-6 gap-6 sticky top-0 h-screen">
      <Link
        to="/ai"
        className="size-9 rounded-full bg-accent/10 text-accent border border-accent/30 grid place-items-center font-mono text-[10px] italic animate-pulse-gold"
        aria-label="AI assistant"
      >
        <Sparkles className="size-4" />
      </Link>
      <div className="w-px h-12 bg-border" />
      <button className="size-7 grid place-items-center opacity-40 hover:opacity-100 transition-opacity" aria-label="Conversations">
        <MessageSquare className="size-4" strokeWidth={1.6} />
      </button>
      <button className="size-7 grid place-items-center opacity-40 hover:opacity-100 transition-opacity" aria-label="Activity">
        <Activity className="size-4" strokeWidth={1.6} />
      </button>
      <button className="size-7 grid place-items-center opacity-40 hover:opacity-100 transition-opacity" aria-label="Generate">
        <Wand2 className="size-4" strokeWidth={1.6} />
      </button>
    </div>
  );
}