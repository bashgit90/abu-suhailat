import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Send } from "lucide-react";
import { PageHeader, Panel } from "@/components/erp/PageHeader";
import { aiPrompts } from "@/lib/mock-data";

export const Route = createFileRoute("/_shell/ai")({ component: AiPage });

function AiPage() {
  const [msgs, setMsgs] = useState([
    { role: "ai", text: "As-salāmu ʿalaykum. I'm your Abu Suhailat intelligence layer — ask about revenue, batches, customers, or generate marketing copy." },
  ]);
  const [input, setInput] = useState("");
  const send = (t: string) => {
    if (!t.trim()) return;
    setMsgs((m) => [...m, { role: "user", text: t }, { role: "ai", text: `Analyzing "${t}"… Based on the last 30 days, here is a synthesized insight with predictive context.` }]);
    setInput("");
  };
  return (
    <div>
      <PageHeader eyebrow="Conversational Intelligence" title="AI Assistant" description="Ask business questions, predict demand, generate marketing copy and reports." />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Panel title="Conversation" meta="Live model" className="lg:col-span-2">
          <div className="p-6 space-y-4 max-h-[520px] overflow-y-auto">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] p-4 text-sm leading-relaxed border ${m.role === "user" ? "bg-primary text-primary-foreground border-primary" : "bg-muted/40 border-border"}`}>
                  {m.role === "ai" && <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase mb-2 text-accent"><Sparkles className="size-3" /> AI</div>}
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-border p-4 flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send(input)} placeholder="Ask anything…" className="flex-1 px-4 py-2.5 bg-muted/40 border border-border text-sm focus:outline-none focus:ring-1 focus:ring-accent/40" />
            <button onClick={() => send(input)} className="px-4 bg-primary text-primary-foreground text-xs font-mono uppercase tracking-wider hover:bg-emerald-forest"><Send className="size-3.5" /></button>
          </div>
        </Panel>
        <Panel title="Suggested Prompts" meta="Curated">
          <div className="p-4 space-y-2">
            {aiPrompts.map((p) => (
              <button key={p} onClick={() => send(p)} className="block w-full text-left text-xs px-3 py-2.5 border border-border hover:border-accent/50 hover:bg-muted/40 transition-colors rounded-sm">{p}</button>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}