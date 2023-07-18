export async function SetTagFileAssociation(prisma, {tag, privateTo, objectHandle, tagValue}) {
  const tagId = tag.id;

  // Get the file
  const file = await prisma.file.findFirst({
    where: { handle: objectHandle }
  })
  if (file === null) {
    throw Error(`No file by the handle: ${objectHandle}`)
  }
  const fileId = file.id;

  // Toggle the tag
  let ft = await prisma.file_tag.findFirst({
    where: { fileId, tagId, privateTo },
  });

  if (tagValue === true) {
    if (ft === null) {
      await prisma.file_tag.create({
        data: { fileId, tagId, privateTo, createdBy: privateTo }
      })
    }  
  } else if (tagValue === false) {
    if (!(ft === null)) {
      await prisma.file_tag.delete({
        where: { id: ft.id }
      })  
    }
  } 
}

export async function SetTagAssociation(prisma, {tagSubKind, tagKind, tagHandle, tagName, privateTo, objectKind, objectHandle, tagValue}) {
  
  // First upsert the tag
  let tag = await prisma.tag.findFirst({
    where: { handle: tagHandle, kind: tagKind, subKind: tagSubKind }
  })
  if (tag === null) {
    // TODO: Fail here.
    tag = await prisma.tag.create({
      data: { handle: tagHandle, kind: tagKind, name: tagName, subKind: tagSubKind, isPublic: true }
    })  
  }
  
  if (objectKind == 'FILE') {
    return SetTagFileAssociation(prisma, {tag, privateTo, objectHandle, tagValue})
  } else {
    throw Error(`Unsupported objectKind: ${objectKind}`);
  }
}

import { GetFiles } from './GetFiles'

export async function GetTagAssociation(prisma, {objectKind, tagKind, tagHandle = 'favorite', userId}) {  

  if (objectKind == 'FILE') {
    let files = await GetFiles(prisma, {
      tagPrivateTo: userId,
      tagHandle,
      tagKind,
      fileSelect: { handle: true }
    });
  
    let ret = {};
    if (files) {
      for (let file of files) {
        ret[file.handle] = file
      }  
    }
    return ret
  } else {
    throw Error(`Unsupported objectKind: ${objectKind}`);
  }

}

/////////// CHECKERS

export function AuthorizeSetTagAssociation({uid, tagValue, tagHandle, tagName, tagKind, tagSubKind, objectKind, objectHandle}) {
  // A user can only toggle the "Favorite" tag
  if (!((objectKind === 'FILE'))) {
    throw Error("You can only set tags upon FILE objects.")
  }
  // A user can only toggle the "Favorite" tag
  if (!((tagKind === 'LIST'))) {
    throw Error("You can only set LIST tags.")
  }
  // TODO(ted): If the user is not paid, they should only be able to favorite.
  // if (tagName != "Favorite") {
  //   throw Error("You can only set the Favorite tag.")
  // }
  if (!((tagValue === true) || (tagValue === false))) {
    throw Error("You can only set a tag's value to true or false.")
  }
}

export function AuthorizeGetTagAssociation({tagHandle, tagKind, objectKind}) {
  // A user can only toggle the "Favorite" tag
  if (!((objectKind === 'FILE'))) {
    throw Error("You can only get tags upon FILE objects.")
  }
  // A user can only toggle the "Favorite" tag
  if (!((tagKind === 'LIST'))) {
    throw Error("You can only get LIST tags.")
  }
  // TODO: only paid users can do this
  // if (tagHandle != "favorite") {
  //   throw Error("You can only set the Favorite tag.")
  // }
}