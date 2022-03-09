import React from 'react'
import Dropdown from '@material-tailwind/react/Dropdown'
import DropdownItem from '@material-tailwind/react/DropdownItem'

export default function DropdownComponent({
  className,
  display,
  options,
  handler,
}) {
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
