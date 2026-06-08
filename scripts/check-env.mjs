// Pre-flight check: ensure required environment variables exist before running Prisma commands.
// Exit codes: 0 = all ok, 1 = missing variable(s).

const required = [
  ["DATABASE_URL", "Pooled connection URL for Prisma at runtime"],
  ["DIRECT_URL",   "Direct connection URL for Prisma migrations"],
];

let exitCode = 0;

for (const [name, purpose] of required) {
  if (!process.env[name]) {
    console.error(`ERROR: ${name} is not set — ${purpose}`);
    exitCode = 1;
  }
}

process.exit(exitCode);
