import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import MainContext from '../../contexts/MainContext'

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
    <nav className="flex justify-center items-center py-3 bg-teal-500">
      <Link to="/">
        <img className="w-52" src={PokeLogo} alt="" />
      </Link>
    </nav>
  )
}
