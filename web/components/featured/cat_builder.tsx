import {GetTags} from '../../common/db/GetTags'
import {GetEntities} from '../../common/db/GetEntities'
import {CATS} from './cats'

/** @brief Return top take tags of a particular subkind where take is an integer
 *
 */
async function GetTopBaseTags(prisma, {kind, subKind, take}) {
  // The problem is that the counts are on the subkind-free tags, but the
  // specificity is in the subkind pool.

  // First get the RANGE of the subkind
  const tags = await GetTags(prisma, {kind, subKind, filterFileCount: false, includeTagTags: true, includeTagTagRole: "PARENT"})

  if (tags == null) {
    return null
  }

  // Now compute the subkind-free version
  // Filter for tags which are PARENTs in the tag_tag table
  // E.g., "tag--genre--westerns" is the parent of "tag--westerns"
  const handles = tags.map((tag) => {
    for (let tagTag of tag.tagRelationsAsSubject) {
      if (tagTag && tagTag.object) { 
        return tagTag.object.handle
      }
    }
  })

  // Now get the top tags within that range
  const topTags = await GetTags(prisma, {
    kind: "TAG",
    withinHandles: handles,
    mostPopular: true,
    take: take
  })  

  return topTags;
}

async function loadTagLinks(prisma, cat) {
  if (cat.subKinds) {
    for (let subKind of cat.subKinds) {
      const tags = await GetTopBaseTags(prisma, {kind: cat.kind, subKind: subKind, take: cat.take})
      if (tags) {
        for (let tag of tags) {
          cat.links.push(tag)
        }  
      }
    }    
  } else {
    const tags = await GetTags(prisma, {
      kind: cat.kind,
      mostPopular: true,
      take: cat.take
    }) 
    if (tags) {
      for (let tag of tags) {
        cat.links.push(tag)
      }  
    }
  }
}

async function loadEntityLinks(prisma, cat) {
  if (cat.names) {
    const es = await GetEntities(prisma, {names: cat.names, entityType: cat.entityType, entitySubType: cat.entitySubType})
    if (es) {
      for (let e of es) {
        cat.links.push({
          name: e.name, handle: e.handle
        })
      }
    }
  } else {
    const es = await GetEntities(prisma, {
      entityType: cat.entityType, 
      entitySubType: cat.entitySubType,
      mostPopular: true,
      take: cat.take
    }) 
    if (es) {
      for (let e of es) {
        cat.links.push({
          name: e.name, handle: e.handle
        })
      }  
    }

  }
}

/** @brief Build home page categories for top-level tags */
export async function BuildCats(prisma) {
  let links = []
  for (let cat of CATS) {  
    // cat["links"]: a manual list of honors/awards for the category
    if (typeof cat["links"] == "undefined") {
      cat["links"] = []
    }  
    if (["TAG", "IFYOULIKE", "COLLECTION", "HONOR"].indexOf(cat.kind) > -1) {
      await loadTagLinks(prisma, cat)
    } else if (cat.kind == "ENTITY") {
      await loadEntityLinks(prisma, cat)
    } else {
    }
    links.push(cat)
  }
  return links
}
