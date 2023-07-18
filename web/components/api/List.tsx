import {TagI} from '../tag/Tag'
import axios from 'axios'

const MOCK_LIST_1 : TagI = {
  label: "Mock List Name 1",
  handle: "mock-list-name-1",
  kind: "LIST"
}

const MOCK_LIST_2 : TagI = {
  label: "Mock List Name 2",
  handle: "mock-list-name-2",
  kind: "LIST"
}

const MOCK_LISTS : TagI[] = [MOCK_LIST_1, MOCK_LIST_2]

/* Needed for the list management UI:
  GET /api/v1/lists returns the user's lists [{id, handle, name}]
  POST /api/v1/lists/search takes JSON {query} and returns search hits [{id, handle, name}]
  POST /api/v1/lists takes JSON {name} and returns new list {id, handle, name} or {error, reason}
  POST /api/v1/list-item/remove
  POST /api/v1/list-item/add
*/

export async function GetLists(tagNameQuery: string = null) {
  // GET /api/v1/lists returns the user's lists [{id, handle, name}]
  // POST /api/v1/lists/search takes JSON {query} and returns search hits [{id, handle, name}]
  let url = `/api/v1/tag/LIST?objectKind=FILE`
  url += `&tagName=${encodeURIComponent(tagNameQuery)}`
  return axios.get(url)
}

export async function CreateOrFetchList(label: string) : Promise<TagI> {
  // Suffices for:
  // POST /api/v1/lists takes JSON {name} and returns new list {id, handle, name} or {error, reason}
  let payload = {
    tagName: label
  }
  return axios.post(`/api/v1/tag/LIST`, payload)
}
 
export async function ToggleListAssociation(fileHandle: string | string[], listHandle: string, associated: boolean) : Promise<any> {
  // Suffices for:
  // POST /api/v1/list-item/remove
  // POST /api/v1/list-item/add
  let payload = {
    tagValue: associated,
    tagHandle: listHandle,
    objectHandle: fileHandle,
  }
  return axios.post(`/api/v1/tag/LIST/${listHandle}/FILE`, payload)
}