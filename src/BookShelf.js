import { Book } from './Book';

export const BookShelf = ({ status, books, updateShelf }) => {

    return (
        <div>
            <div className="bookshelf">
            {
                status ? <h2 className="bookshelf-title">{status}</h2> : ''
            }

                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.length > 0 ? 
                            books.map((book) => (
                                <li key={book.id}>
                                <Book
                                    book={book}
                                    id={book.id}
                                    title={book.title || 'No title available'}
                                    authors={book.authors && book.authors.join(', ') || 'No authors available'}
                                    imageLink={book.imageLinks?.thumbnail || ''}
                                    shelf={book.shelf || 'None'}
                                    updateShelf={updateShelf}
                                />
                                </li>
                            )) :
                            <div>No results found.</div>
                        }
                    </ol>
                </div>
                
            </div>
        </div>
    )
};