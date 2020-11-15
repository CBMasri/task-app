import React from 'react'
import ReactDOM from 'react-dom'

import 'assets/styles/index.css'
import App from './App'

// Mount the app in strict mode, which gives us some
// additional checks/warnings while running in dev
// https://reactjs.org/docs/strict-mode.html
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
