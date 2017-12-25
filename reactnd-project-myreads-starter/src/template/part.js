import React from 'react';
import Book from './book';

class Part extends React.Component {

    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        const books = this.props.info.books;
        const partTitle = this.props.info.title;
        const listChange = this.props.listChange;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{partTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            books.map((book) =>
                                <Book listChange={listChange} key={book.id} info={book} />
                            )
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default Part;