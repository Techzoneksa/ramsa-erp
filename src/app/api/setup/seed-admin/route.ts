import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const setupSecret = process.env.SETUP_SECRET;

  if (!setupSecret) {
    return NextResponse.json(
      { error: "SETUP_SECRET is not configured on the server" },
      { status: 500 },
    );
  }

  const headerSecret = request.headers.get("x-setup-secret");

  if (!headerSecret || headerSecret !== setupSecret) {
    return NextResponse.json(
      { error: "Unauthorized — invalid or missing x-setup-secret header" },
      { status: 401 },
    );
  }

  const name = process.env.SEED_ADMIN_NAME;
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "SEED_ADMIN_NAME, SEED_ADMIN_EMAIL, and SEED_ADMIN_PASSWORD must be set" },
      { status: 500 },
    );
  }

  const envCheck = {
    name: !!name,
    email: !!email,
    password: !!password,
  };
  console.log("[seed] env vars present:", JSON.stringify(envCheck));

  try {
    console.log("[seed] stage: role upsert");
    const role = await prisma.role.upsert({
      where: { name: "SYSTEM_ADMIN" },
      update: { description: "مدير النظام — كامل الصلاحيات" },
      create: {
        name: "SYSTEM_ADMIN",
        description: "مدير النظام — كامل الصلاحيات",
        isSystem: true,
      },
    });
    console.log("[seed] stage: role ok");

    console.log("[seed] stage: password hash");
    const passwordHash = await bcrypt.hash(password, 12);

    console.log("[seed] stage: user upsert");
    const user = await prisma.user.upsert({
      where: { email },
      update: { name, passwordHash, status: "ACTIVE" },
      create: { name, email, passwordHash, status: "ACTIVE", locale: "AR" },
      select: { id: true, email: true, name: true },
    });
    console.log("[seed] stage: user ok");

    console.log("[seed] stage: userRole upsert");
    await prisma.userRole.upsert({
      where: { userId_roleId: { userId: user.id, roleId: role.id } },
      update: {},
      create: { userId: user.id, roleId: role.id },
    });
    console.log("[seed] stage: userRole ok");

    return NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email },
      role: role.name,
    });
  } catch (err: unknown) {
    const prismaErr = err as { code?: string; meta?: object; message?: string };
    const code = prismaErr.code ?? "UNKNOWN";
    console.log(`[seed] failed at stage — error code: ${code}`);
    return NextResponse.json(
      { error: "Seed failed", stage: "see server logs", code },
      { status: 500 },
    );
  }
}
