import "./App.css";
import { BookShelf } from "./BookShelf";
import { useState, useEffect } from "react";
import { getAll, update, search } from "./BooksAPI";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const availableReadingStatus = ["Currently Reading", "Want To Read", "Read", "None"];
  const [books, setBooks] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const books = await getAll();
      setBooks(books);
    };
    fetchBooks();
  }, []);

  const updateShelf = async (bookId, newShelf) => {
    try {
      await update(bookId, newShelf);
  
      setBooks((prevBooks) => {
        const bookExists = prevBooks.find((book) => book.id === bookId);
  
        if (bookExists) {
          return prevBooks.map((book) =>
            book.id === bookId ? { ...book, shelf: newShelf } : book
          );
        } else {
          const newBook = searchResult.find((book) => book.id === bookId);
          if (newBook) {
            return [...prevBooks, { ...newBook, shelf: newShelf }];
          }
          return prevBooks;
        }
      });
    } catch (error) {
      console.error("Error updating shelf:", error);
    }
  };

const searchBooks = async (query) => {
  try {
    const searchedBooks = await search(query);
    setSearchResult(searchedBooks);
  } catch (error) {
    console.error("Error searching books:", error);
  }
};

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
                onChange={e => searchBooks(e.target.value)}
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
              <BookShelf
                updateShelf={updateShelf}
                books={
                  searchResult.map(book => book)
                }
              />
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
                    updateShelf={updateShelf}
                    books={
                      books.filter((book) => book.shelf.toLowerCase() === status.toLowerCase().replace(/\s+/g, ''))
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
