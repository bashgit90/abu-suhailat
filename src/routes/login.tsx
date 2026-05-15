import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign In — Abu Suhailat ERP" }] }),
  component: Login,
});

function Login() {
  const nav = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("surajo@abusuhailat.com");
  const [otp, setOtp] = useState("");

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="hidden lg:flex bg-sidebar text-sidebar-foreground relative overflow-hidden p-12 flex-col justify-between">
        <div className="absolute inset-0 geo-watermark opacity-10" />
        <div className="relative">
          <div className="font-display italic text-4xl text-sidebar-primary">Abu Suhailat</div>
          <div className="text-[10px] uppercase tracking-[0.3em] opacity-50 mt-2 font-mono">Enterprise ERP v4.0</div>
        </div>
        <div className="relative space-y-6">
          <p className="font-display italic text-2xl leading-snug max-w-md">"Heritage medicine, illuminated by intelligent operations."</p>
          <div className="flex gap-6 text-xs opacity-70">
            <span className="flex items-center gap-1.5"><ShieldCheck className="size-4" /> Secure</span>
            <span className="flex items-center gap-1.5"><Sparkles className="size-4" /> AI Powered</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-sm space-y-6 animate-ledger-in">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent/80 mb-2">The Illuminated Ledger</div>
            <h1 className="text-3xl font-display italic">Welcome back</h1>
            <p className="text-sm text-muted-foreground mt-1">Sign in to continue your enterprise session.</p>
          </div>
          {step === 1 ? (
            <form onSubmit={(e) => { e.preventDefault(); setStep(2); toast.info("OTP sent · use 123456"); }} className="space-y-4">
              <div>
                <Label className="text-xs font-mono uppercase">Email</Label>
                <Input className="mt-1.5 rounded-sm" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <Label className="text-xs font-mono uppercase">Password</Label>
                <Input type="password" className="mt-1.5 rounded-sm" defaultValue="demo" required />
              </div>
              <Button className="w-full rounded-sm" type="submit">Continue</Button>
            </form>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); toast.success("Signed in"); nav({ to: "/" }); }} className="space-y-4">
              <div>
                <Label className="text-xs font-mono uppercase">One-time code</Label>
                <Input className="mt-1.5 rounded-sm tracking-[0.5em] text-center font-mono" placeholder="••••••" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} />
                <p className="text-[10px] text-muted-foreground mt-1 font-mono">Hint · 123456</p>
              </div>
              <Button className="w-full rounded-sm" type="submit">Verify & Sign In</Button>
              <button type="button" onClick={() => setStep(1)} className="text-xs text-muted-foreground hover:text-foreground">← Back</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
