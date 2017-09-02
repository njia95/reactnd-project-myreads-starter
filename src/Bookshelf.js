import React from 'react'
import Book from './Book'

const Bookshelf = ({ shelves, shelf, books }) => {
  const options = [shelf].concat(shelves.filter(s => s.name !== shelf.name))
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => (
            <li key={book.id}>
              <Book {...book} options={options} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default Bookshelf
