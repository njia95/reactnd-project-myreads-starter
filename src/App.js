import React from 'react'
import { Map } from 'immutable';
import { Route } from 'react-router-dom'
import SearchBar from './SearchBar'
import Bookshelves from './Bookshelves'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    // a collection of book objects in three shelves
    books: Map(),

    // a collection of book objects in search results
    searchResults: Map()
  }

  /**
   * Search for book given a query
   * @param {string} query - a query to be used to search
   */
  searchBooks = async (query) => {
    // results should be empty if query is empty or contains whitespace only
    let searchResults = query.trim() ? await BooksAPI.search(query) : []

    // guard error messages
    searchResults = searchResults.error ? [] : searchResults
    searchResults.forEach((book) => {
      // shelf should be none if the book is not in state
      book.shelf = this.state.books.has(book.id) ? this.state.books.get(book.id).shelf : 'none'
    });

    this.setState({ searchResults: Map(searchResults.map(b => [b.id, Map(b)])) })
  }

  /**
   * Change a book to a new shelf.
   * @param {Map} book - a book with detailed information
   * @param {string} newShelf - a new shelf for the book
   */
  onChangeShelf = async (book, newShelf) => {
    const id = book.get('id')
    if (book.get('shelf') !== newShelf) {
      // add the book to state
      if (!this.state.books.has(id)) {
        await this.setState({ books: this.state.books.set(id, Map(book)) })
      }

      // update bookshelf in books locally and remotely
      this.setState({ books: this.state.books.updateIn([id, 'shelf'], val => newShelf) })
      BooksAPI.update({ id: id }, newShelf)

      // update bookshelf in searchResults
      if (this.state.searchResults.has(id)) {
        this.setState({
          searchResults: this.state.searchResults.updateIn([id, 'shelf'], val => newShelf)
        })
      }
    }
  }

  /**
   * Assign books into state using the given API
   */
  async componentDidMount() {
    const books = await BooksAPI.getAll()
    this.setState({ books: Map(books.map(b => [b.id, Map(b)])) })
  }

  render() {
    // corresponding shelf name and test to display
    const shelves = [
      { "title": "Currently Reading", "name": "currentlyReading", "display": true },
      { "title": "Want to Read", "name": "wantToRead", "display": true  },
      { "title": "Read", "name": "read", "display": true  },
      { "title": "None", "name": "none", "display": false  },
    ]
    
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Bookshelves books={this.state.books} shelves={shelves}
            onChangeShelf={this.onChangeShelf} />
        )} />
        <Route path='/search' render={() => (
          <SearchBar shelves={shelves} searchResults={this.state.searchResults}
             onSearchBooks={this.searchBooks} onChangeShelf={this.onChangeShelf} />
        )} />
      </div>
    )
  }
}

export default BooksApp
