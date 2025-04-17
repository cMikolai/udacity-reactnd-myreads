import { Book } from './Book';

export const BookShelf = ({ status, books }) => {

    return (
        <div>
            <div className="bookshelf">
                <h2 className="bookshelf-title">{status}</h2>

                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) => (
                            <li key={book.id}>
                            <Book
                                title={book.title}
                                authors={book.authors.join(', ')}
                                imageLink={book.imageLinks?.thumbnail}
                                shelf={book.shelf}
                            />
                            </li>
                        ))}
                    </ol>
                </div>
                
            </div>
        </div>
    )
};