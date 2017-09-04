import React from 'react'
import Bookshelf from './Bookshelf'

const BookShelves = ({ onOpenSearch, books, shelves, onChangeShelf }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        {shelves.filter(shelf => shelf.name !== "none").map(shelf => (
          <Bookshelf key={shelf.title} shelfTitle={shelf.title}
            books={books.filter(book => book.shelf === shelf.name)}
            shelves={shelves} onChangeShelf={onChangeShelf} />
        ))}
      </div>
      <div className="open-search">
        <a onClick={() => onOpenSearch()}>Add a book</a>
      </div>
    </div>
  )
}

export default BookShelves
