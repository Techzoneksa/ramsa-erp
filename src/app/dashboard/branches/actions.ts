"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/permissions";
import type { BranchType, RecordStatus, WarehouseType } from "@prisma/client";

export interface ActionResult {
  success?: true;
  error?: string;
  id?: string;
}

function getPrismaCode(err: unknown): string | null {
  if (err instanceof Error && "code" in err) {
    const code = (err as { code: unknown }).code;
    return typeof code === "string" ? code : null;
  }
  return null;
}

function hasTarget(err: unknown, field: string): boolean {
  if (err instanceof Error && "meta" in err) {
    const meta = (err as { meta: unknown }).meta;
    if (meta && typeof meta === "object" && "target" in meta) {
      const target = (meta as { target: unknown }).target;
      return Array.isArray(target) && target.includes(field);
    }
  }
  return false;
}

export async function createBranch(formData: FormData): Promise<ActionResult & { id?: string }> {
  const session = await auth();
  requirePermission(session, "create", "branch");

  const code = (formData.get("code") as string)?.trim();
  const nameAr = (formData.get("nameAr") as string)?.trim();
  const nameEn = (formData.get("nameEn") as string)?.trim() || null;
  const type = formData.get("type") as BranchType;
  const city = (formData.get("city") as string)?.trim();
  const region = (formData.get("region") as string)?.trim() || null;
  const district = (formData.get("district") as string)?.trim() || null;
  const street = (formData.get("street") as string)?.trim() || null;
  const postalCode = (formData.get("postalCode") as string)?.trim() || null;
  const shortAddress = (formData.get("shortAddress") as string)?.trim() || null;
  const nationalAddress = (formData.get("nationalAddress") as string)?.trim() || null;
  const phone = (formData.get("phone") as string)?.trim() || null;
  const email = (formData.get("email") as string)?.trim() || null;
  const managerName = (formData.get("managerName") as string)?.trim() || null;
  const managerPhone = (formData.get("managerPhone") as string)?.trim() || null;
  const isHeadOffice = formData.get("isHeadOffice") === "on";
  const notes = (formData.get("notes") as string)?.trim() || null;

  if (!code || !nameAr || !type || !city) {
    return { error: "الكود والاسم العربي والنوع والمدينة مطلوبة" };
  }

  const validTypes: BranchType[] = ["HEAD_OFFICE", "BRANCH", "HUB", "DISTRIBUTION_CENTER"];
  if (!validTypes.includes(type)) {
    return { error: "نوع الفرع غير صالح" };
  }

  try {
    if (isHeadOffice) {
      await prisma.branch.updateMany({
        where: { isHeadOffice: true },
        data: { isHeadOffice: false },
      });
    }

    const branch = await prisma.branch.create({
      data: { code, nameAr, nameEn, type, city, region, district, street, postalCode, shortAddress, nationalAddress, phone, email, managerName, managerPhone, isHeadOffice, notes },
      select: { id: true, code: true },
    });

    return { success: true as const, id: branch.id };
  } catch (err: unknown) {
    if (getPrismaCode(err) === "P2002" && hasTarget(err, "code")) {
      return { error: 'الكود "' + code + '" مستخدم مسبقًا' };
    }
    return { error: "حدث خطأ أثناء إنشاء الفرع" };
  }
}

export async function updateBranch(id: string, formData: FormData): Promise<ActionResult & { id?: string }> {
  const session = await auth();
  requirePermission(session, "update", "branch");

  const code = (formData.get("code") as string)?.trim();
  const nameAr = (formData.get("nameAr") as string)?.trim();
  const nameEn = (formData.get("nameEn") as string)?.trim() || null;
  const type = formData.get("type") as BranchType;
  const status = formData.get("status") as RecordStatus;
  const city = (formData.get("city") as string)?.trim();
  const region = (formData.get("region") as string)?.trim() || null;
  const district = (formData.get("district") as string)?.trim() || null;
  const street = (formData.get("street") as string)?.trim() || null;
  const postalCode = (formData.get("postalCode") as string)?.trim() || null;
  const shortAddress = (formData.get("shortAddress") as string)?.trim() || null;
  const nationalAddress = (formData.get("nationalAddress") as string)?.trim() || null;
  const phone = (formData.get("phone") as string)?.trim() || null;
  const email = (formData.get("email") as string)?.trim() || null;
  const managerName = (formData.get("managerName") as string)?.trim() || null;
  const managerPhone = (formData.get("managerPhone") as string)?.trim() || null;
  const isHeadOffice = formData.get("isHeadOffice") === "on";
  const notes = (formData.get("notes") as string)?.trim() || null;

  if (!code || !nameAr || !type || !city) {
    return { error: "الكود والاسم العربي والنوع والمدينة مطلوبة" };
  }

  const validTypes: BranchType[] = ["HEAD_OFFICE", "BRANCH", "HUB", "DISTRIBUTION_CENTER"];
  if (!validTypes.includes(type)) {
    return { error: "نوع الفرع غير صالح" };
  }

  const validStatuses: RecordStatus[] = ["ACTIVE", "INACTIVE", "SUSPENDED"];
  if (status && !validStatuses.includes(status)) {
    return { error: "حالة الفرع غير صالحة" };
  }

  try {
    if (isHeadOffice) {
      await prisma.branch.updateMany({
        where: { isHeadOffice: true, id: { not: id } },
        data: { isHeadOffice: false },
      });
    }

    const branch = await prisma.branch.update({
      where: { id },
      data: { code, nameAr, nameEn, type, status, city, region, district, street, postalCode, shortAddress, nationalAddress, phone, email, managerName, managerPhone, isHeadOffice, notes },
      select: { id: true },
    });

    return { success: true as const, id: branch.id };
  } catch (err: unknown) {
    if (getPrismaCode(err) === "P2002" && hasTarget(err, "code")) {
      return { error: 'الكود "' + code + '" مستخدم مسبقًا' };
    }
    if (getPrismaCode(err) === "P2025") {
      return { error: "الفرع غير موجود" };
    }
    return { error: "حدث خطأ أثناء تحديث الفرع" };
  }
}

export async function createWarehouse(branchId: string, formData: FormData) {
  const session = await auth();
  requirePermission(session, "create", "warehouse");

  const code = (formData.get("code") as string)?.trim();
  const nameAr = (formData.get("nameAr") as string)?.trim();
  const nameEn = (formData.get("nameEn") as string)?.trim() || null;
  const type = formData.get("type") as WarehouseType;
  const capacity = formData.get("capacity") ? Number(formData.get("capacity")) : null;
  const capacityUnit = (formData.get("capacityUnit") as string)?.trim() || null;
  const phone = (formData.get("phone") as string)?.trim() || null;
  const supervisorName = (formData.get("supervisorName") as string)?.trim() || null;
  const supervisorPhone = (formData.get("supervisorPhone") as string)?.trim() || null;
  const notes = (formData.get("notes") as string)?.trim() || null;

  if (!code || !nameAr || !type) {
    return { error: "الكود والاسم والنوع مطلوبة" };
  }

  const validTypes: WarehouseType[] = ["MAIN", "TRANSIT", "RETURN", "DAMAGED", "COLD_STORAGE", "OTHER"];
  if (!validTypes.includes(type)) {
    return { error: "نوع المستودع غير صالح" };
  }

  try {
    const warehouse = await prisma.warehouse.create({
      data: { branchId, code, nameAr, nameEn, type, capacity, capacityUnit, phone, supervisorName, supervisorPhone, notes },
      select: { id: true },
    });

    return { success: true as const, id: warehouse.id };
  } catch (err: unknown) {
    if (getPrismaCode(err) === "P2002" && hasTarget(err, "code")) {
      return { error: 'الكود "' + code + '" مستخدم مسبقًا' };
    }
    return { error: "حدث خطأ أثناء إنشاء المستودع" };
  }
}

export async function updateWarehouse(id: string, formData: FormData) {
  const session = await auth();
  requirePermission(session, "update", "warehouse");

  const code = (formData.get("code") as string)?.trim();
  const nameAr = (formData.get("nameAr") as string)?.trim();
  const nameEn = (formData.get("nameEn") as string)?.trim() || null;
  const type = formData.get("type") as WarehouseType;
  const status = formData.get("status") as RecordStatus;
  const capacity = formData.get("capacity") ? Number(formData.get("capacity")) : null;
  const capacityUnit = (formData.get("capacityUnit") as string)?.trim() || null;
  const phone = (formData.get("phone") as string)?.trim() || null;
  const supervisorName = (formData.get("supervisorName") as string)?.trim() || null;
  const supervisorPhone = (formData.get("supervisorPhone") as string)?.trim() || null;
  const notes = (formData.get("notes") as string)?.trim() || null;

  if (!code || !nameAr || !type) {
    return { error: "الكود والاسم والنوع مطلوبة" };
  }

  const validTypes: WarehouseType[] = ["MAIN", "TRANSIT", "RETURN", "DAMAGED", "COLD_STORAGE", "OTHER"];
  if (!validTypes.includes(type)) {
    return { error: "نوع المستودع غير صالح" };
  }

  const validStatuses: RecordStatus[] = ["ACTIVE", "INACTIVE", "SUSPENDED"];
  if (status && !validStatuses.includes(status)) {
    return { error: "حالة المستودع غير صالحة" };
  }

  try {
    await prisma.warehouse.update({
      where: { id },
      data: { code, nameAr, nameEn, type, status, capacity, capacityUnit, phone, supervisorName, supervisorPhone, notes },
    });

    return { success: true as const };
  } catch (err: unknown) {
    if (getPrismaCode(err) === "P2002" && hasTarget(err, "code")) {
      return { error: 'الكود "' + code + '" مستخدم مسبقًا' };
    }
    if (getPrismaCode(err) === "P2025") {
      return { error: "المستودع غير موجود" };
    }
    return { error: "حدث خطأ أثناء تحديث المستودع" };
  }
}

export async function toggleWarehouseStatus(id: string) {
  const session = await auth();
  requirePermission(session, "update", "warehouse");

  try {
    const wh = await prisma.warehouse.findUnique({ where: { id }, select: { status: true } });
    if (!wh) return { error: "المستودع غير موجود" };

    const newStatus: RecordStatus = wh.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    await prisma.warehouse.update({ where: { id }, data: { status: newStatus } });

    return { success: true as const };
  } catch {
    return { error: "حدث خطأ أثناء تحديث الحالة" };
  }
}
