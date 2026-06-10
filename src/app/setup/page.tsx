import { redirect } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { SetupForm } from "./setup-form";

export const dynamic = "force-dynamic";

export default async function SetupPage() {
  const count = await prisma.user.count();

  if (count > 0) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-brand-bg px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg sm:p-10">
        <div className="mb-8 flex flex-col items-center">
          <Image
            src="/logo.svg"
            alt="RAMSA"
            width={120}
            height={30}
            className="h-10 w-auto"
            priority
          />
          <h1 className="mt-4 text-xl font-bold text-brand-primary">
            إنشاء المدير الأول
          </h1>
          <p className="mt-1 text-sm text-brand-text-secondary">
            نظام رمسا لإدارة النقل والشحن
          </p>
        </div>

        <SetupForm />

        <p className="mt-6 text-center text-xs text-brand-text-secondary">
          &copy; {new Date().getFullYear()} RAMSA ERP &mdash; شركة رمسا للشحن والنقليات
        </p>
      </div>
    </div>
  );
}
