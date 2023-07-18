export async function GetTagsCount(prisma, { 
  kind ,
  filterFileCount = true, 
  fileTagPrivateTo = undefined
}): Promise<number> {
  const where: any = {};

  if (typeof kind != "undefined") {
    where.kind = kind;
  }

  if (filterFileCount) {
    where.fileCount = {
      gt: 0
    }    
  }
  if (fileTagPrivateTo) {
    where.file_tags = {
      some: { 
        createdBy: { equals: fileTagPrivateTo }
      }
    }
  }

  const count: number = await prisma.tag.count({
    where: where,
  });
  return count;
};
