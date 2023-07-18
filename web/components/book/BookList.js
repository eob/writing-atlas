import BookRow from './BookRow'

export default function BookList(books, author) {
    return (
        <div className="list-container">
            {books.map((book) => BookRow(book, author))}
        </div>
    )
  }
  