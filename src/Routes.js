import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Layout from './components/General/Layout.component.jsx'
import Home from './pages/Home.page.jsx'
import PokemonDetails from './pages/PokemonDetails.page.jsx'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate replace to="/1" />} />
          <Route path=":currentPage" element={<Home title="Home" />} />
          <Route path="/pokemon/:pokemon" element={<PokemonDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default AppRoutes
