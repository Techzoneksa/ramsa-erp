"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createFirstAdmin, type ActionResult } from "./actions";

export function SetupForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError("");

      const form = new FormData();
      form.set("name", name);
      form.set("email", email);
      form.set("password", password);
      form.set("confirmPassword", confirmPassword);

      const result: ActionResult = await createFirstAdmin(form);

      if (result.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);
      setTimeout(() => router.push("/login"), 2000);
    },
    [name, email, password, confirmPassword, router],
  );

  if (success) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-green-100">
          <svg viewBox="0 0 20 20" fill="currentColor" className="size-8 text-green-600">
            <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-brand-text">تم إنشاء المدير الأول</h2>
        <p className="text-sm text-brand-text-secondary">يمكنك تسجيل الدخول الآن</p>
        <p className="text-xs text-brand-text-secondary">جاري التحويل إلى صفحة تسجيل الدخول...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium text-brand-text">
          الاسم الكامل
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-brand-text placeholder:text-brand-text-secondary focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
          placeholder="مثال: أحمد محمد"
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-brand-text">
          البريد الإلكتروني
        </label>
        <input
          id="email"
          type="email"
          dir="ltr"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-brand-text placeholder:text-brand-text-secondary focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
          placeholder="admin@ramsa.com"
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-sm font-medium text-brand-text">
          كلمة المرور
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            dir="ltr"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-brand-text placeholder:text-brand-text-secondary focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
            placeholder="••••••••••"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute left-1 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-brand-text-secondary hover:bg-zinc-100"
            aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
          >
            {showPassword ? (
              <svg viewBox="0 0 20 20" fill="currentColor" className="size-4">
                <path fillRule="evenodd" d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z" clipRule="evenodd" />
                <path d="m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z" />
              </svg>
            ) : (
              <svg viewBox="0 0 20 20" fill="currentColor" className="size-4">
                <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
        <span className="text-xs text-brand-text-secondary">10 أحرف على الأقل</span>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="confirmPassword" className="text-sm font-medium text-brand-text">
          تأكيد كلمة المرور
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            type={showConfirm ? "text" : "password"}
            dir="ltr"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-brand-text placeholder:text-brand-text-secondary focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
            placeholder="••••••••••"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirm((v) => !v)}
            className="absolute left-1 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-brand-text-secondary hover:bg-zinc-100"
            aria-label={showConfirm ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
          >
            {showConfirm ? (
              <svg viewBox="0 0 20 20" fill="currentColor" className="size-4">
                <path fillRule="evenodd" d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z" clipRule="evenodd" />
                <path d="m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z" />
              </svg>
            ) : (
              <svg viewBox="0 0 20 20" fill="currentColor" className="size-4">
                <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-brand-error/30 bg-brand-error/5 px-3 py-2 text-sm text-brand-error">
          <svg viewBox="0 0 20 20" fill="currentColor" className="size-4 shrink-0">
            <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="flex items-center justify-center gap-2 rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-primary-dark focus:outline-none focus:ring-2 focus:ring-brand-primary/50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4Z" />
            </svg>
            <span>جاري الإنشاء...</span>
          </>
        ) : (
          "إنشاء المدير الأول"
        )}
      </button>
    </form>
  );
}
