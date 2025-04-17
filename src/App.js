import "./App.css";
import { BookShelf } from "./BookShelf";
import { useState, useEffect } from "react";
import { getAll } from "./BooksAPI";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const availableReadingStatus = ["Currently Reading", "Want To Read", "Read", "None"];
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const books = await getAll();
      setBooks(books);
    };
    fetchBooks();
  }, []);

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
          {
            availableReadingStatus
              .filter(status => status !== "None")
              .map((status) => {
                return (
                  <BookShelf
                    key={status}
                    status={status}
                    books={
                      books.filter((book) => book.shelf === status.toLowerCase().replace(/\s+/g, ''))
                    }
                  />
                );
              })
          }
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
