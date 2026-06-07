import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/stat-card";
import { DataTableShell } from "@/components/dashboard/data-table-shell";
import {
  stats,
  recentShipments,
  activeTrips,
  alerts,
} from "@/data/dashboard";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-text">
            لوحة المؤشرات
          </h1>
          <p className="mt-1 text-sm text-brand-text-secondary">
            نظرة عامة على أداء العمليات
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs text-brand-text-secondary">
            <span className="inline-block size-2 rounded-full bg-brand-success" />
            آخر تحديث: الآن
          </span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard
          label="إجمالي الشحنات"
          value={stats.totalShipments.toLocaleString()}
          trend={{ value: "12% عن الأمس", positive: true }}
          icon={
            <svg viewBox="0 0 20 20" fill="currentColor" className="size-6">
              <path d="M4 3a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4Z" />
            </svg>
          }
        />
        <StatCard
          label="قيد النقل"
          value={stats.inTransit.toLocaleString()}
          icon={
            <svg viewBox="0 0 20 20" fill="currentColor" className="size-6">
              <path d="M10.362 1.093a.75.75 0 0 0-.724 0L2.523 5.018 10 9.143l7.477-4.125-7.115-3.925Z" />
            </svg>
          }
        />
        <StatCard
          label="خرجت للتسليم"
          value={stats.outForDelivery.toLocaleString()}
          icon={
            <svg viewBox="0 0 20 20" fill="currentColor" className="size-6">
              <path d="M6.5 3a3.5 3.5 0 0 0-3.468 3.055l-.5 3.002A.75.75 0 0 0 3 10h.39l-1.113 1.533a4.496 4.496 0 0 0 2.848 7.309A4.5 4.5 0 0 0 13.723 11.5L12.609 10H17a.75.75 0 0 0 .468-.943l-.5-3.002A3.5 3.5 0 0 0 13.5 3h-7Z" />
            </svg>
          }
        />
        <StatCard
          label="تم التسليم اليوم"
          value={stats.deliveredToday.toLocaleString()}
          trend={{ value: "5% عن الأمس", positive: true }}
          icon={
            <svg viewBox="0 0 20 20" fill="currentColor" className="size-6">
              <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                clipRule="evenodd"
              />
            </svg>
          }
        />
        <StatCard
          label="الرحلات النشطة"
          value={stats.activeTrips.toString()}
          icon={
            <svg viewBox="0 0 20 20" fill="currentColor" className="size-6">
              <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM5.5 16.5a1 1 0 0 1-1-1 5.5 5.5 0 0 1 11 0 1 1 0 0 1-1 1h-9Z" />
            </svg>
          }
        />
        <StatCard
          label="COD غير مسوى"
          value={`${stats.pendingCOD.toLocaleString()} ر.س`}
          trend={{ value: "بحاجة تسوية", positive: false }}
          icon={
            <svg viewBox="0 0 20 20" fill="currentColor" className="size-6">
              <path d="M1 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4Z" />
            </svg>
          }
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-0">
          <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4">
            <h2 className="text-sm font-semibold text-brand-text">
              آخر الشحنات
            </h2>
            <Button variant="ghost" size="sm">
              عرض الكل
            </Button>
          </div>
          <div className="p-0">
            <DataTableShell
              headers={[
                "رقم الشحنة",
                "المرسل",
                "الوجهة",
                "الحالة",
                "التاريخ",
              ]}
            >
              {recentShipments.map((s) => (
                <tr key={s.id} className="hover:bg-zinc-50">
                  <td className="whitespace-nowrap px-4 py-3 font-medium text-brand-text">
                    {s.id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-brand-text-secondary">
                    {s.sender}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-brand-text-secondary">
                    {s.destination}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <Badge variant={s.statusVariant} size="sm">
                      {s.status}
                    </Badge>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-brand-text-secondary">
                    {s.date}
                  </td>
                </tr>
              ))}
            </DataTableShell>
          </div>
        </Card>

        <Card className="p-0">
          <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4">
            <h2 className="text-sm font-semibold text-brand-text">
              تنبيهات التراخيص والوثائق
            </h2>
            <Button variant="ghost" size="sm">
              عرض الكل
            </Button>
          </div>
          <div className="divide-y divide-zinc-100 px-5 py-2">
            {alerts.map((alert, i) => (
              <div key={i} className="flex items-start gap-3 py-3">
                <Badge
                  variant={alert.variant === "error" ? "error" : "accent"}
                  size="sm"
                >
                  {alert.type}
                </Badge>
                <p className="flex-1 text-sm text-brand-text">
                  {alert.message}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-0">
        <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4">
          <h2 className="text-sm font-semibold text-brand-text">
            الرحلات النشطة
          </h2>
          <Button variant="ghost" size="sm">
            عرض الكل
          </Button>
        </div>
        <div className="p-0">
          <DataTableShell
            headers={[
              "رقم الرحلة",
              "المسار",
              "المركبة",
              "السائق",
              "الانطلاق",
              "الوصول المتوقع",
              "الحالة",
            ]}
          >
            {activeTrips.map((t) => (
              <tr key={t.id} className="hover:bg-zinc-50">
                <td className="whitespace-nowrap px-4 py-3 font-medium text-brand-text">
                  {t.id}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-brand-text-secondary">
                  {t.route}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-brand-text-secondary">
                  {t.vehicle}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-brand-text-secondary">
                  {t.driver}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-brand-text-secondary">
                  {t.departure}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-brand-text-secondary">
                  {t.eta}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <Badge
                    variant={
                      t.status === "وصل" ? "success" : "accent"
                    }
                    size="sm"
                  >
                    {t.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </DataTableShell>
        </div>
      </Card>
    </div>
  );
}
