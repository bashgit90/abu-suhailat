import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Sidebar } from "@/components/erp/Sidebar";
import { Topbar } from "@/components/erp/Topbar";
import { AiRail } from "@/components/erp/AiRail";

export const Route = createFileRoute("/_shell")({
  component: ShellLayout,
});

function ShellLayout() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 min-w-0 flex flex-col">
        <Topbar />
        <div className="flex-1 p-8 max-w-[1600px] w-full mx-auto">
          <Outlet />
        </div>
      </main>
      <AiRail />
    </div>
  );
}