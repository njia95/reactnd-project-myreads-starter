import React from 'react'
import Bookshelf from './Bookshelf'
import * as BooksAPI from './BooksAPI'

class BookShelves extends React.Component {
  state = {
    "books": []
  }

  async componentDidMount() {
    const books = await BooksAPI.getAll()
    console.log(books)
    this.setState({ books })
  }

  render() {
    const { onOpenSearch } = this.props
    const { books } = this.state
    const shelves = [
      { "title": "Currently Reading", "name": "currentlyReading" },
      { "title": "Want to Read", "name": "wantToRead" },
      { "title": "Read", "name": "read" },
      { "title": "None", "name": "none" },
    ]
    
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            {shelves.filter(shelf => shelf.name !== "none").map(shelf => (
              <Bookshelf key={shelf.title} shelves={shelves} shelf={shelf}
                books={books.filter(book => book.shelf === shelf.name)} />
            ))}
        </div>
        <div className="open-search">
          <a onClick={() => onOpenSearch()}>Add a book</a>
        </div>
      </div>
    )
  }
}

export default BookShelves
