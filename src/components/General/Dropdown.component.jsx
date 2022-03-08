import React, { useContext } from 'react'
import MainContext from '../../contexts/MainContext'
import Dropdown from '@material-tailwind/react/Dropdown'
import DropdownItem from '@material-tailwind/react/DropdownItem'

export default function DropdownComponent({ className }) {
  const { imageStyle, setImageStyle } = useContext(MainContext)

  const updateImageStyle = (el) => {
    const value = el.target.attributes.value.value
    setImageStyle(value)
  }

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
        <DropdownItem
          value="main"
          color="teal"
          ripple="light"
          onClick={updateImageStyle}
        >
          Main
        </DropdownItem>
        <DropdownItem
          value="dream-world"
          color="teal"
          ripple="light"
          onClick={updateImageStyle}
        >
          Dream World
        </DropdownItem>
        <DropdownItem
          value="home"
          color="teal"
          ripple="light"
          onClick={updateImageStyle}
        >
          Home
        </DropdownItem>
        <DropdownItem
          value="animated"
          color="teal"
          ripple="light"
          onClick={updateImageStyle}
        >
          Animated
        </DropdownItem>
      </Dropdown>
    </div>
  )
}
