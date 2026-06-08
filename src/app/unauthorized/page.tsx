import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-brand-bg px-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-brand-error/10">
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-8 text-brand-error"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-brand-text">غير مصرح بالوصول</h1>
        <p className="mt-2 text-brand-text-secondary">
          ليس لديك الصلاحية للوصول إلى هذه الصفحة.
        </p>

        <div className="mt-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-primary-dark"
          >
            العودة إلى لوحة التحكم
          </Link>
        </div>
      </div>
    </div>
  );
}
