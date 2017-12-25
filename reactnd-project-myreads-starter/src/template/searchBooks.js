import React from 'react';
import Book from './book';
import {
    Link
} from 'react-router-dom';
import { _search, _update } from '../BooksAPI';
import Loading from './loading';

class Search extends React.Component {

    constructor() {
        super();
        this.state = {
            keyWords: '',
            timer: null,
            bookList: [],
            isLoading: false,
            noData: false
        }
        this.queryBook = this.queryBook.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.listChangeHandle = this.listChangeHandle.bind(this);
        this.updateBookStatus = this.updateBookStatus.bind(this);
    }

    listChangeHandle(event, book) {
        this.setState({ isLoading: true });
        this.updateBookStatus(book, event);
    }

    updateBookStatus(book, shelf) {
        _update(book, shelf).then((success) => {
            alert('update book success');
            this.setState({ isLoading: false });
        }, (error) => {
            this.setState({ isLoading: false });
            alert('Oops, something wrong when update book status, please reload this page.');
        })
    }

    queryBook() {
        this.setState({ isLoading: true });
        this.setState({ noData: false });
        _search(this.state.keyWords)
            .then((list) => {
                this.setState({ isLoading: false });
                if (list.hasOwnProperty('error')) {
                    this.setState({ noData: true });
                    return;
                }
                this.setState({ bookList: list });
            }, (error) => {
                console.error('error when search books', error);
                this.setState({ isLoading: false });
            });
    }

    handleChange(event) {
        this.setState({ keyWords: event.target.value.toLowerCase() });
        clearTimeout(this.state.timer);

        var timer = setTimeout(() => {
            this.state.keyWords !== '' && this.queryBook();
        }, 1000)
        this.setState({ timer: timer });
    }


    render() {
        return (
            <div className="app">
                {
                    this.state.isLoading ?
                        <Loading /> : null
                }
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link className="close-search" to="/">Close</Link>
                        <div className="search-books-input-wrapper">
                            <input type="text" placeholder="Search by title or author" value={this.state.keyWords} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="search-books-results">
                        <ol className="books-grid">
                            {
                                this.state.noData ?
                                    <h3>there is no data for current key words</h3>
                                    :
                                    this.state.bookList.map((book) =>
                                        <Book listChange={this.listChangeHandle} key={book.id} info={book} />
                                    )
                            }

                        </ol>
                    </div>
                </div>
            </div>
        )
    }
}

export default Search;