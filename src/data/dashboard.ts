export interface DashboardStats {
  totalShipments: number;
  inTransit: number;
  outForDelivery: number;
  deliveredToday: number;
  activeTrips: number;
  pendingCOD: number;
}

export interface RecentShipment {
  id: string;
  sender: string;
  recipient: string;
  destination: string;
  status: string;
  statusVariant: "primary" | "accent" | "success" | "error";
  date: string;
}

export interface ActiveTrip {
  id: string;
  route: string;
  vehicle: string;
  driver: string;
  departure: string;
  eta: string;
  status: string;
}

export interface Alert {
  type: string;
  message: string;
  variant: "error" | "accent";
}

export const stats: DashboardStats = {
  totalShipments: 1284,
  inTransit: 342,
  outForDelivery: 189,
  deliveredToday: 721,
  activeTrips: 18,
  pendingCOD: 45200,
};

export const recentShipments: RecentShipment[] = [
  { id: "RMS-2024-001", sender: "أحمد محمد", recipient: "خالد العتيبي", destination: "الرياض", status: "تم الاستلام", statusVariant: "success", date: "2024-12-01" },
  { id: "RMS-2024-002", sender: "شركة البركة", recipient: "فهد القحطاني", destination: "جدة", status: "قيد النقل", statusVariant: "accent", date: "2024-12-01" },
  { id: "RMS-2024-003", sender: "مؤسسة الرائد", recipient: "سعد الحربي", destination: "الدمام", status: "خرج للتسليم", statusVariant: "primary", date: "2024-12-01" },
  { id: "RMS-2024-004", sender: "نورة السليم", recipient: "سارة الدوسري", destination: "مكة", status: "تم التسليم", statusVariant: "success", date: "2024-11-30" },
  { id: "RMS-2024-005", sender: "مؤسسة الرائد", recipient: "فيصل المالكي", destination: "المدينة", status: "معلق", statusVariant: "error", date: "2024-11-30" },
];

export const activeTrips: ActiveTrip[] = [
  { id: "TRP-1024", route: "الرياض → جدة", vehicle: "شاحنة 1 (XYZ 1234)", driver: "محمد العنزي", departure: "06:00", eta: "14:30", status: "في الطريق" },
  { id: "TRP-1025", route: "جدة → الدمام", vehicle: "شاحنة 3 (ABC 5678)", driver: "نايف الشمري", departure: "07:30", eta: "18:00", status: "في الطريق" },
  { id: "TRP-1026", route: "الدمام → الرياض", vehicle: "شاحنة 7 (DEF 9012)", driver: "بدر المطيري", departure: "05:00", eta: "12:15", status: "وصل" },
];

export const alerts: Alert[] = [
  { type: "ترخيص", message: "انتهاء بطاقة تشغيل شاحنة 12 خلال 7 أيام", variant: "error" },
  { type: "رخصة", message: "انتهاء رخصة سائق - محمد القحطاني", variant: "accent" },
  { type: "تأمين", message: "انتهاء تأمين شاحنة 5 خلال 14 يومًا", variant: "error" },
];
