import { PrismaClient } from "@prisma/client/edge";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const connectionString = "file:./dev.db";  // SQLite dosyamız

const adapter = new PrismaBetterSqlite3({ url: connectionString });

const prismaClientSingleton = () => {
  return new PrismaClient({
    adapter,
    log: ["query"], // dev ortamında sorgu gösterir (istersen kaldır)
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
