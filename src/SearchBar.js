import React from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

const SearchBar = ({ onSearchBooks, searchResults, shelves, onChangeShelf }) => {
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to='/'>Close</Link>
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title or author"
            onChange={e => onSearchBooks(e.target.value)} />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchResults.map(book => (
            <li key={book.get('id')}>
              <Book book={book} shelves={shelves} onChangeShelf={onChangeShelf} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  )  
}

export default SearchBar
