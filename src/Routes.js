import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePageContent.component.jsx'
import TestPage from './pages/TestPage.component.jsx'
import PokemonDetailContent from './pages/PokemonDetailContent.component.jsx'
import Page from './components/General/Page.Component.jsx'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Page Component={HomePage} />} />
        <Route path="/test" exact element={<Page Component={TestPage} />} />
        <Route path="/:id" exact element={<Page Component={HomePage} />} />
        <Route
          path="/pokemon/:pokemon"
          exact
          element={<Page Component={PokemonDetailContent} />}
        />
      </Routes>
    </BrowserRouter>
  )
}
export default AppRoutes
