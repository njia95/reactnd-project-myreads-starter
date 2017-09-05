import React from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'

const BookShelves = ({ books, shelves, onChangeShelf }) => {
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
        <Link to='/search'>Add a book</Link>
      </div>
    </div>
  )
}

export default BookShelves
