"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export interface ActionResult {
  success?: true;
  error?: string;
}

export async function createFirstAdmin(formData: FormData): Promise<ActionResult> {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!name || !email || !password || !confirmPassword) {
    return { error: "جميع الحقول مطلوبة" };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "البريد الإلكتروني غير صالح" };
  }

  if (password.length < 10) {
    return { error: "كلمة المرور يجب أن تكون 10 أحرف على الأقل" };
  }

  if (password !== confirmPassword) {
    return { error: "كلمة المرور وتأكيدها غير متطابقين" };
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      const count = await tx.user.count();

      if (count > 0) {
        throw new Error("SETUP_ALREADY_COMPLETED");
      }

      const passwordHash = await bcrypt.hash(password, 12);

      const role = await tx.role.upsert({
        where: { name: "SYSTEM_ADMIN" },
        update: {},
        create: {
          name: "SYSTEM_ADMIN",
          description: "مدير النظام — كامل الصلاحيات",
          isSystem: true,
        },
      });

      const user = await tx.user.create({
        data: {
          name,
          email,
          passwordHash,
          status: "ACTIVE",
          locale: "AR",
        },
        select: { id: true, email: true },
      });

      await tx.userRole.create({
        data: { userId: user.id, roleId: role.id },
      });

      return { email: user.email };
    });

    console.log(`[setup] admin created: ${result.email}`);
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    if (message === "SETUP_ALREADY_COMPLETED") {
      return { error: "تم إعداد النظام مسبقًا" };
    }
    console.error("[setup] error:", message);
    return { error: "حدث خطأ غير متوقع" };
  }
}
