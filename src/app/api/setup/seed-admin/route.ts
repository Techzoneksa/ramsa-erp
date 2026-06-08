import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { seedAdmin, SeedError, type SeedAdminInput } from "@/lib/seed-admin.server";

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
      {
        error:
          "SEED_ADMIN_NAME, SEED_ADMIN_EMAIL, and SEED_ADMIN_PASSWORD must be set",
      },
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
    const result = await seedAdmin(prisma, { name, email, password } satisfies SeedAdminInput);

    return NextResponse.json({
      success: true,
      user: { id: result.user.id, email: result.user.email },
      role: result.role.name,
    });
  } catch (err: unknown) {
    if (err instanceof SeedError) {
      console.log(
        `[seed] failed at '${err.stage}' — ${err.errorName}(${err.code})`,
      );
      return NextResponse.json(
        {
          error: "Seed failed",
          stage: err.stage,
          errorName: err.errorName,
          code: err.code,
          ...(err.target ? { target: err.target } : {}),
        },
        { status: 500 },
      );
    }

    const message = err instanceof Error ? err.message : "Unknown error";
    console.log("[seed] unexpected error:", message);
    return NextResponse.json({ error: "Seed failed" }, { status: 500 });
  }
}
