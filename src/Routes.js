import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Layout from './components/General/Layout.component.jsx'
import Home from './pages/Home.page.jsx'
import HomeIndex from './pages/HomeIndex.page.jsx'
import About from './pages/About.page.jsx'
import PokemonDetails from './pages/PokemonDetails.page.jsx'
import ScrollToTop from './utils/ScrollToTop'

const AppRoutes = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomeIndex />} />
            <Route path=":currentPage" element={<Home title="Home" />} />
            <Route path="/pokemon/:pokemon" element={<PokemonDetails />} />
          </Route>
          <Route path="/about" element={<Layout />}>
            <Route index element={<About />} />
          </Route>
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  )
}
export default AppRoutes
