"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

interface UserData {
  name?: string | null;
  email?: string | null;
  roles?: string[];
}

interface DashboardShellProps {
  children: React.ReactNode;
  user?: UserData | null;
}

export function DashboardShell({ children, user }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-dvh">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-1 flex-col">
        <Topbar
          onMenuToggle={() => setSidebarOpen((v) => !v)}
          user={user}
        />
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
