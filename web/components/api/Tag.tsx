import { TagI } from "../tag/Tag";
import axios from 'axios'

export type TagKind = "HONOR" | "TAG" | "IFYOULIKE" | "LIST" | "COLLECTION"
export type TagSubKind = "Gender" | "Nationality" | "Ethnicity" | "Genre"
export type TagTargetKind = "FILE" | "ENTITY"

export async function ListTagsForAsyncSelect(
  query: string,
  kind: TagKind,
  targetKind: TagTargetKind,
  subKind?: TagSubKind
) : Promise<TagI[]> {
  if (!kind) {
    kind = "TAG"
  }

  let url = `/api/v1/tag/${kind}?objectKind=${targetKind}`
  url += `&tagName=${encodeURIComponent(query)}`
  if (subKind) {
    url += `&tagSubKind=${encodeURIComponent(subKind)}`
  }
  try {
    let res = await axios.get(url)
    if (res && res.data && res.data.data) {
      return res.data.data.map(({ name, handle }) => ({
        label: name,
        value: handle
      }));
    }
    return [];
  } catch(ex) {
    console.log(ex);
    return []
  }
}
