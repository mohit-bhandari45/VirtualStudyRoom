"use client";

import { useEffect, useState } from "react";
import { AppSidebar } from "./AuthComponents/Sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { Separator } from "@radix-ui/react-separator";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const token = sessionStorage.getItem("token")!;
    setToken(token);
  }, []);

  return (
    <>
      {token ? (
        <div className="flex min-h-screen">
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className="flex h-14 shrink-0 items-center gap-2">
                <div className="flex flex-1 items-center gap-2 px-3">
                  <SidebarTrigger />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                </div>
              </header>
            </SidebarInset>
          </SidebarProvider>
          <main className="flex-grow p-4">{children}</main>
        </div>
      ) : (
        children
      )}
    </>
  );
}
