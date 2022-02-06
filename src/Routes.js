import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { HomePage } from './pages/pages-index.js'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}
export default AppRoutes
