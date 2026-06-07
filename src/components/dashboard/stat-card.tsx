import { Card } from "@/components/ui/card";

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  trend?: { value: string; positive: boolean };
}

export function StatCard({ label, value, icon, trend }: StatCardProps) {
  return (
    <Card className="flex items-center gap-4 p-5">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-sm text-brand-text-secondary">{label}</span>
        <span className="text-2xl font-bold text-brand-text">{value}</span>
        {trend && (
          <span
            className={`text-xs ${trend.positive ? "text-brand-success" : "text-brand-error"}`}
          >
            {trend.positive ? "↑" : "↓"} {trend.value}
          </span>
        )}
      </div>
    </Card>
  );
}
