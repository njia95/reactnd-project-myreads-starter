import React from 'react'
import Book from './Book'

const SearchBar = ({ onCloseSearch, onSearchBooks, searchResults, shelves, onChangeShelf, findShelf }) => {
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <a className="close-search" onClick={() => onCloseSearch()}>Close</a>
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title or author"
            onChange={e => onSearchBooks(e.target.value)} />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchResults.map(book => {
            book.shelf = findShelf(book.id, book.title)
            return (
              <li key={book.id}>
                <Book book={book} shelves={shelves} onChangeShelf={onChangeShelf} />
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )  
}

export default SearchBar
