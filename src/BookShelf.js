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
                        {books.map((book) => (
                            <li key={book.id}>
                            <Book
                                id={book.id}
                                title={book.title}
                                authors={book.authors.join(', ')}
                                imageLink={book.imageLinks?.thumbnail}
                                shelf={book.shelf || 'None'}
                                updateShelf={updateShelf}
                            />
                            </li>
                        ))}
                    </ol>
                </div>
                
            </div>
        </div>
    )
};