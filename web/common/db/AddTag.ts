import slugify from 'slugify'

export async function AddTag(prisma, {tagSubKind, tagKind, tagName, userId}) {
  let findParams = {    
    where: { kind: {equals: tagKind}, subKind: {equals: tagSubKind}, name: {equals: tagName} }
  }
  let tag = await prisma.tag.findFirst(findParams)

  if (tag == null) {
    let tagHandle = slugify(tagName, {
      lower: true,      // convert to lower case, defaults to `false`
      strict: true,     // strip special characters except replacement, defaults to `false`    
    })

    tag = await prisma.tag.create({
      data: { 
        handle: tagHandle, 
        kind: tagKind, 
        name: tagName, 
        subKind: tagSubKind, 
        isPublic: true 
      }
    })  
  }
  return tag  
}

export function AuthorizeAddTag({tagKind}) {
  // A user can only toggle the "Favorite" tag
  if (!((tagKind === 'LIST'))) {
    throw Error("You can only get LIST tags.")
  }
  // TODO: only paid users can do this
  // if (tagHandle != "favorite") {
  //   throw Error("You can only set the Favorite tag.")
  // }
}