import Nav from '@material-tailwind/react/Nav'
import React, { useContext, useEffect, useState, useCallback } from 'react'
import CIndex from '../components.index.js'

const Layout = ({ children }) => {
  const { Navbar, Footer } = CIndex

  return (
    <>
      <Navbar />
      {children}
      {/* <Footer /> */}
    </>
  )
}

export default Layout
