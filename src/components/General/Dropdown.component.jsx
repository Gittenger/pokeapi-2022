import React from 'react'
import Dropdown from '@material-tailwind/react/Dropdown'
import DropdownItem from '@material-tailwind/react/DropdownItem'
import dropdownData from './Dropdown.data.js'

function DropdownComponent({ className, display, options, handler }) {
  return (
    <div className={`${className} flex justify-center`}>
      <Dropdown
        color="teal"
        placement="bottom-start"
        buttonText={display}
        buttonType="filled"
        size="regular"
        rounded={false}
        block={false}
        ripple="light"
      >
        {options.map((opt, i) => (
          <DropdownItem
            key={i}
            value={opt.value}
            color="teal"
            ripple="light"
            onClick={handler}
          >
            {opt.display}
          </DropdownItem>
        ))}
      </Dropdown>
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
