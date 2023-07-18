export async function GetTags(prisma, {
  kind, 
  handle = undefined, 
  fileTagPrivateTo = undefined, 
  mostPopular = undefined, 
  subKind = undefined, 
  filterFileCount = true, 
  includeFileHandles = false,
  nameContains = undefined,
  includeTagTags = undefined,
  includeTagTagRole = undefined,
  withinHandles = undefined,
  skip = 0, 
  page = 0, 
  take = 20 
}) {
  const where: any = {};
  let select: any = {
    handle: true,
    name: true,
    kind: true,
    subKind: true,
    fileCount: true
  };
  let orderBy: any = {};

  if (typeof kind != "undefined") {
    where.kind = kind;
  }

  if (typeof handle != "undefined") {
    where.handle = handle;
  }

  if (typeof subKind != "undefined") {
    where.subKind = subKind;
  }

  if (typeof withinHandles != "undefined") {
    where.handle = {
      in: withinHandles.filter((x) => ((x != null) && (typeof x != 'undefined')))
    }
  }

  if (skip === 0 && page > 1) {
    skip = take * (page - 1);
  }

  if (typeof includeTagTags != "undefined") {
    let tagTagRole = {}
    if (includeTagTagRole) {
      tagTagRole = {
        where: {
          relationType: includeTagTagRole
        }
      }
    }
    select["tagRelationsAsSubject"] = {
      ...tagTagRole,
      select: {
        object: {
          select: {
            handle: true
          }
        }
      }
    }
  }

  let items = [];
  if (mostPopular === true) {
    orderBy = {
      fileCount: "desc"
    };
  } else {
    orderBy = {
      name: "asc"
    };  
  }

  const providerDB = prisma._engineConfig.activeProvider

  if (nameContains) {
    providerDB === 'sqlite'
      ?
      where.name = {
        contains: nameContains
      }
      :
      where.name = {
        contains: nameContains,
        mode: "insensitive"
      }
  }

  if (filterFileCount) {
    where.fileCount = {
      gt: 0
    }    
  }

  if (includeFileHandles) {
    select.file_tags = {
      select: {
        file: {
          select: {
            handle: true
          }
        }
      }
    }
  }

  if (fileTagPrivateTo) {
    where.file_tags = {
      some: { 
        createdBy: { equals: fileTagPrivateTo }
      }
    }
  }

  let query = {
    select, where, skip, take, orderBy,
  };
  
  items = await prisma.tag.findMany(query);
  return items.length > 0 ? items : null;
}



export function AuthorizeGetTags({tagKind, objectKind}) {
  // A user can only toggle the "Favorite" tag
  if (!(
    (tagKind === 'LIST') || 
    (tagKind === 'TAG')
  )) {
    throw Error("You can only get LIST and TAG tags.")
  }
  if (!(
    (objectKind === 'FILE') ||
    (objectKind === 'ENTITY')
    )) {
    throw Error("You can only get LIST and TAG tags.")
  }
  // TODO: only paid users can do this
  // if (tagHandle != "favorite") {
  //   throw Error("You can only set the Favorite tag.")
  // }
}