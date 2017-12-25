import React from 'react';
import './App.css';
import Part from './template/part';
import { _getAll, _update } from './BooksAPI';
import Loading from './template/loading';
import {
  Link
} from 'react-router-dom'


class BooksApp extends React.Component {


  constructor() {
    super();
    this.state = {
      partList: [
        { partTitle: 'currentlyReading' },
        { partTitle: 'wantToRead' },
        { partTitle: 'read' }
      ],
      currentlyReading: [],
      wantToRead: [],
      read: [],
      bookIsLoading: true
    }

    this.updateBookStatus = this.updateBookStatus.bind(this);
    this.getBookList = this.getBookList.bind(this);
    this.refreshBookList = this.refreshBookList.bind(this);
    this.listChangeHandle = this.listChangeHandle.bind(this);
  }

  componentWillMount() {
    this.getBookList();
  }

  getBookList() {
    _getAll().then((bookList) => {
      this.refreshBookList(bookList);
    });
  }

  refreshBookList(bookList) {
    let list = {
      currentlyReading: [],
      wantToRead: [],
      read: []
    }
    bookList.forEach(book => {
      list[book.shelf].push(book);
    });
    this.setState({ currentlyReading: list.currentlyReading })
    this.setState({ wantToRead: list.wantToRead })
    this.setState({ read: list.read })
    this.setState({ bookIsLoading: false });
  }

  listChangeHandle(event, book) {
    this.setState({ bookIsLoading: true });
    this.updateBookStatus(book, event);
  }

  updateBookStatus(book, shelf) {
    _update(book, shelf).then((success) => {
      this.getBookList();
      this.setState({ bookIsLoading: false });
    }, (error) => {
      this.setState({ bookIsLoading: false });
      alert('Oops, something wrong when update book status, please reload this page.');
    })
  }

  render() {
    return (
      <div className="app">
        {
          this.state.bookIsLoading ?
            <Loading />
            :
            null
        }
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              {
                this.state.partList.map((part) => <Part key={part.partTitle} listChange={this.listChangeHandle} info={{ title: part.partTitle, books: this.state[part.partTitle] }} />)
              }
            </div>
          </div>
          <div className="open-search">
            <Link to="search">Add a book</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default BooksApp
