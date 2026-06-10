import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { can } from "@/lib/permissions";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";

interface Props {
  searchParams: Promise<{
    q?: string;
    status?: string;
    type?: string;
    region?: string;
    page?: string;
  }>;
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

const PAGE_SIZE = 10;

export default async function BranchesPage({ searchParams }: Props) {
  const session = await auth();
  const userCanCreate = await can(session, "create", "branch");
  const sp = await searchParams;

  const q = sp.q?.trim();
  const statusFilter = sp.status || "";
  const typeFilter = sp.type || "";
  const regionFilter = sp.region || "";
  const page = Math.max(1, Number(sp.page) || 1);

  const where: Record<string, unknown> = {};
  if (q) {
    where.OR = [
      { nameAr: { contains: q, mode: "insensitive" } },
      { nameEn: { contains: q, mode: "insensitive" } },
      { code: { contains: q, mode: "insensitive" } },
      { city: { contains: q, mode: "insensitive" } },
    ];
  }
  if (statusFilter) where.status = statusFilter;
  if (typeFilter) where.type = typeFilter;
  if (regionFilter) where.region = regionFilter;

  const [branches, totalCount, regions] = await Promise.all([
    prisma.branch.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: { _count: { select: { warehouses: true } } },
    }),
    prisma.branch.count({ where }),
    prisma.branch.findMany({
      where: { region: { not: null } },
      select: { region: true },
      distinct: ["region"],
      orderBy: { region: "asc" },
    }),
  ]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const buildQuery = (updates: Record<string, string>) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (statusFilter) params.set("status", statusFilter);
    if (typeFilter) params.set("type", typeFilter);
    if (regionFilter) params.set("region", regionFilter);
    Object.entries(updates).forEach(([k, v]) => {
      if (v) params.set(k, v);
      else params.delete(k);
    });
    const qs = params.toString();
    return `/dashboard/branches${qs ? `?${qs}` : ""}`;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="الفروع والمستودعات"
        subtitle="إدارة فروع الشركة والمستودعات التابعة لها"
        actions={
          userCanCreate ? (
            <Link href="/dashboard/branches/new">
              <Button size="sm">إضافة فرع</Button>
            </Link>
          ) : null
        }
      />

      <Card>
        <form className="flex flex-wrap gap-3 mb-4">
          <input
            name="q"
            defaultValue={q}
            placeholder="بحث بالاسم أو الكود أو المدينة..."
            className="min-w-0 flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-brand-text placeholder:text-brand-text-secondary focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
          />
          <select
            name="status"
            defaultValue={statusFilter}
            className="min-w-[120px] rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-brand-text focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
          >
            <option value="">كل الحالات</option>
            <option value="ACTIVE">نشط</option>
            <option value="INACTIVE">غير نشط</option>
            <option value="SUSPENDED">موقوف</option>
          </select>
          <select
            name="type"
            defaultValue={typeFilter}
            className="min-w-[140px] rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-brand-text focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
          >
            <option value="">كل الأنواع</option>
            <option value="HEAD_OFFICE">المقر الرئيسي</option>
            <option value="BRANCH">فرع</option>
            <option value="HUB">مركز توزيع</option>
            <option value="DISTRIBUTION_CENTER">مركز توزيع رئيسي</option>
          </select>
          <select
            name="region"
            defaultValue={regionFilter}
            className="min-w-[140px] rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-brand-text focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
          >
            <option value="">كل المناطق</option>
            {regions.map((r) => r.region && (
              <option key={r.region} value={r.region}>{r.region}</option>
            ))}
          </select>
          <Button type="submit" size="sm">بحث</Button>
          {(q || statusFilter || typeFilter || regionFilter) && (
            <Link href="/dashboard/branches">
              <Button type="button" variant="ghost" size="sm">إلغاء الفلتر</Button>
            </Link>
          )}
        </form>

        {totalCount === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <svg viewBox="0 0 20 20" fill="currentColor" className="size-12 text-brand-text-secondary/30">
              <path d="M4 4a2 2 0 0 0-2 2v1h16V6a2 2 0 0 0-2-2H4Z" />
              <path fillRule="evenodd" d="M18 9H2v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9ZM4 13a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-1Zm5-1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1H9Z" clipRule="evenodd" />
            </svg>
            <p className="text-lg font-medium text-brand-text-secondary">لا توجد فروع</p>
            <p className="text-sm text-brand-text-secondary/70">
              {q || statusFilter || typeFilter || regionFilter
                ? "لا توجد نتائج تطابق بحثك"
                : userCanCreate
                  ? "أضف أول فرع للبدء"
                  : "لم يتم إضافة فروع بعد"}
            </p>
            {!q && !statusFilter && !typeFilter && !regionFilter && userCanCreate && (
              <Link href="/dashboard/branches/new">
                <Button size="sm">إضافة فرع</Button>
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 text-right text-xs font-medium text-brand-text-secondary">
                    <th className="py-3 pe-4 ps-0">الكود</th>
                    <th className="px-4 py-3">الاسم</th>
                    <th className="px-4 py-3">النوع</th>
                    <th className="px-4 py-3">المدينة</th>
                    <th className="px-4 py-3">المدير</th>
                    <th className="px-4 py-3 text-center">المستودعات</th>
                    <th className="px-4 py-3">الحالة</th>
                    <th className="py-3 ps-4 pe-0"></th>
                  </tr>
                </thead>
                <tbody>
                  {branches.map((branch) => (
                    <tr key={branch.id} className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50">
                      <td className="py-3 pe-4 ps-0 font-medium text-brand-text">
                        <Link href={`/dashboard/branches/${branch.id}`} className="hover:text-brand-primary">
                          {branch.code}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-brand-text">{branch.nameAr}{branch.nameEn ? ` (${branch.nameEn})` : ""}</td>
                      <td className="px-4 py-3">{branchTypeLabels[branch.type] || branch.type}</td>
                      <td className="px-4 py-3 text-brand-text-secondary">{branch.city}</td>
                      <td className="px-4 py-3 text-brand-text-secondary">{branch.managerName || "—"}</td>
                      <td className="px-4 py-3 text-center text-brand-text-secondary">{branch._count.warehouses}</td>
                      <td className="px-4 py-3">
                        <Badge variant={statusBadge[branch.status] || "primary"} size="sm">
                          {statusLabels[branch.status] || branch.status}
                        </Badge>
                      </td>
                      <td className="py-3 ps-4 pe-0">
                        <Link
                          href={`/dashboard/branches/${branch.id}/edit`}
                          className="text-sm text-brand-primary hover:underline"
                        >
                          تعديل
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-4 text-sm text-brand-text-secondary">
                <span>الصفحة {page} من {totalPages}</span>
                <div className="flex gap-2">
                  {page > 1 && (
                    <Link href={buildQuery({ page: String(page - 1) })}>
                      <Button type="button" variant="ghost" size="sm">السابق</Button>
                    </Link>
                  )}
                  {page < totalPages && (
                    <Link href={buildQuery({ page: String(page + 1) })}>
                      <Button type="button" variant="ghost" size="sm">التالي</Button>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
}
