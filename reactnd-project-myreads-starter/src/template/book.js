import React from 'react';
import Select from './select';

class Book extends React.Component {

    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        const book = this.props.info;
        // console.log(book,'11111111111');
        const target = this.props.info.shelf || 'none';
        const url = this.props.info.imageLinks.smallThumbnail;
        const bookTitle = this.props.info.title;
        const author = book.hasOwnProperty('authors') ? this.props.info.authors[0] : 'kevin';
        const listChange = this.props.listChange;
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${url})` }}></div>
                        <div className="book-shelf-changer">
                            <Select listChange={listChange} target={target} book={book} />
                        </div>
                    </div>
                    <div className="book-title">{bookTitle}</div>
                    <div className="book-authors">{author}</div>
                </div>
            </li>
        )
    }
}

export default Book;