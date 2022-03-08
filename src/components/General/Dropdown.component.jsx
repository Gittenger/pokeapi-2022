import React from 'react'
import Dropdown from '@material-tailwind/react/Dropdown'
import DropdownItem from '@material-tailwind/react/DropdownItem'
import DropdownLink from '@material-tailwind/react/DropdownLink'

export default function DropdownComponent({ className }) {
  return (
    <div className={`${className} flex justify-center`}>
      <Dropdown
        color="teal"
        placement="bottom-start"
        buttonText="Select image"
        buttonType="filled"
        size="regular"
        rounded={false}
        block={false}
        ripple="light"
      >
        <DropdownItem color="teal" ripple="light">
          Main
        </DropdownItem>
        <DropdownItem color="teal" ripple="light">
          Dream World
        </DropdownItem>
        <DropdownItem color="teal" ripple="light">
          Home
        </DropdownItem>
        <DropdownItem color="teal" ripple="light">
          Animated
        </DropdownItem>
      </Dropdown>
    </div>
  )
}
