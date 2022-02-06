import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import './index.css'
import '@material-tailwind/react/tailwind.css'
import PageProvider from './contexts/PageProvider.jsx'

ReactDOM.render(
  <React.StrictMode>
    <PageProvider>
      <App />
    </PageProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
