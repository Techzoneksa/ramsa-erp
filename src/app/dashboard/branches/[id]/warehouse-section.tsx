"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createWarehouse, updateWarehouse, toggleWarehouseStatus } from "../actions";

interface Warehouse {
  id: string;
  code: string;
  nameAr: string;
  nameEn: string | null;
  type: string;
  status: string;
  capacity: number | null;
  capacityUnit: string | null;
  phone: string | null;
  supervisorName: string | null;
  supervisorPhone: string | null;
  notes: string | null;
  createdAt: Date;
}

interface Props {
  branchId: string;
  warehouses: Warehouse[];
  canCreate: boolean;
  canUpdate: boolean;
}

const typeLabels: Record<string, string> = {
  MAIN: "رئيسي",
  TRANSIT: "ترانزيت",
  RETURN: "مرتجعات",
  DAMAGED: "تالف",
  COLD_STORAGE: "تبريد",
  OTHER: "أخرى",
};

const statusBadge: Record<string, "success" | "error" | "primary"> = {
  ACTIVE: "success",
  INACTIVE: "error",
  SUSPENDED: "primary",
};

const statusLabels: Record<string, string> = {
  ACTIVE: "نشط",
  INACTIVE: "غير نشط",
  SUSPENDED: "موقوف",
};

export function WarehouseSection({ branchId, warehouses, canCreate, canUpdate }: Props) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const editWarehouse = warehouses.find((w) => w.id === editId);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      setError("");

      const form = new FormData(e.currentTarget);
      const result = editId
        ? await updateWarehouse(editId, form)
        : await createWarehouse(branchId, form);

      if (result.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      setShowForm(false);
      setEditId(null);
      setLoading(false);
      router.refresh();
    },
    [branchId, editId, router],
  );

  const handleToggle = useCallback(
    async (id: string) => {
      const result = await toggleWarehouseStatus(id);
      if (result.error) setError(result.error);
      else router.refresh();
    },
    [router],
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-brand-text">
          المستودعات ({warehouses.length})
        </h2>
        {canCreate && !showForm && (
          <Button size="sm" onClick={() => { setShowForm(true); setEditId(null); setError(""); }}>
            إضافة مستودع
          </Button>
        )}
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-brand-error/30 bg-brand-error/5 px-3 py-2 text-sm text-brand-error">
          <span>{error}</span>
        </div>
      )}

      {(showForm || editId) && (
        <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 gap-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-brand-text">الكود *</label>
            <input name="code" dir="ltr" defaultValue={editWarehouse?.code || ""} required
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-brand-text">الاسم *</label>
            <input name="nameAr" defaultValue={editWarehouse?.nameAr || ""} required
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-brand-text">الاسم الإنجليزي</label>
            <input name="nameEn" dir="ltr" defaultValue={editWarehouse?.nameEn || ""}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-brand-text">النوع *</label>
            <select name="type" defaultValue={editWarehouse?.type || "MAIN"} required
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50">
              <option value="MAIN">رئيسي</option>
              <option value="TRANSIT">ترانزيت</option>
              <option value="RETURN">مرتجعات</option>
              <option value="DAMAGED">تالف</option>
              <option value="COLD_STORAGE">تبريد</option>
              <option value="OTHER">أخرى</option>
            </select>
          </div>
          {editId && (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-brand-text">الحالة</label>
              <select name="status" defaultValue={editWarehouse?.status || "ACTIVE"}
                className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50">
                <option value="ACTIVE">نشط</option>
                <option value="INACTIVE">غير نشط</option>
                <option value="SUSPENDED">موقوف</option>
              </select>
            </div>
          )}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-brand-text">السعة</label>
            <input name="capacity" type="number" dir="ltr" defaultValue={editWarehouse?.capacity ?? ""}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-brand-text">وحدة السعة</label>
            <input name="capacityUnit" defaultValue={editWarehouse?.capacityUnit || ""}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-brand-text">رقم الهاتف</label>
            <input name="phone" dir="ltr" defaultValue={editWarehouse?.phone || ""}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-brand-text">المشرف</label>
            <input name="supervisorName" defaultValue={editWarehouse?.supervisorName || ""}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-brand-text">رقم المشرف</label>
            <input name="supervisorPhone" dir="ltr" defaultValue={editWarehouse?.supervisorPhone || ""}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50" />
          </div>
          <div className="flex flex-col gap-1.5 md:col-span-2 lg:col-span-3">
            <label className="text-sm font-medium text-brand-text">ملاحظات</label>
            <textarea name="notes" rows={2} defaultValue={editWarehouse?.notes || ""}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50" />
          </div>
          <div className="flex items-center gap-2 md:col-span-2 lg:col-span-3">
            <Button type="submit" size="sm" disabled={loading}>
              {loading ? "جاري الحفظ..." : editId ? "حفظ" : "إضافة"}
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => { setShowForm(false); setEditId(null); setError(""); }}>
              إلغاء
            </Button>
          </div>
        </form>
      )}

      {warehouses.length === 0 ? (
        <p className="py-8 text-center text-sm text-brand-text-secondary">
          لا توجد مستودعات تابعة لهذا الفرع
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-200 text-right text-xs font-medium text-brand-text-secondary">
                <th className="py-3 pe-4 ps-0">الكود</th>
                <th className="px-4 py-3">الاسم</th>
                <th className="px-4 py-3">النوع</th>
                <th className="px-4 py-3">السعة</th>
                <th className="px-4 py-3">المشرف</th>
                <th className="px-4 py-3">الحالة</th>
                {canUpdate && <th className="py-3 ps-4 pe-0"></th>}
              </tr>
            </thead>
            <tbody>
              {warehouses.map((wh) => (
                <tr key={wh.id} className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50">
                  <td className="py-3 pe-4 ps-0 font-medium text-brand-text">{wh.code}</td>
                  <td className="px-4 py-3 text-brand-text">{wh.nameAr}{wh.nameEn ? ` (${wh.nameEn})` : ""}</td>
                  <td className="px-4 py-3">{typeLabels[wh.type] || wh.type}</td>
                  <td className="px-4 py-3 text-brand-text-secondary">
                    {wh.capacity != null ? `${wh.capacity} ${wh.capacityUnit || ""}` : "—"}
                  </td>
                  <td className="px-4 py-3 text-brand-text-secondary">{wh.supervisorName || "—"}</td>
                  <td className="px-4 py-3">
                    <Badge variant={statusBadge[wh.status] || "primary"} size="sm">
                      {statusLabels[wh.status] || wh.status}
                    </Badge>
                  </td>
                  {canUpdate && (
                    <td className="py-3 ps-4 pe-0">
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setEditId(wh.id); setShowForm(true); setError(""); }}
                          className="text-sm text-brand-primary hover:underline"
                        >
                          تعديل
                        </button>
                        <button
                          onClick={() => handleToggle(wh.id)}
                          className="text-sm text-brand-text-secondary hover:underline"
                        >
                          {wh.status === "ACTIVE" ? "تعطيل" : "تفعيل"}
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
