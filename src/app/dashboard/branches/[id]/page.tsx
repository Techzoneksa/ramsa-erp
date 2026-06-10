import { notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { can } from "@/lib/permissions";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { WarehouseSection } from "./warehouse-section";

interface Props {
  params: Promise<{ id: string }>;
}

const branchTypeLabels: Record<string, string> = {
  HEAD_OFFICE: "المقر الرئيسي",
  BRANCH: "فرع",
  HUB: "مركز توزيع",
  DISTRIBUTION_CENTER: "مركز توزيع رئيسي",
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

export default async function BranchDetailPage({ params }: Props) {
  const session = await auth();
  const { id } = await params;

  const branch = await prisma.branch.findUnique({
    where: { id },
    include: {
      warehouses: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!branch) notFound();

  const userCanEdit = await can(session, "update", "branch");
  const userCanCreateWarehouse = await can(session, "create", "warehouse");
  const userCanUpdateWarehouse = await can(session, "update", "warehouse");

  return (
    <div className="space-y-6">
      <PageHeader
        title={branch.nameAr}
        subtitle={`${branchTypeLabels[branch.type] || branch.type} — ${branch.city}`}
        actions={
          userCanEdit ? (
            <Link href={`/dashboard/branches/${branch.id}/edit`}>
              <Button size="sm">تعديل الفرع</Button>
            </Link>
          ) : null
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="mb-4 text-lg font-bold text-brand-text">معلومات الفرع</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-brand-text-secondary">الكود</dt>
              <dd className="font-medium text-brand-text" dir="ltr">{branch.code}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-brand-text-secondary">النوع</dt>
              <dd className="font-medium text-brand-text">{branchTypeLabels[branch.type] || branch.type}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-brand-text-secondary">الحالة</dt>
              <dd><Badge variant={statusBadge[branch.status] || "primary"} size="sm">{statusLabels[branch.status]}</Badge></dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-brand-text-secondary">المقر الرئيسي</dt>
              <dd className="font-medium text-brand-text">{branch.isHeadOffice ? "نعم" : "لا"}</dd>
            </div>
          </dl>
        </Card>

        <Card>
          <h2 className="mb-4 text-lg font-bold text-brand-text">العنوان وبيانات الاتصال</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-brand-text-secondary">المنطقة</dt>
              <dd className="font-medium text-brand-text">{branch.region || "—"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-brand-text-secondary">المدينة</dt>
              <dd className="font-medium text-brand-text">{branch.city}</dd>
            </div>
            {branch.district && (
              <div className="flex justify-between">
                <dt className="text-brand-text-secondary">الحي</dt>
                <dd className="font-medium text-brand-text">{branch.district}</dd>
              </div>
            )}
            {branch.street && (
              <div className="flex justify-between">
                <dt className="text-brand-text-secondary">الشارع</dt>
                <dd className="font-medium text-brand-text">{branch.street}</dd>
              </div>
            )}
            {branch.phone && (
              <div className="flex justify-between">
                <dt className="text-brand-text-secondary">الهاتف</dt>
                <dd className="font-medium text-brand-text" dir="ltr">{branch.phone}</dd>
              </div>
            )}
            {branch.email && (
              <div className="flex justify-between">
                <dt className="text-brand-text-secondary">البريد</dt>
                <dd className="font-medium text-brand-text" dir="ltr">{branch.email}</dd>
              </div>
            )}
            {branch.shortAddress && (
              <div className="flex justify-between">
                <dt className="text-brand-text-secondary">العنوان المختصر</dt>
                <dd className="font-medium text-brand-text">{branch.shortAddress}</dd>
              </div>
            )}
          </dl>
        </Card>

        <Card>
          <h2 className="mb-4 text-lg font-bold text-brand-text">الإدارة</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-brand-text-secondary">المدير</dt>
              <dd className="font-medium text-brand-text">{branch.managerName || "—"}</dd>
            </div>
            {branch.managerPhone && (
              <div className="flex justify-between">
                <dt className="text-brand-text-secondary">رقم المدير</dt>
                <dd className="font-medium text-brand-text" dir="ltr">{branch.managerPhone}</dd>
              </div>
            )}
          </dl>
        </Card>

        {branch.notes && (
          <Card>
            <h2 className="mb-4 text-lg font-bold text-brand-text">ملاحظات</h2>
            <p className="text-sm text-brand-text">{branch.notes}</p>
          </Card>
        )}
      </div>

      <Card>
        <WarehouseSection
          branchId={branch.id}
          warehouses={branch.warehouses}
          canCreate={userCanCreateWarehouse}
          canUpdate={userCanUpdateWarehouse}
        />
      </Card>

      <div className="flex items-center gap-4 text-xs text-brand-text-secondary">
        <span>تاريخ الإنشاء: {branch.createdAt.toLocaleDateString("ar-SA")}</span>
        <span>آخر تحديث: {branch.updatedAt.toLocaleDateString("ar-SA")}</span>
      </div>
    </div>
  );
}
