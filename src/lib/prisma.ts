import "server-only";
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  const isPlaceholder = process.env.DATABASE_URL?.includes("user:password");
  
  if (isPlaceholder) {
    console.warn("[PRISMA] Virtual Mode: Placeholder DATABASE_URL detected. Database features will be unavailable.");
  } else {
    console.log("[PRISMA] Initializing new client... DB_URL exists:", !!process.env.DATABASE_URL);
  }

  return new PrismaClient({
    log: ["error", "warn"],
  });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
