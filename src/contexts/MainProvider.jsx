import React, { useState } from 'react'

import MainContext from './MainContext.js'

export const MainProvider = ({ children }) => {
  const [urlLimit] = useState('12')
  const [pageLimit] = useState(13)

  return (
    <MainContext.Provider value={{ urlLimit, pageLimit }}>
      {children}
    </MainContext.Provider>
  )
}

export default MainProvider
