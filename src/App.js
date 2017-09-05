import React from 'react'
import update from 'immutability-helper';
import { Route } from 'react-router-dom'
import SearchBar from './SearchBar'
import Bookshelves from './Bookshelves'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
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
    const { books, searchResults } = this.state
    const shelves = [
      { "title": "Currently Reading", "name": "currentlyReading" },
      { "title": "Want to Read", "name": "wantToRead" },
      { "title": "Read", "name": "read" },
      { "title": "None", "name": "none" },
    ]
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Bookshelves books={books} shelves={shelves}
            onChangeShelf={this.onChangeShelf} />
        )} />
        <Route path='/search' render={({ history }) => (
          <SearchBar onSearchBooks={this.searchBooks} shelves={shelves}
            searchResults={searchResults} onChangeShelf={this.onChangeShelf}
            findShelf={this.findShelf} />
        )} />
      </div>
    )
  }
}

export default BooksApp
