export async function GetTags(prisma, { kind, skip = 0, page = 0, take = 20 }) {
  const where: any = {};

  if (typeof kind != "undefined") {
    where.kind = kind;
  }

  if (skip === 0 && page > 1) {
    skip = take * (page - 1);
  }

  const items = await prisma.tag.findMany({
    where: where,
    skip: skip,
    take: take,
    orderBy: {
      name: "asc",
    },
    select: {
      handle: true,
      name: true,
      kind: true,
    },
  });
  return items.length > 0 ? items : null;
}
