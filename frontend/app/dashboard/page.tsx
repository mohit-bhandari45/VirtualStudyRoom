import { AppSidebar } from "@/components/AuthComponents/Sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

const DashBoard = () => {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
          {/* <div className="ml-auto px-3">
            <NavActions />
          </div> */}
        </header>
      </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default DashBoard;
