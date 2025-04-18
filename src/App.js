import "./App.css";
import { Routes, Route, Link } from 'react-router-dom';
import { BookShelf } from "./BookShelf";
import { useState, useEffect } from "react";
import { getAll, update, search } from "./BooksAPI";

function App() {
  const availableReadingStatus = ["Currently Reading", "Want To Read", "Read", "None"];
  const [books, setBooks] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      const books = await getAll();
      setBooks(books);
    };
    fetchBooks();
  }, []);

  // Update the search results when the books change
  useEffect(() => {
    if (searchQuery) {
      searchBooks(searchQuery);
    }
  }, [books]);

  const updateShelf = async (book, newShelf, bookId) => {
    try {
      await update(book, newShelf);
  
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
    setSearchQuery(query);
    if (query !== "") {
      try {
        const searchedBooks = await search(query);
        if (Array.isArray(searchedBooks)) {
          const updatedSearchResults = searchedBooks.map((searchBook) => {
            const matchingBook = books.find((book) => book.id === searchBook.id);
            return {
              ...searchBook,
              shelf: matchingBook ? matchingBook.shelf : "none",
            };
          });
          setSearchResult(updatedSearchResults);
        } else {
          setSearchResult([]);
        }
      } catch (error) {
        console.error("Error searching books:", error);
        setSearchResult([]);
      }
    } else {
      setSearchResult([]);
    }
  };

  return (
    <div className="app">
    <Routes>
      <Route
            path="/search"
            element={
              <div className="search-books">
                <div className="search-books-bar">
                  <Link
                    to="/"
                    className="close-search"
                    onClick={() => setSearchResult([])}
                  >
                    Close
                  </Link>
                  <div className="search-books-input-wrapper">
                    <input
                      onChange={(e) => searchBooks(e.target.value)}
                      type="text"
                      placeholder="Search by title, author, or ISBN"
                    />
                  </div>
                </div>
                <div className="search-books-results">
                  <BookShelf updateShelf={updateShelf} books={searchResult} />
                </div>
              </div>
            }
        />          
        
        <Route
          path="/"
          element={
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                {availableReadingStatus
                  .filter((status) => status !== "None")
                  .map((status) => {
                    return (
                      <BookShelf
                        key={status}
                        status={status}
                        updateShelf={updateShelf}
                        books={books.filter(
                          (book) =>
                            book.shelf.toLowerCase() ===
                            status.toLowerCase().replace(/\s+/g, "")
                        )}
                      />
                    );
                  })}
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
