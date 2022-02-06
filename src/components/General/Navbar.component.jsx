import React, { useState } from 'react'
import Navbar from '@material-tailwind/react/Navbar'
import NavbarContainer from '@material-tailwind/react/NavbarContainer'
import NavbarWrapper from '@material-tailwind/react/NavbarWrapper'
import NavbarBrand from '@material-tailwind/react/NavbarBrand'
import NavbarToggler from '@material-tailwind/react/NavbarToggler'
import NavbarCollapse from '@material-tailwind/react/NavbarCollapse'
import Nav from '@material-tailwind/react/Nav'
import NavItem from '@material-tailwind/react/NavItem'
import NavLink from '@material-tailwind/react/NavLink'
import Icon from '@material-tailwind/react/Icon'

import styles from './styles/Navbar.module.css'
import images from '../../assets/img/img-index.js'

const {
  img: { NpmLogo },
} = images

export default function NavBar() {
  const [openNavbar, setOpenNavbar] = useState(false)

  return (
    <Navbar className={`${styles.navBar}`} color="cyan" navbar>
      <NavbarContainer>
        <NavbarWrapper>
          <NavbarBrand>
            <img className="w-20" src={NpmLogo} alt="" />
          </NavbarBrand>
          <NavbarToggler
            className={`${styles.navBtn}`}
            onClick={() => setOpenNavbar(!openNavbar)}
            ripple="dark"
          />
        </NavbarWrapper>

        <NavbarCollapse open={openNavbar}>
          <Nav className={`${styles.navList}`}>
            <NavItem active="light" ripple="dark">
              <Icon color="black" name="language" size="xl" />
              Discover
            </NavItem>
            <NavLink href="#navbar" ripple="dark">
              <Icon name="account_circle" size="xl" />
              Profile
            </NavLink>
            <NavItem ripple="dark">
              <Icon name="settings" size="xl" />
              Settings
            </NavItem>
          </Nav>
        </NavbarCollapse>
      </NavbarContainer>
    </Navbar>
  )
}
