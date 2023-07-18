import {Tag} from '../tag/Tag'
import { BookStat } from '../book/BookStats'

export function Related({handle, items=null, files=null, caption}) {
  var list = null;
  if (items) {
    list = items.filter(
      x => x.object && x.object.handle && x.object.name && (x.object.handle != handle)
    ).map(tagTag => {
      return <Tag label={tagTag.object.name} handle={tagTag.object.handle} kind="TAG" color="green" />
    })
  } else if (files) {
    list = files.filter(
      x => x.object && x.object.handle && x.object.name && (x.object.handle != handle)
    ).map((bookBook) => {
      return <a href={`/story/${bookBook.object.handle}`}>{bookBook.object.title}</a>
    })
  }
  return (
    <div className="text-center text-gray-500 mb-8 mx-auto">
      <span className="italic mr-2">{caption} <br /></span>
      {list}
    </div>
  )
}
