export default function GetEntitiesFromBook(book, forceAuthor) {
  let ret = {
    author: null,
    publication: null
  }

  if (forceAuthor) {
    return forceAuthor
  }
  if (!book) {
    return null
  }
  if (book.author) {
    ret.author = book.author
  } else if (book.entity_files) {
    let entities = book.entity_files.filter(x => x.role == 'AUTHOR').map(x => x.entity)
    if (entities.length > 0) {
      ret.author = entities[0]
    }
  } else if (book.authors && book.authors.length > 0) {
    let author = {
      name: book.authors[0]
    }
    if (book.authorHandles && book.authorHandles.length > 0) {
      author.handle = book.authorHandles[0]
    }
    ret.author = author
  }

  // Now find other stuff
  if (book.entity_files) {
    for (let ef of book.entity_files) {
      if (ef.role == 'PUBLICATION') {
        ret.publication = ef.entity;
      }
    }  
  }
  // let entities = book.entity_files.filter(x => x.role != 'AUTHOR').map(x => x.entity)


  return ret
}
