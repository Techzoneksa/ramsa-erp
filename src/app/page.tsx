export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50">
      <main className="flex flex-1 w-full max-w-4xl flex-col items-center justify-center py-32 px-8 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-zinc-900 sm:text-6xl">
          RAMSA <span className="text-blue-600">ERP</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-zinc-600">
          Enterprise Resource Planning system for shipping and logistics management
        </p>
        <p className="mt-2 text-sm text-zinc-400" dir="rtl">
          نظام رمسا لإدارة النقل والشحن
        </p>
        <div className="mt-12 flex items-center gap-2 text-xs text-zinc-400">
          <span className="inline-block size-2 rounded-full bg-green-500" />
          System ready
        </div>
      </main>
    </div>
  );
}
