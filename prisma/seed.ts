import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const name = process.env.SEED_ADMIN_NAME;
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!name || !email || !password) {
    console.error("SEED_ADMIN_NAME, SEED_ADMIN_EMAIL, and SEED_ADMIN_PASSWORD must be set");
    process.exit(1);
  }

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
  });

  await prisma.userRole.upsert({
    where: { userId_roleId: { userId: user.id, roleId: role.id } },
    update: {},
    create: { userId: user.id, roleId: role.id },
  });

  console.log(`Seed complete: ${user.email} → ${role.name}`);
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
