import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import App from './components/app'
import createHistory from 'history/createBrowserHistory'

const history = createHistory()

ReactDOM.render(
  <Router history={history}>
    <App/>
  </Router>,
  document.getElementById('app')
)
