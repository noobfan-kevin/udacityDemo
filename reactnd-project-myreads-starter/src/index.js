import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Search from './template/searchBooks';
import './index.css'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

const Index = () => (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/search" component={Search} />
    </div>
  </Router>
)

ReactDOM.render((<Index />
), document.getElementById('root'))
