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

  try {
    const role = await prisma.role.upsert({
      where: { name: "SYSTEM_ADMIN" },
      update: { description: "مدير النظام — كامل الصلاحيات" },
      create: {
        name: "SYSTEM_ADMIN",
        description: "مدير النظام — كامل الصلاحيات",
        isSystem: true,
      },
    });

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.upsert({
      where: { email },
      update: { name, passwordHash, status: "ACTIVE" },
      create: { name, email, passwordHash, status: "ACTIVE", locale: "AR" },
      select: { id: true, email: true, name: true },
    });

    await prisma.userRole.upsert({
      where: { userId_roleId: { userId: user.id, roleId: role.id } },
      update: {},
      create: { userId: user.id, roleId: role.id },
    });

    return NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email },
      role: role.name,
    });
  } catch {
    return NextResponse.json(
      { error: "Seed failed" },
      { status: 500 },
    );
  }
}
