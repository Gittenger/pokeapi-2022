import React, { useEffect, useState } from 'react'

import MainContext from './MainContext.js'

export const MainProvider = ({ children }) => {
  const [urlLimit] = useState('151')
  const [pageLimit] = useState(13)
  const [activePageNumber, setActivePageNumber] = useState()
  const [imageStyle, setImageStyle] = useState('main')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchPageCount, setSearchPageCount] = useState(null)
  const [redirectedFromSearch, setRedirectedFromSearch] = useState(false)

  useEffect(() => {
    setActivePageNumber(JSON.parse(localStorage.getItem('activePageNumber')))
  }, [])

  return (
    <MainContext.Provider
      value={{
        urlLimit,
        pageLimit,
        activePageNumber,
        setActivePageNumber,
        imageStyle,
        setImageStyle,
        searchQuery,
        setSearchQuery,
        searchPageCount,
        setSearchPageCount,
        redirectedFromSearch,
        setRedirectedFromSearch,
      }}
    >
      {children}
    </MainContext.Provider>
  )
}

export default MainProvider
