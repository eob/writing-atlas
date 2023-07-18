import FullWidthTitle from '../utility/panels/FullWidthTitle'
import {LINK_COLOR} from '../../components/utility/styles'
import { FavoriteStar } from "../../components/lists/FavoriteStar";
import GetAuthorFromBook from '../../common/db/GetAuthorFromBook'
import {getAuthorLink, getPublicationLink} from '../../components/book/DataExtractors'
import BookPhoto from '../../components/book/BookPhoto'

export default function BookTitle({user, loading, book, author, hearted}) {
  let entities = GetAuthorFromBook(book)
  let {name: authorName, url: authorUrl} = getAuthorLink({entities, file: book, author});
  let {name: publicationName, url: publicationUrl} = getPublicationLink({entities, file: book, author});

  let bookUrl = `/story/${book.handle}`
  let subsubtitle = null;
    
  let links = [];
  if (book && book.file_links) {
    links = book.file_links.map(x => x.link).map(link => {
      let name = link.name;
      if (link.url.indexOf(".tor.com/") > -1) {
        name = "Read on TOR.com"
      }
      return (
        <a target="_blank" href={link.url} className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <svg className="-ml-0.5 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          {name}
        </a>
      )
    })
  }

  let favorite = <FavoriteStar value={hearted} user={user} loading={loading} />

  let photo = (
    <div className="text-gray-500 mt-4">
      <svg className="w-8 h-8 md:w-12 md:h-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    </div>
  )

  let subtitle = [
  ]

  if (authorName) {
    subtitle.push(
      <p>By <a className={LINK_COLOR} href={authorUrl}>{authorName}</a></p>
    )
  }
  if (publicationName) {
    subtitle.push(
      <p>First published in <a className={LINK_COLOR} href={publicationUrl}>{publicationName}</a></p>
    )
  }

  return (
    <FullWidthTitle
      left={(<BookPhoto author={author} book={book} />)}
      // left={photo}
      right={favorite}
      title={(<a className={LINK_COLOR} href={bookUrl}>{book.name}</a>)}
      subtitle={subtitle}
      subsubtitle={subsubtitle}
      links={links}
    />
  )
}