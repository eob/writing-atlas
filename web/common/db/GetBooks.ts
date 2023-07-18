import { UserProvider } from "../../lib/hf-react/account/UserLib";

export async function GetBooks(prisma, { authorhandle, publicationhandle, privateTo }) {
  let where = {};
  let select = {
    fileType: true,
    name: true,
    handle: true,
    summary: true,
    wordCount: true,
    profilePhoto: true,
    logline: true,
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
        entityStatistics: true,
      },
    },
    file_tags: {
      where: {
        privateTo: null
      },
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
    textStatistics: true,
  };

  let finalSelect: any = select;

  if (authorhandle) {
    finalSelect = {
      file: {
        select,
      },
    };
    where = {
      entity: {
        handle: String(authorhandle),
      },
    };
  }

  if (publicationhandle) {
    finalSelect = {
      file: {
        select,
      },
    };
    where = {
      entity: {
        handle: String(publicationhandle),
      },
    };
  }
  if (authorhandle || publicationhandle) {
    const entity_files = await prisma.entity_file.findMany({
      select: finalSelect,
      where,
    });

    if (entity_files && entity_files.length > 0) {
      const books = entity_files.map((ef) => ef.file);
      return books;
    }
  } else {
    const books = await prisma.file.findMany({
      select: finalSelect,
      where,
    });

    if (books && books.length > 0) {
      return books;
    }
  }

  return null;
}
