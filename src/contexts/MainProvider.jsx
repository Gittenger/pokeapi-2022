import React, { useEffect, useState } from 'react'

import MainContext from './MainContext.js'

export const MainProvider = ({ children }) => {
  const [urlLimit] = useState('151')
  const [pageLimit] = useState(13)
  const [activePageNumber, setActivePageNumber] = useState()

  useEffect(() => {
    setActivePageNumber(JSON.parse(localStorage.getItem('activePageNumber')))
  }, [])

  return (
    <MainContext.Provider
      value={{ urlLimit, pageLimit, activePageNumber, setActivePageNumber }}
    >
      {children}
    </MainContext.Provider>
  )
}

export default MainProvider
