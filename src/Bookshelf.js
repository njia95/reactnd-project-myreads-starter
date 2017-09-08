import React from 'react'
import Book from './Book'

const Bookshelf = ({ shelfTitle, books, shelves, onChangeShelf }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {/* display all books belonging to a shelf */}
          {books.map(book => (
            <li key={book.get('id')}>
              <Book book={book} shelves={shelves} onChangeShelf={onChangeShelf} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default Bookshelf
