export async function GetTagsCount(prisma, { kind }): Promise<number> {
  const where: any = {};

  if (typeof kind != "undefined") {
    where.kind = kind;
  }

  const count: number = await prisma.tag.count({
    where: where,
  });
  return count;
};
