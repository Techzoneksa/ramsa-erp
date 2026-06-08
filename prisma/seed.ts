import { PrismaClient } from "@prisma/client";
import { seedAdmin, SeedError } from "@/lib/seed-admin.server";

const prisma = new PrismaClient();

async function main() {
  const name = process.env.SEED_ADMIN_NAME;
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!name || !email || !password) {
    console.error(
      "SEED_ADMIN_NAME, SEED_ADMIN_EMAIL, and SEED_ADMIN_PASSWORD must be set",
    );
    process.exit(1);
  }

  const result = await seedAdmin(prisma, { name, email, password });
  console.log(`Seed complete: ${result.user.email} → ${result.role.name}`);
}

main()
  .catch((e) => {
    if (e instanceof SeedError) {
      console.error(`Seed failed at '${e.stage}': ${e.message}`);
    } else {
      console.error("Seed failed:", e);
    }
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
