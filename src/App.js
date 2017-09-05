import React from 'react'
import update from 'immutability-helper';
import * as BooksAPI from './BooksAPI'
import './App.css'

import SearchBar from './SearchBar'
import Bookshelves from './Bookshelves'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: true,
    books: [],
    searchResults: []
  }

  searchBooks = async (query) => {
    const searchResults = query.trim() ? await BooksAPI.search(query) : []
    this.setState({ searchResults })
  }

  onChangeShelf = async (book, newShelf) => {
    const { books } = this.state
    if (book.shelf !== newShelf) {
      let idx = books.indexOf(book)
      if (idx === -1) { // book not in state
        this.setState({ books: books.concat(book) })
        idx = books.length - 1
      }
      this.setState({
        books: update(books, { [idx]: { shelf: { $set: newShelf } } })
      })
      await BooksAPI.update(book, newShelf)
    }
  }
  
  closeSearch = () => {
    this.setState({ showSearchPage: false })
  }

  openSearch = () => {
    this.setState({ showSearchPage: true })
  }

  findShelf = (bookId, title) => {
    const result = this.state.books.filter(book => book.id === bookId)
    return result.length ? result[0].shelf : 'none'
  }

  async componentDidMount() {
    this.setState({ books: await BooksAPI.getAll() })
  }

  render() {
    const { showSearchPage, books, searchResults } = this.state
    const shelves = [
      { "title": "Currently Reading", "name": "currentlyReading" },
      { "title": "Want to Read", "name": "wantToRead" },
      { "title": "Read", "name": "read" },
      { "title": "None", "name": "none" },
    ]
    // console.log(books)
    return (
      <div className="app">
        {showSearchPage ?
          <SearchBar onCloseSearch={this.closeSearch} onSearchBooks={this.searchBooks}
            searchResults={searchResults} shelves={shelves}
            onChangeShelf={this.onChangeShelf} findShelf={this.findShelf} /> :
          <Bookshelves onOpenSearch={this.openSearch} books={books}
            shelves={shelves} onChangeShelf={this.onChangeShelf} />}
      </div>
    )
  }
}

export default BooksApp
