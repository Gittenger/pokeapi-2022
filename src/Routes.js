import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { HomePage } from './pages/pages-index.js'
import PokemonDetailContent from './pages/PokemonDetailContent.component.jsx'
import Page from './components/General/Page.Component.jsx'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route
          path=":pokemon"
          exact
          element={<Page Component={PokemonDetailContent} />}
        />
      </Routes>
    </BrowserRouter>
  )
}
export default AppRoutes
