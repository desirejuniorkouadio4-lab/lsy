import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
// @ts-ignore
import { PrismaClient } from "../app/generated/prisma/client";
import bcrypt from "bcryptjs";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter } as any);

const TEST_USERS = [
  {
    name: "Kofi Asante",
    email: "eleve@lsy.ci",
    password: "EleveLSY2026!",
    role: "STUDENT",
  },
  {
    name: "Ama Konan",
    email: "parent@lsy.ci",
    password: "ParentLSY2026!",
    role: "PARENT",
  },
  {
    name: "Prof. Diallo",
    email: "enseignant@lsy.ci",
    password: "EnseignantLSY2026!",
    role: "TEACHER",
  },
];

async function main() {
  console.log("Création des utilisateurs test…\n");

  for (const u of TEST_USERS) {
    const hashed = await bcrypt.hash(u.password, 12);
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: { name: u.name, password: hashed, role: u.role, isActive: true },
      create: { name: u.name, email: u.email, password: hashed, role: u.role, isActive: true },
    });
    console.log(`✓ ${user.role.padEnd(10)} ${user.email}  →  mot de passe : ${u.password}`);
  }

  console.log("\n✅ Terminé !");
  await pool.end();
}

main().catch((e) => { console.error(e); process.exit(1); });
