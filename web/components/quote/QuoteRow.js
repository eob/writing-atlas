import {Img} from 'react-image'
import {Tag} from '../tag/Tag'
import { ItemRow } from '../lists/ItemRow'
import GetAuthorFromBook from '../../common/db/GetAuthorFromBook'
import marked from "marked"

var ellipsis = require('text-ellipsis');
const URL_BASE = 'https://storage.googleapis.com/covers.data.robotbookclub.com'

const MONTHS = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"
]

export default function BookRow({item, author, hideTagHandle, user, loading}) {
    let authorUrl = null
    let bookUrl = `/story/${item.handle}`
    let authorName = null
    let authorImageUrl = null
    let tags = []

    let theAuthor = GetAuthorFromBook(item, author).author

    if (item.file_tags) {
      tags = item.file_tags.map(x => x.tag)
    }
    if (item.tags && item.tagHandles) {
      for (let i = 0; i < item.tags.length; i++) {
        if (i < item.tagHandles.length) {
          tags.push({
            handle: item.tagHandles[i],
            name: item.tags[i],
            kind: 'TAG'
          })
        }
      }
    }

    if (item.collections && item.collectionHandles) {
      for (let i = 0; i < item.collections.length; i++) {
        if (i < item.collectionHandles.length) {
          tags.push({
            handle: item.collectionHandles[i],
            name: item.collections[i],
            kind: 'COLLECTION'
          })
        }
      }
    }

    if (theAuthor) {
      authorUrl = `/author/${theAuthor.handle}`
      authorImageUrl = `/images/author/${theAuthor.handle}.png`  
      authorName = theAuthor.name
    }

    let abstract = (item.logline != null && item.logline.length > 0) ? item.logline : item.summary;
    var shortAbstract = abstract ? ((abstract.length > 500) ? ellipsis(abstract, 500) : abstract) : null;
    let pd = item.publishedDate;
    if (pd) {
      try {
        pd = pd.split('-')[0];
      } catch (ex) {
  
      }
  
      if (pd.length == 6) {
        try {
          let year = pd.substring(0, 4)
          let month = parseInt(pd.substring(4, 6)) - 1
          pd = `${MONTHS[month]} ${year}`
        } catch {
  
        }      
      }
    }

    let iconHref = item.profilePhoto || null;
    let iconAlt = item.profilePhoto ? `${item.name} Cover` : 'No cover available.';
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
        dateTime={pd}
        tags={tags.filter(t => t.handle != hideTagHandle).map(t => <Tag handle={t.handle} label={t.name} kind={t.kind} color="green" />)}
        user={user}
        loading={loading}
        offersHeart={true}
      />
    )
  }