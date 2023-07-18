export async function GetEntitiesCount(prisma, { entityType, entitySubType }): Promise<number> {
  const where: any = {};

  if (typeof entityType != "undefined") {
    where.entityType = entityType;
  }

  if (typeof entitySubType != "undefined") {
    where.entitySubType = entitySubType;
  }

  const count: number = await prisma.entity.count({
    where: where,
  });
  return count;
};
