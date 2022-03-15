import React, { useContext, useEffect, useState } from 'react'
import MainContext from '../../contexts/MainContext'
import { Link } from 'react-router-dom'
import styles from './styles/Pagination.module.css'

export default function Pagination({
  className,
  pageCount,
  filteredPageCount,
  searchPageCount,
}) {
  const { activePageNumber } = useContext(MainContext)
  const [finalCount, setFinalCount] = useState(13)

  useEffect(() => {
    setFinalCount(
      // filtered + no search
      filteredPageCount && searchPageCount === null
        ? filteredPageCount
        : // filtered + search return empty
        filteredPageCount && searchPageCount === 0
        ? 0
        : // empty search result
        searchPageCount === 0
        ? 0
        : // search result
        searchPageCount
        ? searchPageCount
        : // default
          pageCount
    )
  }, [pageCount, filteredPageCount, searchPageCount])

  return (
    <div className={`${styles.listWrap} ${className}`}>
      <div className="block">
        <ul className="flex list-none p-0">
          {Array.from(Array(finalCount)).map((el, i) => (
            <li
              className={`${
                i + 1 == activePageNumber ? styles.active : ''
              }  text-gray-200 rounded-full mx-2 w-12 h-12 grid place-content-center place-items-center`}
              key={i}
            >
              <Link className="w-full h-full p-4" to={`/${(i + 1).toString()}`}>
                {i + 1}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
