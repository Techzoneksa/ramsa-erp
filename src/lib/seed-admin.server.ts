import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export interface SeedAdminInput {
  name: string;
  email: string;
  password: string;
}

export interface SeedAdminResult {
  user: { id: string; email: string | null };
  role: { name: string };
}

export class SeedError extends Error {
  stage: string;
  code: string;
  errorName: string;
  target?: unknown;

  constructor(stage: string, original: unknown) {
    const err = original as Record<string, unknown>;
    const message =
      typeof err.message === "string" ? err.message : String(original);
    super(message);
    this.name = "SeedError";
    this.stage = stage;
    this.code = typeof err.code === "string" ? err.code : "UNKNOWN";
    this.errorName = typeof err.name === "string" ? err.name : "Error";
    const meta = err.meta;
    if (meta && typeof meta === "object" && !Array.isArray(meta)) {
      this.target = (meta as Record<string, unknown>).target;
    }
  }
}

export async function seedAdmin(
  prisma: PrismaClient,
  input: SeedAdminInput,
): Promise<SeedAdminResult> {
  let stage = "role upsert";
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

    stage = "password hash";
    const passwordHash = await bcrypt.hash(input.password, 12);

    stage = "user upsert";
    const user = await prisma.user.upsert({
      where: { email: input.email },
      update: { name: input.name, passwordHash, status: "ACTIVE" },
      create: {
        name: input.name,
        email: input.email,
        passwordHash,
        status: "ACTIVE",
        locale: "AR",
      },
      select: { id: true, email: true },
    });

    stage = "userRole upsert";
    await prisma.userRole.upsert({
      where: { userId_roleId: { userId: user.id, roleId: role.id } },
      update: {},
      create: { userId: user.id, roleId: role.id },
    });

    return { user, role: { name: role.name } };
  } catch (err) {
    throw new SeedError(stage, err);
  }
}
