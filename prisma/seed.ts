import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function seedAdmin() {
  return prisma.user.create({
    data: {
      name: "Admin Prakash",
      email: "admin@test.com",
      emailVerified: new Date(),
      password: await bcrypt.hash("password", 10),
      role: "ADMIN",
      permissions: ["CREATE", "EDIT", "DELETE"],
    },
  });
}

async function main() {
  await seedAdmin();
}

main()
  .catch((e) => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
