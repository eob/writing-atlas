import { Img } from 'react-image'
import { Tag } from '../tag/Tag'
import { ItemRow } from '../lists/ItemRow'
import GetAuthorFromBook from '../../common/db/GetAuthorFromBook'
import { BuildTagList } from '../../components/tag/Utils'
import { getPublicationDate } from '../../components/book/DataExtractors'
var ellipsis = require('text-ellipsis');
const URL_BASE = 'https://storage.googleapis.com/covers.data.robotbookclub.com'

export default function BookRow({ item, author, hideTagHandle, user, loading }) {
  let authorUrl = null
  let bookUrl = `/story/${item.handle}`
  let authorName = null

  let entities = GetAuthorFromBook(item, author)
  let theAuthor = entities.author;
  let thePublication = entities.publication;

  let tagList = BuildTagList({ item, hideTagHandle })

  if (theAuthor) {
    authorUrl = `/author/${theAuthor.handle}`
    authorName = theAuthor.name
  }

  var shortSummary = item.summary ? ((item.summary.length > 500) ? ellipsis(item.summary, 500) : item.summary) : null;
  let abstract = (item.logline != null && item.logline.length > 0) ? item.logline : shortSummary;
  // var shortAbstract = abstract ? ((abstract.length > 500) ? ellipsis(abstract, 500) : abstract) : null;
  var shortAbstract = abstract;

  let pd = getPublicationDate({ book: item })
  let iconHref = item.profilePhoto || null;
  let iconAlt = item.profilePhoto ? `${item.name} Cover` : 'No cover available.';

  let rowTags = tagList.tags.map((t, i) => <Tag key={`${t.handle}-${i}`} handle={t.handle} label={t.name} kind={t.kind} color="green" />)
  let rowCollections = tagList.collections.map((t, i) => <Tag key={`${t.handle}-${i}`} handle={t.handle} label={t.name} kind={t.kind} color="blue" />)
  let rowLists = tagList.lists.map((t, i) => <><Tag key={`${t.handle}-${i}`} handle={t.handle} label={`List: ${t.name}`} kind={t.kind} color="blue" deletable objectHandle={item.handle} /></>)

  return (
    <ItemRow
      title={item.name}
      subtitle={shortAbstract}
      href={bookUrl}
      key={item.handle}
      iconHref={iconHref}
      iconAlt={iconAlt}
      author={authorName}
      authorHref={authorUrl}
      publication={thePublication ? thePublication.name : null}
      publicationHref={thePublication ? `/publication/${thePublication.handle}` : null}
      wordCount={item.wordCount}
      dateTime={pd}
      offersList={true}
      tags={rowLists.concat(rowCollections, rowTags)}
      user={user}
      loading={loading}
      offersHeart={true}
      hearted={tagList.favorite}
      heartSubKind="file"
      heartObjectHandle={item.handle}
    />
  )
}