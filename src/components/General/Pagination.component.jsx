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
      filteredPageCount && !searchPageCount
        ? filteredPageCount
        : searchPageCount
        ? searchPageCount
        : pageCount
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
              }  text-gray-200 rounded-full mx-2 p-2 w-10 h-10 grid place-content-center place-items-center`}
              key={i}
            >
              <Link to={`/${(i + 1).toString()}`}>{i + 1}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
