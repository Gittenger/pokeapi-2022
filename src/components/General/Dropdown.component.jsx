import React, { useState, useRef } from 'react'
import styles from './styles/Dropdown.module.css'
import { useOutsideAlerter } from '../../utils/hooks'

import dropdownData from './Dropdown.data.js'

function DropdownComponent({ className, display, options, handler }) {
  const [isOpen, toggleOpen] = useState(false)
  const wrapperRef = useRef(null)

  const handleLocalToggle = () => {
    toggleOpen(!isOpen)
  }

  useOutsideAlerter(wrapperRef, toggleOpen, isOpen)

  return (
    <div ref={wrapperRef}>
      <div
        onChange={handler}
        defaultValue={display}
        className={`${className} ${styles.dropdown} text-black`}
      >
        <button onClick={handleLocalToggle} className="p-3">
          {display}
        </button>
        <ul
          className={`${styles.dropdownList} ${isOpen ? styles.listOpen : ''} `}
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
