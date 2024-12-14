import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var _prisma: PrismaClient;
}

if (process.env.NODE_ENV !== "production") {
  if (!global._prisma) {
    global._prisma = new PrismaClient();
  }
}

const prisma: PrismaClient = global._prisma || new PrismaClient();

export default prisma;
