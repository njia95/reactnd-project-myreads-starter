import React from 'react'

const Book = ({ backgroundImage, title, authors, shelf }) => {
  const style = {
    width: 128,
    height: 192,
    backgroundImage: `url(${backgroundImage})`
  }
  const options = {
    present: "Currently Reading",
    future: "Want to Read",
    past: "Read",
    none: "None"
  }
  const newOptions = Object.entries(options).filter(option => option[0] !== shelf)

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={style}></div>
        <div className="book-shelf-changer">
          <select>
            <option value="none" disabled>Move to...</option>
            {[[shelf, options[shelf]]].concat(newOptions).map(option => (
              <option key={option[0]} value={option[0]}>{option[1]}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors[0]}}</div>
    </div>
  )
}

export default Book
