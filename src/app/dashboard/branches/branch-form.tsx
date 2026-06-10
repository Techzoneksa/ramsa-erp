"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ActionResult } from "./actions";

interface BranchFormProps {
  defaultValues?: {
    id?: string;
    code?: string;
    nameAr?: string;
    nameEn?: string;
    type?: string;
    status?: string;
    region?: string;
    city?: string;
    district?: string;
    street?: string;
    postalCode?: string;
    shortAddress?: string;
    nationalAddress?: string;
    phone?: string;
    email?: string;
    managerName?: string;
    managerPhone?: string;
    isHeadOffice?: boolean;
    notes?: string;
  };
  isEdit?: boolean;
  submitAction: (formData: FormData) => Promise<ActionResult & { id?: string }>;
}

export function BranchForm({ defaultValues, isEdit, submitAction }: BranchFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      setError("");

      const form = new FormData(e.currentTarget);
      const result = await submitAction(form);

      if (result.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      router.push(`/dashboard/branches/${result.id || defaultValues?.id}`);
      router.refresh();
    },
    [submitAction, router, defaultValues?.id],
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-brand-error/30 bg-brand-error/5 px-3 py-2 text-sm text-brand-error">
          <span>{error}</span>
        </div>
      )}

      <Card>
        <h2 className="mb-4 text-lg font-bold text-brand-text">البيانات الأساسية</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="code" className="text-sm font-medium text-brand-text">الكود *</label>
            <input id="code" name="code" dir="ltr" defaultValue={defaultValues?.code}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-brand-text focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
              required />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="type" className="text-sm font-medium text-brand-text">النوع *</label>
            <select id="type" name="type" defaultValue={defaultValues?.type || "BRANCH"}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-brand-text focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
              required>
              <option value="HEAD_OFFICE">المقر الرئيسي</option>
              <option value="BRANCH">فرع</option>
              <option value="HUB">مركز توزيع</option>
              <option value="DISTRIBUTION_CENTER">مركز توزيع رئيسي</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="nameAr" className="text-sm font-medium text-brand-text">الاسم العربي *</label>
            <input id="nameAr" name="nameAr" defaultValue={defaultValues?.nameAr}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-brand-text focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
              required />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="nameEn" className="text-sm font-medium text-brand-text">الاسم الإنجليزي</label>
            <input id="nameEn" name="nameEn" dir="ltr" defaultValue={defaultValues?.nameEn || ""}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-brand-text focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50" />
          </div>
          {isEdit && (
            <div className="flex flex-col gap-1.5">
              <label htmlFor="status" className="text-sm font-medium text-brand-text">الحالة</label>
              <select id="status" name="status" defaultValue={defaultValues?.status || "ACTIVE"}
                className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-brand-text focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50">
                <option value="ACTIVE">نشط</option>
                <option value="INACTIVE">غير نشط</option>
                <option value="SUSPENDED">موقوف</option>
              </select>
            </div>
          )}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="region" className="text-sm font-medium text-brand-text">المنطقة</label>
            <input id="region" name="region" defaultValue={defaultValues?.region || ""}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-brand-text focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="city" className="text-sm font-medium text-brand-text">المدينة *</label>
            <input id="city" name="city" defaultValue={defaultValues?.city}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-brand-text focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
              required />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="district" className="text-sm font-medium text-brand-text">الحي</label>
            <input id="district" name="district" defaultValue={defaultValues?.district || ""}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-brand-text focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="street" className="text-sm font-medium text-brand-text">الشارع</label>
            <input id="street" name="street" defaultValue={defaultValues?.street || ""}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-brand-text focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="postalCode" className="text-sm font-medium text-brand-text">الرمز البريدي</label>
            <input id="postalCode" name="postalCode" dir="ltr" defaultValue={defaultValues?.postalCode || ""}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-brand-text focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="shortAddress" className="text-sm font-medium text-brand-text">العنوان المختصر</label>
            <input id="shortAddress" name="shortAddress" defaultValue={defaultValues?.shortAddress || ""}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-brand-text focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="nationalAddress" className="text-sm font-medium text-brand-text">العنوان الوطني</label>
            <input id="nationalAddress" name="nationalAddress" defaultValue={defaultValues?.nationalAddress || ""}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-brand-text focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50" />
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="mb-4 text-lg font-bold text-brand-text">بيانات الاتصال</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="phone" className="text-sm font-medium text-brand-text">رقم الهاتف</label>
            <input id="phone" name="phone" dir="ltr" defaultValue={defaultValues?.phone || ""}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-brand-text focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-brand-text">البريد الإلكتروني</label>
            <input id="email" name="email" type="email" dir="ltr" defaultValue={defaultValues?.email || ""}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-brand-text focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50" />
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="mb-4 text-lg font-bold text-brand-text">الإدارة</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="managerName" className="text-sm font-medium text-brand-text">اسم المدير</label>
            <input id="managerName" name="managerName" defaultValue={defaultValues?.managerName || ""}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-brand-text focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="managerPhone" className="text-sm font-medium text-brand-text">رقم المدير</label>
            <input id="managerPhone" name="managerPhone" dir="ltr" defaultValue={defaultValues?.managerPhone || ""}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-brand-text focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50" />
          </div>
          <div className="flex items-center gap-2">
            <input id="isHeadOffice" name="isHeadOffice" type="checkbox"
              defaultChecked={defaultValues?.isHeadOffice || false}
              className="size-4 rounded border-zinc-300 text-brand-primary focus:ring-brand-primary/50" />
            <label htmlFor="isHeadOffice" className="text-sm text-brand-text">المقر الرئيسي</label>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="mb-4 text-lg font-bold text-brand-text">ملاحظات</h2>
        <div className="flex flex-col gap-1.5">
          <textarea id="notes" name="notes" rows={3} defaultValue={defaultValues?.notes || ""}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-brand-text focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50" />
        </div>
      </Card>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? "جاري الحفظ..." : isEdit ? "حفظ التعديلات" : "إنشاء الفرع"}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.back()}>
          إلغاء
        </Button>
      </div>
    </form>
  );
}
