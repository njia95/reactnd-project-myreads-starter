import React from 'react'
// import Book from './Book'

const SearchBar = ({ onCloseSearch, onSearchBooks, searchResults }) => {
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
          {/* {searchResults.map(book => (
            <li key={book.id}>
              <Book {...book} options={options} />
            </li>
          ))} */}
        </ol>
      </div>
    </div>
  )  
}

export default SearchBar
