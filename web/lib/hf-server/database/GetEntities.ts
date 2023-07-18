export async function GetEntities(prisma, { entityType, entitySubType, skip = 0, page = 0, take = 20 }) {
  const where: any = {};

  if (typeof entityType != "undefined") {
    where.entityType = entityType;
  }

  if (typeof entitySubType != "undefined") {
    where.entitySubType = entitySubType;
  }

  if (skip === 0 && page > 1) {
    skip = take * (page - 1);
  }

  const items = await prisma.entity.findMany({
    where: where,
    skip: skip,
    take: take,
    orderBy: {
      name: "asc",
    },
    select: {
      handle: true,
      name: true,
      entityType: true,
      entitySubType: true,
    },
  });
  console.log("ENTITIES", items);
  return items.length > 0 ? items : null;
}
