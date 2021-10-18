import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  errorFormat: 'pretty',
});

export const { user, room } = prisma;
export default prisma;
