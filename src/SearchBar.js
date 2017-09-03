import React from 'react'

const SearchBar = ({ onCloseSearch, onSearchBooks }) => {
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <a className="close-search" onClick={() => onCloseSearch()}>Close</a>
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title or author" onChange={e => onSearchBooks(e.target.value)}/>
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid"></ol>
      </div>
    </div>
  )  
}

export default SearchBar
