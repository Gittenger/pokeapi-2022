import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import MainContext from '../../contexts/MainContext'

import Navbar from '@material-tailwind/react/Navbar'
import NavbarContainer from '@material-tailwind/react/NavbarContainer'
import NavbarWrapper from '@material-tailwind/react/NavbarWrapper'
import NavbarBrand from '@material-tailwind/react/NavbarBrand'
import NavbarCollapse from '@material-tailwind/react/NavbarCollapse'
import Nav from '@material-tailwind/react/Nav'
import NavbarInput from '@material-tailwind/react/NavbarInput'
// import NavbarToggler from '@material-tailwind/react/NavbarToggler'
// import NavItem from '@material-tailwind/react/NavItem'
// import NavLink from '@material-tailwind/react/NavLink'
// import Icon from '@material-tailwind/react/Icon'

import { usePokemonData } from '../../utils/dataHooks.js'
import { calculateCount } from '../../utils/utilFunctions'

import styles from './styles/Navbar.module.css'
import images from '../../assets/img/img-index.js'

const {
  img: { PokeLogo },
} = images

export default function NavBar() {
  const {
    pageLimit,
    setSearchQuery,
    urlLimit,
    searchPageCount,
    searchQuery,
    setSearchPageCount,
    setRedirectedFromSearch,
  } = useContext(MainContext)
  let navigate = useNavigate()

  const [pokemonObject, urlsMap] = usePokemonData()

  const [openNavbar, setOpenNavbar] = useState(false)

  const handleSearch = (e) => {
    setRedirectedFromSearch(true)
    navigate('/1', {
      replace: true,
    })

    const localSearchQuery = e.target.value
    setSearchQuery(localSearchQuery)

    const filteredLength = !localSearchQuery
      ? urlLimit
      : urlsMap.filter(
          (url) =>
            pokemonObject[url.url]?.name
              .toLowerCase()
              .indexOf(localSearchQuery) == 0
        ).length

    setSearchPageCount(calculateCount(filteredLength, pageLimit))
  }

  return (
    <Navbar className={`${styles.navBar}`} color="teal" navbar>
      <NavbarContainer>
        <NavbarWrapper>
          <NavbarBrand>
            <Link to="/">
              <img className="w-52" src={PokeLogo} alt="" />
            </Link>
          </NavbarBrand>
          {/* <NavbarToggler
            className={`${styles.navBtn}`}
            onClick={() => setOpenNavbar(!openNavbar)}
            ripple="dark"
          /> */}
        </NavbarWrapper>

        <NavbarCollapse open={openNavbar}>
          <Nav className={`${styles.navList}`}>
            {/* <NavItem active="light" ripple="dark">
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
            </NavItem> */}
            <NavbarInput
              value={searchPageCount === null ? '' : searchQuery}
              type="text"
              placeholder="Search here"
              onChange={handleSearch}
            />
          </Nav>
        </NavbarCollapse>
      </NavbarContainer>
    </Navbar>
  )
}
