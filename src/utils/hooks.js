import { useEffect, useState, useContext } from 'react'
import MainContext from '../contexts/MainContext'

export const useTitle = (title) => {
  useEffect(() => {
    document.title = `${process.env.MAIN_TITLE} | ${title}`
  }, [title])
}

export const usePagination = (currentPage) => {
  const [pageCount, setPageCount] = useState(1)
  const [offset, setOffset] = useState(0)

  const { urlLimit, pageLimit } = useContext(MainContext)

  const setLimits = (currentPage, urlLimit, pageLimit) => {
    // how many pages
    let count = Math.ceil(parseInt(urlLimit) / pageLimit)
    setPageCount(count)

    // calculate offset based on current page
    let offsetCalc = 0
    if (!!currentPage) offsetCalc = pageLimit * currentPage - pageLimit
    setOffset(offsetCalc)
  }

  useEffect(() => {
    setLimits(currentPage, urlLimit, pageLimit)
  }, [currentPage])

  return { pageCount, offset }
}

export function useOutsideAlerter(ref, handleClose, openState) {
  useEffect(() => {
    // do something if clicked outside ref
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (openState === true) {
          handleClose(false)
        }
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, openState])
}
