import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import MainContext from '../../contexts/MainContext'

import { usePokemonData } from '../../utils/dataHooks.js'
import { calculateCount } from '../../utils/utilFunctions'

import styles from './styles/Navbar.module.css'
import images from '../../assets/img/img-index.js'

const {
  img: { PokeLogo },
  icons: { SearchIcon },
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
    <nav
      className={`${styles.navbar} flex flex-col sm:flex-row justify-center items-center py-3`}
    >
      <Link className="mb-5 sm:mb-0 sm:mr-20 md:mr-72" to="/">
        <img className="w-52" src={PokeLogo} alt="" />
      </Link>
      <div
        className={`${styles.search} mb-5 sm:mb-0 relative rounded-lg flex justify-start items-center`}
      >
        <div className="w-5 h-5 flex justify-center items-center absolute">
          <SearchIcon className={`${styles.icon} left-1 absolute`} />
        </div>
        <input
          className={`bg-transparent border-none w-full text-black pl-10 ring-black ring-1 rounded-lg focus:border-none focus:ring-gray-700 focus:ring-2 focus:shadow-lg`}
          type="text"
          value={searchPageCount === null ? '' : searchQuery}
          placeholder="Name search"
          onChange={handleSearch}
        />
      </div>
    </nav>
  )
}
