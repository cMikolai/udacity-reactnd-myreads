import { Book } from './Book';

export const BookShelf = ({ status }) => {

    return (
        <div>
            <div className="bookshelf">
                <h2 className="bookshelf-title">{status}</h2>

                <div className="bookshelf-books">
                    <ol className="books-grid">
                        <li>
                            <Book />
                        </li>
                    </ol>
                </div>
                
            </div>
        </div>
    )
};