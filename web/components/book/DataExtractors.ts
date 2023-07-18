import GetAuthorFromBook from '../../common/db/GetAuthorFromBook'

export function getAuthorLink({entities=null, file, author}): {name: string, url: string} {
  if (!entities) {
    entities = GetAuthorFromBook(file)
  }
  let theAuthor = entities.author;
  let authorUrl = theAuthor ? `/author/${theAuthor.handle}` : null
  let authorName = theAuthor ? theAuthor.name : null
  return {name: authorName, url: authorUrl}
}

export function getPublicationLink({entities=null, file, author}): {name: string, url: string} {
  if (!entities) {
    entities = GetAuthorFromBook(file)
  }
  let thePublication = entities.publication;
  return {name: thePublication ? thePublication.name : null, url: thePublication ? `/publication/${thePublication.handle}` : null}
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"
]

export function getPublicationDate({book}) {
  if (book.publishedDate) {
    let pd = book.publishedDate;
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
      return pd
    }
  }
  return null
}