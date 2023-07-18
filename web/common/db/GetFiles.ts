import { TagI } from "../../components/tag/Tag"

export type GetFilesParams = {
  fileLinks?: boolean;
  fileSelect?: any;
  fileHandle?: string;
  withLoglines?: boolean;
  tagSelect?: any;
  tagPrivateTo?: string;
  tagHandle?: string;
  tagKind?: string;
  tags?: TagI[],
  authorTags?: TagI[],
  authorHandle?: string;
  skip?: number;
  page?: number;
  take?: number;
  takeEverything?: boolean;
}

export function makeDefaults(p: GetFilesParams): GetFilesParams {
  if (typeof p.withLoglines == 'undefined') {
    p.withLoglines = true
  }
  if (typeof p.skip == 'undefined') {
    p.skip = 0
  }
  if (typeof p.page == 'undefined') {
    p.page = 1
  }
  if (typeof p.take == 'undefined') {
    p.take = 20
  }
  if (typeof p.fileLinks == 'undefined') {
    p.fileLinks = false
  }
  if (typeof p.fileSelect == 'undefined') {
    p.fileSelect = null
  }
  if (typeof p.tagSelect == 'undefined') {
    p.tagSelect = null
  }
  if (typeof p.takeEverything == 'undefined') {
    p.takeEverything = false
  }
  return p
}

function HasTagClause(tag: TagI, property: string) {
  let tagWhere = {};

  if (tag.handle && (tag.handle != 'all')) {
    tagWhere['handle'] = {equals: String(tag.handle)}
  }
  if (tag.kind) {
    tagWhere['kind'] = {equals: String(tag.kind)}
  }
  if (tag.subKind) {
    tagWhere['subKind'] = {equals: String(tag.subKind)}
  }
  let ret = {};
  ret[property] = {
    some: {
      tag: tagWhere
    }
  }
  return ret;
}

export function GetFindClause(params: GetFilesParams): any {
  let {
    fileLinks,
    fileSelect,
    fileHandle,
    withLoglines,
    tagSelect,
    tagPrivateTo,
    tagHandle,
    tagKind,
    tags,
    authorTags,
    authorHandle,
    skip,
    page,
    take,
    takeEverything  // @eric-zhizu: If true, then take all results, ignoring skip, page and take parameters
  } = params;

  if (skip === 0 && page > 1) {
    skip = take * (page - 1);
  }

  // TAG
  let tagWhere = {}
  // 'all' can be used here to return items with any tagHandle. This can be used
  // with privateTo to return both favorites and custom user lists.
  if (tagHandle && tagHandle !== 'all') {
    tagWhere['handle'] = {equals: String(tagHandle)}
  }
  if (tagKind) {
    tagWhere['kind'] = {equals: String(tagKind)}
  }

  let tagSelectFinal: any = tagSelect === null ? {
    handle: true,
    name: true,
    kind: true,
    subKind: true,
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
  } : tagSelect;

  let fileTagWhere = {}
  if (tagPrivateTo) {
    fileTagWhere = {
      OR: [
        {
          privateTo: String(tagPrivateTo)
        },
        {
          privateTo: null
        }
      ]
    }
  } else {
    fileTagWhere = {
      privateTo: null
    }
  }

  let fileTagWhereWhereSome = {}
  if (tagPrivateTo) {
    fileTagWhereWhereSome = {
      privateTo: { equals: String(tagPrivateTo) }
    }
  }

  // Retrieve files that have a tag equal to tagWhere and is private to fileTagWhereSome
  let singleTagWhere = {}
  // If tagWhere and fileTagWhereSome are non-empty
  if (Object.keys(tagWhere).length > 0 || Object.keys(fileTagWhereWhereSome).length > 0) {
    singleTagWhere = { file_tags: {
        some: {
          tag: tagWhere,
          ...fileTagWhereWhereSome
        }
      }
    }
  }

  let fileWhere = {}
  if (fileHandle) {
    fileWhere['handle'] = {equals: String(fileHandle)}
  }
  if (withLoglines) {
    fileWhere['logline'] = {not: null}
  }
  let fileSelectFinal = (fileSelect === null) ? {
    handle: true,
    wordCount: true,
    name: true,
    logline: true,
    profilePhoto: true,
    publishedDate: true,
    summary: true,
    storyTextURL: true,
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
    }
  } : fileSelect;

  let entityWhere = {}

  let authorWheres = {}
  if (authorTags) {
    // let wheres = authorTags.map((tag) => HasTagClause(tag, 'entity_tag'));
    // authorWheres = {
    //   entity_files: {
    //     some: {
    //       // role: 'AUTHOR',
    //       entity: {
    //         AND: wheres
    //       }
    //     }
    //   }
    // }
  }

  if (authorHandle) {
    entityWhere = {
      entity_files: {
        some: {
          // role: 'AUTHOR',
          entity: {
            handle: {equals: String(authorHandle)} 
          }
        }
      }
    }
  }

  let tagWheres = []
  if (tags) {
    tagWheres = tags.map((tag) => HasTagClause(tag, 'file_tags'));
  }

  const whereClauses = {
    AND: [
      fileWhere,
      entityWhere,
      authorWheres,
      singleTagWhere, // May contain "privateTo" which allows for user-specific lists
      ...tagWheres
    ]
  }

  let findClause = {
    orderBy: {
      name: "asc",
    },
    where: whereClauses,
    select: {
      file_tags: {
        where: {
          ...fileTagWhere
        },
        select: {
          role: true,
          year: true,
          tag: {
            select: tagSelectFinal
          },
        }
      },
      ...fileSelectFinal
    }
  }

  // @eric-zhizu: Only take a subset if takeEverything is false
  if (!takeEverything) {
    findClause["skip"] = skip
    findClause["take"] = take
  }

  if (fileLinks) {
    findClause.select = {
      file_links: {
        select: {
          link: {
            select: {
              kind: true,
              url: true,
              name: true    
            }
          }
        }
      },
      ...findClause.select
    }
  }
  return findClause
}

export async function GetFiles(prisma, p: GetFilesParams) {
  const findClause = GetFindClause(makeDefaults(p))
  const items = await prisma.file.findMany(findClause);
  return items
}
