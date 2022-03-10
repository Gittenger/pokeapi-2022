import { createContext } from 'react'

export const MainContext = createContext({
  urlLimit: '12',
  pageLimit: 13,
  activePageNumber: '1',
  setActivePageNumber: () => {},
  imageStyle: '',
  setImageStyle: () => {},
  searchQuery: '',
  setSearchQuery: () => {},
  searchPageCount: null,
  setSearchPageCount: () => {},
  redirectedFromSearch: false,
  setRedirectedFromSearch: () => {},
})

export default MainContext
