import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import './index.css'
import './styles/animista.css'
import './styles/myAnimations.css'
import 'sal.js/dist/sal.css'
import MainProvider from './contexts/MainProvider.jsx'

ReactDOM.render(
  <React.StrictMode>
    <MainProvider>
      <App />
    </MainProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
