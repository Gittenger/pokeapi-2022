import React, { useState, useRef } from 'react'
import styles from './styles/Dropdown.module.css'
import { useOutsideAlerter } from '../../utils/hooks'
import CIndex from '../components.index.js'

import dropdownData from './Dropdown.data.js'

function DropdownComponent({ className, display, options, handler }) {
  const [isOpen, toggleOpen] = useState(false)
  const wrapperRef = useRef(null)
  const listRef = useRef(null)

  const handleLocalToggle = () => {
    toggleOpen(!isOpen)
    const ariaExpanded = listRef.current.ariaExpanded
    if (ariaExpanded === 'false') {
      listRef.current.ariaExpanded = 'true'
    } else if (ariaExpanded === 'true') {
      listRef.current.ariaExpanded = 'false'
    }
  }

  useOutsideAlerter(wrapperRef, toggleOpen, isOpen, listRef)
  const { Button } = CIndex

  return (
    <div ref={wrapperRef}>
      <div
        onChange={handler}
        defaultValue={display}
        className={`${className} ${styles.dropdown} text-black text-xl rounded-lg`}
      >
        <Button
          aria-haspopup="menu"
          id="listToggle"
          onClick={handleLocalToggle}
        >
          {display}
        </Button>
        <ul
          aria-labelledby="listToggle"
          ref={listRef}
          aria-expanded="false"
          className={`${styles.dropdownList} ${isOpen ? styles.listOpen : ''}`}
        >
          {options.map((opt, i) => (
            <li key={i}>
              <button onClick={handler} value={opt.value}>
                {opt.display}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function DropdownWithOpts({ type, ...props }) {
  return type === 'image' ? (
    <DropdownComponent
      display="Select Image:"
      options={dropdownData.imageDropdownOpt}
      {...props}
    />
  ) : type === 'filter' ? (
    <DropdownComponent
      display="Filter Type:"
      options={dropdownData.filterDropdownOpt}
      {...props}
    />
  ) : (
    <DropdownComponent
      display="Select Image:"
      options={dropdownData.imageDropdownOpt}
      {...props}
    />
  )
}
