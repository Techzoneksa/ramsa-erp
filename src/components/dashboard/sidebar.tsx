"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: "الرئيسية", href: "/dashboard", icon: <HomeIcon /> },
  { label: "الشحنات", href: "#", icon: <ShipmentIcon /> },
  { label: "طلبات الاستلام", href: "#", icon: <PickupIcon /> },
  { label: "الرحلات", href: "#", icon: <TripIcon /> },
  { label: "الفروع والمستودعات", href: "/dashboard/branches", icon: <BranchIcon /> },
  { label: "العملاء", href: "#", icon: <CustomerIcon /> },
  { label: "المركبات", href: "#", icon: <VehicleIcon /> },
  { label: "السائقون والمندوبون", href: "#", icon: <DriverIcon /> },
  { label: "التحصيلات", href: "#", icon: <CollectionIcon /> },
  { label: "الفواتير والمحاسبة", href: "#", icon: <InvoiceIcon /> },
  { label: "التقارير", href: "#", icon: <ReportIcon /> },
  { label: "المستخدمون والصلاحيات", href: "#", icon: <UserIcon /> },
  { label: "التكاملات", href: "#", icon: <IntegrationIcon /> },
  { label: "الإعدادات", href: "#", icon: <SettingsIcon /> },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 end-0 z-50 flex w-64 flex-col border-s border-zinc-200 bg-white transition-transform duration-200 lg:static lg:translate-x-0 ${
          isOpen
            ? "translate-x-0"
            : "translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex h-16 items-center gap-3 border-b border-zinc-200 px-5">
          <Image
            src="/logo.svg"
            alt="RAMSA"
            width={90}
            height={22}
            className="h-6 w-auto"
            priority
          />
          <span className="text-sm font-bold text-brand-primary">ERP</span>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={item.href === "#" ? (e) => e.preventDefault() : onClose}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-brand-primary text-white"
                    : "text-brand-text-secondary hover:bg-brand-primary/10 hover:text-brand-primary"
                }`}
              >
                <span className="size-5 shrink-0">{item.icon}</span>
                <span>{item.label}</span>
                {item.href === "#" && (
                  <span className="me-auto text-[10px] text-brand-text-secondary/50">
                    قريباً
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-zinc-200 px-5 py-4">
          <p className="text-[10px] text-brand-text-secondary/50">
            RAMSA ERP v0.1.0
          </p>
        </div>
      </aside>
    </>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="size-full">
      <path fillRule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clipRule="evenodd" />
    </svg>
  );
}

function ShipmentIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="size-full">
      <path d="M4 3a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4Zm6 0a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2Zm4 4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V7Zm-8 6a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H6Zm6 0a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2Z" />
    </svg>
  );
}

function PickupIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="size-full">
      <path d="M10 2a6 6 0 0 0-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 0 0 .515 1.076 32.94 32.94 0 0 0 3.256.508 3.5 3.5 0 0 0 6.972 0 32.94 32.94 0 0 0 3.256-.508.75.75 0 0 0 .515-1.076A11.448 11.448 0 0 1 16 8a6 6 0 0 0-6-6Zm0 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
    </svg>
  );
}

function TripIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="size-full">
      <path d="M10.362 1.093a.75.75 0 0 0-.724 0L2.523 5.018 10 9.143l7.477-4.125-7.115-3.925ZM18 6.443l-7.25 4v8.25l6.862-3.786A.75.75 0 0 0 18 14.25V6.443ZM9.25 18.693v-8.25l-7.25-4v7.807a.75.75 0 0 0 .388.657l6.862 3.786Z" />
    </svg>
  );
}

function BranchIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="size-full">
      <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.74 5.74 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
    </svg>
  );
}

function CustomerIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="size-full">
      <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
    </svg>
  );
}

function VehicleIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="size-full">
      <path d="M6.5 3a3.5 3.5 0 0 0-3.468 3.055l-.5 3.002A.75.75 0 0 0 3 10h.39l-1.113 1.533a4.496 4.496 0 0 0 2.848 7.309c.03.006.06.01.09.01h.014a.75.75 0 0 0 .743-.75V17.5a1.5 1.5 0 1 1 3 0v.603c0 .414.336.75.75.75h.014c.03 0 .06-.004.09-.01A4.496 4.496 0 0 0 13.723 11.5L12.609 10H17a.75.75 0 0 0 .468-.943l-.5-3.002A3.5 3.5 0 0 0 13.5 3h-7ZM4.5 13.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm13.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
    </svg>
  );
}

function DriverIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="size-full">
      <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
    </svg>
  );
}

function CollectionIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="size-full">
      <path d="M1 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4Zm6 0a1 1 0 0 1 1-1h2.5a1 1 0 0 1 .8.4l2.7 3.6H17a1 1 0 0 1 1 1v2.5a1 1 0 0 1-1 1h-1.5l-1.6 4.5a1 1 0 0 1-.94.66H9a1 1 0 0 1-1-1V4Z" />
    </svg>
  );
}

function InvoiceIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="size-full">
      <path d="M4 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4Zm2.5 2.5A.5.5 0 0 0 6 7v1a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V7a.5.5 0 0 0-.5-.5h-7Zm0 4A.5.5 0 0 0 6 11v1a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-7Z" />
    </svg>
  );
}

function ReportIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="size-full">
      <path fillRule="evenodd" d="M1 2.75A.75.75 0 0 1 1.75 2h16.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 1 7.75Zm0 5a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Zm15.5-4.25a.75.75 0 0 1 .75.75v1.5h1.5a.75.75 0 0 1 0 1.5h-1.5v1.5a.75.75 0 0 1-1.5 0v-1.5h-1.5a.75.75 0 0 1 0-1.5h1.5v-1.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="size-full">
      <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM5.5 16.5a1 1 0 0 1-1-1 5.5 5.5 0 0 1 11 0 1 1 0 0 1-1 1h-9Z" />
    </svg>
  );
}

function IntegrationIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="size-full">
      <path fillRule="evenodd" d="M4.5 2A2.5 2.5 0 0 0 2 4.5v3.879a1.5 1.5 0 0 0 .44 1.06L2.72 9.72a.75.75 0 0 0 0 1.06l-.28.28a1.5 1.5 0 0 0-.44 1.06v3.88A2.5 2.5 0 0 0 4.5 18h3.88a1.5 1.5 0 0 0 1.06-.44l.28-.28a.75.75 0 0 1 1.06 0l.28.28a1.5 1.5 0 0 0 1.06.44h3.88A2.5 2.5 0 0 0 18 15.5v-3.88a1.5 1.5 0 0 0-.44-1.06l-.28-.28a.75.75 0 0 1 0-1.06l.28-.28A1.5 1.5 0 0 0 18 8.38V4.5A2.5 2.5 0 0 0 15.5 2h-3.88a1.5 1.5 0 0 0-1.06.44l-.28.28a.75.75 0 0 1-1.06 0l-.28-.28A1.5 1.5 0 0 0 8.38 2H4.5ZM10 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" clipRule="evenodd" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="size-full">
      <path fillRule="evenodd" d="M7.84 1.804A1 1 0 0 1 8.82 1h2.36a1 1 0 0 1 .98.804l.331 1.652a6.993 6.993 0 0 1 1.929 1.115l1.598-.54a1 1 0 0 1 1.186.447l1.18 2.044a1 1 0 0 1-.205 1.25l-1.19 1.06a7.02 7.02 0 0 1 0 2.336l1.19 1.06a1 1 0 0 1 .205 1.25l-1.18 2.044a1 1 0 0 1-1.186.447l-1.598-.54a6.993 6.993 0 0 1-1.929 1.115l-.331 1.652A1 1 0 0 1 11.18 19H8.82a1 1 0 0 1-.98-.804l-.331-1.652a6.993 6.993 0 0 1-1.929-1.115l-1.598.54a1 1 0 0 1-1.186-.447l-1.18-2.044a1 1 0 0 1 .205-1.25l1.19-1.06a7.02 7.02 0 0 1 0-2.336l-1.19-1.06a1 1 0 0 1-.205-1.25l1.18-2.044a1 1 0 0 1 1.186-.447l1.598.54A6.992 6.992 0 0 1 7.51 3.456l.33-1.652ZM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
    </svg>
  );
}
