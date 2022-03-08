import React, { useContext } from 'react'
import MainContext from '../../contexts/MainContext'
import { Link } from 'react-router-dom'
import styles from './styles/Pagination.module.css'

export default function Pagination({ className, pageCount }) {
  const { activePageNumber } = useContext(MainContext)

  return (
    <div className={`${styles.listWrap} ${className}`}>
      <div className="block">
        <ul className="flex list-none p-0">
          {Array.from(Array(pageCount)).map((el, i) => (
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
