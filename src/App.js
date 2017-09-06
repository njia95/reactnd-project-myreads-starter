import React from 'react'
import update from 'immutability-helper';
import { Route } from 'react-router-dom'
import SearchBar from './SearchBar'
import Bookshelves from './Bookshelves'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    // a collection of book objects in three shelves
    books: [],

    // a collection of book objects in search results
    searchResults: []
  }

  /**
   * Search for book given a query
   * @param {string} query - a query to be used to search
   */
  searchBooks = async (query) => {
    // results should be empty if query is empty or contains whitespace only
    const searchResults = query.trim() ? await BooksAPI.search(query) : []
    searchResults.forEach((book) => {
      const result = this.state.books.filter(b => b.id === book.id)
      // shelf should be none if the book is notin state
      book.shelf = result.length ? result[0].shelf : 'none'
    });
    this.setState({ searchResults })
  }

  /**
   * Change a book to a new shelf.
   * @param {object} book - a book with detailed information
   * @param {string} newShelf - a new shelf for the book
   */
  onChangeShelf = async (book, newShelf) => {
    const { books } = this.state
    if (book.shelf !== newShelf) {
      let idx = books.indexOf(book)

      // book not in state; add the book to state
      if (idx === -1) { 
        this.setState({ books: books.concat(book) })
        idx = books.length - 1
      }

      // update both locally and remotely
      this.setState({
        books: update(books, { [idx]: { shelf: { $set: newShelf } } })
      })
      await BooksAPI.update(book, newShelf)
    }
  }

  /**
   * Assign books into state using the given API
   */
  async componentDidMount() {
    this.setState({ books: await BooksAPI.getAll() })
  }

  render() {
    const { books, searchResults } = this.state

    // corresponding shelf name and test to display
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
            searchResults={searchResults} onChangeShelf={this.onChangeShelf} />
        )} />
      </div>
    )
  }
}

export default BooksApp
