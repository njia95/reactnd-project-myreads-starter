import React from 'react'

const Book = ({ imageLinks, title, authors, options }) => {
  const style = {
    width: 128,
    height: 192,
    backgroundImage: `url(${imageLinks.thumbnail})`
  }
  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={style}></div>
        <div className="book-shelf-changer">
          <select>
            <option value="none" disabled>Move to...</option>
            {options.map(opt => (
              <option key={opt.name} value={opt.name}>{opt.title}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors[0]}</div>
    </div>
  )
}

export default Book
