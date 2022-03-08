import React from 'react'
import { Outlet } from 'react-router-dom'
import CIndex from '../components.index.js'

const Layout = () => {
  const { Navbar } = CIndex

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default Layout
