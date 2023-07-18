export default async function GetTag(prisma, {handle, kind, includeFiles = false, includeSimilar = false, skip = 0, page = 0, take = 20}) {
  if (skip === 0 && page > 1) {
    skip = take * (page - 1);
  }

  let alsoSimilar = includeSimilar ? {
    tagRelationsAsSubject: {
      select: {
        object: {
          select: {
            name: true,
            handle: true
          }
        }
      },
      where: {
        relationType: {
          equals: "SIMILAR"
        }
      }
    }
  } : {};

  let alsoFiles = includeFiles ? {
    file_tags: {
      skip: skip,
      take: take,
      select: {
        file: {
          select: {
            handle: true,
            name: true,
            logline: true,
            profilePhoto: true,
            publishedDate: true,
            summary: true,
            entity_files: {
              select: {
                role: true,
                entity: {
                  select: {
                    handle: true,
                    name: true    
                  }
                }
              }
            },
            file_tags: {
              select: {
                tag: {
                  select: {
                    kind: true,
                    handle: true,
                    name: true    
                  }
                }
              }
            }
          }
        }
      }
    }
  } : {};

  const items = await prisma.tag.findMany({
    where: {
      handle: String(handle),
      kind: kind
    },
    select: {
      handle: true,
      name: true,
      kind: true,
      ...alsoFiles,
      ...alsoSimilar
    },
    take: 1
  });
  const item = items.length > 0 ? items[0] : null  
  return item
}
