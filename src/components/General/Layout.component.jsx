import React from 'react'
import CIndex from '../components.index.js'

const Layout = ({ children }) => {
  const { Navbar } = CIndex

  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default Layout
