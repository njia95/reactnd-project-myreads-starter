import React from 'react'

const Book = ({ book, shelves, onChangeShelf }) => {
  // if thumbnail undefined, set empty url
  const imageLink = book.get('imageLinks') ? (book.get('imageLinks').thumbnail) : ''
  const style = {
    width: 128,
    height: 192,
    backgroundImage: `url(${imageLink})`
  }

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={style}></div>
        <div className="book-shelf-changer">
          <select value={book.get('shelf')} onChange={e => onChangeShelf(book, e.target.value)} >
            <option value="none" disabled>Move to...</option>
            {shelves.map(s => (
              <option key={s.name} value={s.name}>{s.title}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="book-title">{book.get('title')}</div>
      {/* guard undefined authors when a query is invalid */}
      <div className="book-authors">{book.get('authors') ? book.get('authors').join(', ') : ''}</div>
    </div>
  )
}

export default Book
