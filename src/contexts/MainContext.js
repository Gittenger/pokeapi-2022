import { createContext } from 'react'

export const MainContext = createContext({
  urlLimit: '12',
  pageLimit: 13,
  activePageNumber: '1',
  setActivePageNumber: () => {},
})

export default MainContext
