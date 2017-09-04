import React from 'react'

const Book = ({ book, shelves, onChangeShelf }) => {
  const style = {
    width: 128,
    height: 192,
    backgroundImage: `url(${book.imageLinks.thumbnail})`
  }
  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={style}></div>
        <div className="book-shelf-changer">
          <select value={book.shelf} onChange={e => onChangeShelf(book, e.target.value)} >
            <option value="none" disabled>Move to...</option>
            {shelves.map(s => (
              <option key={s.name} value={s.name}>{s.title}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors[0]}</div>
    </div>
  )
}

export default Book
