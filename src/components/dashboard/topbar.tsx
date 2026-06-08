"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface TopbarProps {
  onMenuToggle: () => void;
  user?: {
    name?: string | null;
    email?: string | null;
    roles?: string[];
  } | null;
}

export function Topbar({ onMenuToggle, user }: TopbarProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  const initials = user?.name
    ? user.name.charAt(0)
    : user?.email?.charAt(0).toUpperCase() ?? "?";

  const roleLabel = user?.roles?.length
    ? user.roles[0] === "SYSTEM_ADMIN"
      ? "مدير النظام"
      : user.roles[0]
    : "";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-zinc-200 bg-white px-4 lg:px-6">
      <button
        onClick={onMenuToggle}
        className="flex size-9 items-center justify-center rounded-lg text-brand-text-secondary hover:bg-zinc-100 lg:hidden"
        aria-label="Toggle sidebar"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="size-5">
          <path
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <div className="hidden items-center gap-2 lg:flex">
        <Image
          src="/logo.svg"
          alt="RAMSA"
          width={80}
          height={20}
          className="h-5 w-auto"
          priority
        />
        <span className="text-xs font-bold text-brand-primary">ERP</span>
      </div>

      <div className="flex flex-1 items-center justify-end gap-3">
        <div className="relative hidden sm:block">
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-brand-text-secondary"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            placeholder="بحث..."
            className="h-9 w-56 rounded-lg border border-zinc-300 bg-zinc-50 pe-3 ps-9 text-sm text-brand-text placeholder:text-brand-text-secondary focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
          />
        </div>

        <button className="relative flex size-9 items-center justify-center rounded-lg text-brand-text-secondary hover:bg-zinc-100">
          <svg viewBox="0 0 20 20" fill="currentColor" className="size-5">
            <path
              fillRule="evenodd"
              d="M10 2a6 6 0 0 0-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 0 0 .515 1.076 32.94 32.94 0 0 0 3.256.508 3.5 3.5 0 0 0 6.972 0 32.94 32.94 0 0 0 3.256-.508.75.75 0 0 0 .515-1.076A11.448 11.448 0 0 1 16 8a6 6 0 0 0-6-6Zm0 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="absolute -top-0.5 start-1/2 flex size-4 items-center justify-center rounded-full bg-brand-error text-[9px] text-white">
            3
          </span>
        </button>

        <div className="flex items-center gap-2 border-s border-zinc-200 ps-3">
          <div className="flex size-8 items-center justify-center rounded-full bg-brand-primary/10 text-sm font-medium text-brand-primary">
            {initials}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-brand-text">
              {user?.name ?? "مستخدم"}
            </p>
            <p className="text-xs text-brand-text-secondary">{roleLabel}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex size-9 items-center justify-center rounded-lg text-brand-text-secondary hover:bg-red-50 hover:text-brand-error"
          title="تسجيل الخروج"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="size-5">
            <path
              fillRule="evenodd"
              d="M17 4.25A2.25 2.25 0 0 0 14.75 2h-5.5A2.25 2.25 0 0 0 7 4.25v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 .75.75v11.5a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1-.75-.75v-2a.75.75 0 0 0-1.5 0v2A2.25 2.25 0 0 0 9.25 18h5.5A2.25 2.25 0 0 0 17 15.75V4.25Z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M1 10a.75.75 0 0 1 .75-.75h9.546l-1.048-.943a.75.75 0 1 1 1.004-1.114l2.5 2.25a.75.75 0 0 1 0 1.114l-2.5 2.25a.75.75 0 1 1-1.004-1.114l1.048-.943H1.75A.75.75 0 0 1 1 10Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
