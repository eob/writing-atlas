import { PrismaClient as PrismaClientOG } from '@prisma/client'


export function CreateSqliteClient() {
  const path = require('path');
  let DB = path.join(process.cwd(), '..', 'data', 'live', 'dev.db')
  const prisma = new PrismaClientOG({
    datasources: {
      db: {
       url: `file:${DB}`
     }
    },
  })
  return prisma
}
declare global {
  var globalPrisma: PrismaClientOG
}

export default function PrismaClient() {
  let prisma: PrismaClientOG
  // check to use this workaround only in development and not in production
  if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClientOG()
  } else {
    if (!global.globalPrisma) {
      global.globalPrisma = new PrismaClientOG()
    }
    prisma = global.globalPrisma
  }
  return prisma;
}
