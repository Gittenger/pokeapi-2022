import React from 'react'
import PaginationComponent from '@material-tailwind/react/Pagination'
import PaginationItem from '@material-tailwind/react/PaginationItem'
import Icon from '@material-tailwind/react/Icon'
import styles from './styles/Pagination.module.css'

export default function Pagination({ className, pageCount, activePage }) {
  return (
    <div className={`${styles.listWrap} ${className}`}>
      <PaginationComponent>
        {/* <PaginationItem href="#last" ripple="dark">
          <Icon name="keyboard_arrow_left" />
        </PaginationItem> */}
        {Array.from(Array(pageCount)).map((el, i) => (
          <PaginationItem
            className="text-gray-200"
            key={i}
            color={`${i + 1 == activePage ? 'deepOrange' : ''}`}
            href={`${(i + 1).toString()}`}
            ripple="light"
          >
            {i + 1}
          </PaginationItem>
        ))}
        {/* <PaginationItem href="#last" ripple="dark">
          <Icon name="keyboard_arrow_right" />
        </PaginationItem> */}
      </PaginationComponent>
    </div>
  )
}
