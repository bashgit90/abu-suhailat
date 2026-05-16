import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Sidebar, SidebarProvider } from "@/components/erp/Sidebar";
import { Topbar } from "@/components/erp/Topbar";
import { AiRail } from "@/components/erp/AiRail";
import { MobileBottomNav } from "@/components/erp/MobileNav";

export const Route = createFileRoute("/_shell")({
  component: ShellLayout,
});

function ShellLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background text-foreground">
        <Sidebar />
        <main className="flex-1 min-w-0 flex flex-col">
          <Topbar />
          <div className="flex-1 p-4 md:p-8 pb-24 md:pb-8 max-w-[1600px] w-full mx-auto">
            <Outlet />
          </div>
        </main>
        <AiRail />
        <MobileBottomNav />
      </div>
    </SidebarProvider>
  );
}
