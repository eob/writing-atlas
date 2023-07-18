export async function GetBook(prisma, { bookhandle }) {
  const books = await prisma.file.findMany({
    select: {
      fileType: true,
      name: true,
      handle: true,
      summary: true,
      pageCount: true,
      profilePhoto: true,
      logline: true,
      fileRelationsAsSubject: {
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
      },
      entity_files: {
        select: {
          role: true,
          entity: {
            select: {
              name: true,
              handle: true,
              profilePhoto: true,
            },
          },
        },
      },
      entities: {
        select: {
          name: true,
          handle: true,
          entityStatistics: true,
        },
      },
      file_tags: {
        select: {
          tag: {
            select: {
              kind: true,
              handle: true,
              name: true,
            },
          },
        },
      },
      file_links: {
        select: {
          link: {
            select: {
              kind: true,
              url: true,
              name: true,
            },
          },
        },
      },
      textStatistics: true,
    },
    where: {
      handle: String(bookhandle),
    },
    take: 1,
  });

  if (books && books.length > 0) {
    return books[0];
  }
  return null;
}
