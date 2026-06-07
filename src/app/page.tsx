import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <>
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Image
            src="/logo.svg"
            alt="RAMSA"
            width={100}
            height={24}
            className="h-8 w-auto"
            priority
          />
          <div className="flex items-center gap-3">
            <Badge variant="primary" size="sm">v0.1.0</Badge>
            <span className="hidden text-xs text-brand-text-secondary sm:block">
              ERP System
            </span>
          </div>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-10 flex justify-center">
            <Image
              src="/logo.svg"
              alt="RAMSA"
              width={200}
              height={50}
              className="h-16 w-auto sm:h-20"
              priority
            />
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-brand-primary sm:text-7xl">
            RAMSA <span className="text-brand-accent">ERP</span>
          </h1>

          <p className="mt-5 text-lg text-brand-text-secondary sm:text-xl">
            Enterprise Resource Planning for shipping and logistics
          </p>

          <p
            className="mt-1 text-lg text-brand-text-secondary sm:text-xl"
            dir="rtl"
          >
            نظام رمسا لإدارة النقل والشحن
          </p>

          <div className="mt-12 flex items-center justify-center gap-4">
            <Button variant="primary" size="lg">
              ابدأ الآن
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>

          <div className="mt-16 flex items-center justify-center gap-6 text-xs text-brand-text-secondary">
            <span className="flex items-center gap-1.5">
              <span className="inline-block size-1.5 rounded-full bg-brand-success" />
              System Ready
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block size-1.5 rounded-full bg-brand-accent" />
              Saudi Arabia
            </span>
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-200 bg-white py-4">
        <div className="mx-auto max-w-6xl px-6 text-center text-xs text-brand-text-secondary">
          &copy; {new Date().getFullYear()} RAMSA ERP &mdash; شركة رمسا للشحن والنقليات
        </div>
      </footer>
    </>
  );
}
