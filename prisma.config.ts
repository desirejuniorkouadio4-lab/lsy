import "dotenv/config";
import { defineConfig } from "prisma/config";

// Prisma 7 : les URLs de connexion vivent ici (pour la CLI/Migrate), plus dans le schéma.
// Au runtime, PrismaClient reçoit un driver adapter (cf. lib/db.ts).
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // URL non-poolée pour que la CLI Prisma puisse exécuter des DDL (db push, migrate)
    url: process.env["DATABASE_URL_UNPOOLED"] ?? process.env["DATABASE_URL"],
  },
});
