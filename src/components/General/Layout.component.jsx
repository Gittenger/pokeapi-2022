import React from 'react'
import { Outlet } from 'react-router-dom'
import CIndex from '../components.index.js'

const Layout = () => {
  const { Navbar, Footer } = CIndex

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout
