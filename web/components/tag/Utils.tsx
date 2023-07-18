import { ItemRow } from "../../lib/hf-react"

type TagType = {
  name: string;
  handle: string;
  kind: string;
}

type TagListType = {
  tags: TagType[];
  collections: TagType[];
  lists: TagType[];
  favorite: boolean;
}

export function BuildTagList({item, hideTagHandle}): TagListType {
  let ret = {
    tags: [],
    collections: [],
    lists: [],
    favorite: false
  }

  // This is from the database
  if (item.file_tags) {
    for (let ft of item.file_tags) {
      if (ft.tag.kind == 'TAG') {
        if (ft.tag.handle != hideTagHandle) {
          ret.tags.push(ft.tag)
        }
      } else if (ft.tag.kind == 'COLLECTION') {
        if (ft.tag.handle != hideTagHandle) {
          ret.collections.push(ft.tag)
        }
      } else if (ft.tag.kind == 'LIST') {
        if (ft.tag.handle == "favorite") {
          ret.favorite = true
        } else {
          ret.lists.push(ft.tag)
        }
      } 
    }
    return ret
  }

  // This is from the search index
  if (item.tags && item.tagHandles) {
    for (let i = 0; i < item.tags.length; i++) {
      if (i < item.tagHandles.length) {
        if (item.tagHandles[i] != hideTagHandle) {
          ret.tags.push({
            handle: item.tagHandles[i],
            name: item.tags[i],
            kind: 'TAG'
          })
        }
      }
    }
  }

  if (item.collections && item.collectionHandles) {
    for (let i = 0; i < item.collections.length; i++) {
      if (i < item.collectionHandles.length) {
        if (item.tagHandles[i] != hideTagHandle) {
          ret.collections.push({
            handle: item.collectionHandles[i],
            name: item.collections[i],
            kind: 'COLLECTION'
          })
        }
      }
    }
  }

  if (item.lists && item.listHandles) {
    for (let i = 0; i < item.lists.length; i++) {
      if (i < item.collectionHandles.length) {
        if (item.lists[i].handle == 'favorite') {
          ret.favorite = true;
        }
      }
    }
  }
  return ret
}