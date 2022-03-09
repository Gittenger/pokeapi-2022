import React, { useEffect, useContext, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import MDSpinner from 'react-md-spinner'
import MainContext from '../contexts/MainContext'

import { usePagination, useTitle } from '../utils/hooks'
import { usePokemonData } from '../utils/dataHooks'
import { isIndexInBounds } from '../utils/utilFunctions.js'
import CIndex from '../components/components.index.js'

const Home = ({ title }) => {
  const { currentPage } = useParams()
  let navigate = useNavigate()
  useTitle(title)
  // page settings
  const { pageLimit, activePageNumber, setActivePageNumber } =
    useContext(MainContext)
  const { pageCount, offset } = usePagination(currentPage)
  const [filteredPageCount, setFilteredPageCount] = useState(0)

  // get pokemon data
  const [pokemonObject, urlsMap, dataProcessed] = usePokemonData()

  const [filterType, setFilterType] = useState('none')

  useEffect(() => {
    // console.log(currentPage)
    if (currentPage) {
      setActivePageNumber(currentPage)
      localStorage.setItem('activePageNumber', currentPage)
    } else {
      setActivePageNumber('1')
      localStorage.setItem('activePageNumber', '1')
    }
  }, [dataProcessed, currentPage])

  const handleFilter = (e) => {
    const targetType = e.target.attributes.value.value
    setFilterType(targetType)
    const filteredLength = urlsMap.filter((url) => {
      // setFilterActive(filterType)
      return pokemonObject[url.url]?.types.some(
        (type) => type.name == targetType
      )
    }).length

    navigate('/1', {
      replace: true,
    })

    let count = Math.ceil(parseInt(filteredLength) / pageLimit)
    setFilteredPageCount(count)
  }

  const { Pagination, RenderFromType, Dropdown } = CIndex

  return (
    <div className="flex flex-col justify-center items-center px-10 py-8 w-full text-white">
      {!dataProcessed ? (
        <MDSpinner />
      ) : (
        <>
          <Dropdown
            className="mb-12"
            display="Filter By:"
            handler={handleFilter}
            options={[
              {
                value: 'none',
                display: 'Remove filter',
              },
              {
                value: 'grass',
                display: 'Grass',
              },
              {
                value: 'poison',
                display: 'Poison',
              },
              {
                value: 'fire',
                display: 'Fire',
              },
              {
                value: 'water',
                display: 'Water',
              },
              {
                value: 'bug',
                display: 'Bug',
              },
              {
                value: 'electric',
                display: 'Electric',
              },
              {
                value: 'ground',
                display: 'Ground',
              },
              {
                value: 'normal',
                display: 'Normal',
              },
              {
                value: 'flying',
                display: 'Flying',
              },
              {
                value: 'fighting',
                display: 'Fighting',
              },
              {
                value: 'psychic',
                display: 'Psychic',
              },
              {
                value: 'rock',
                display: 'Rock',
              },
              {
                value: 'fairy',
                display: 'Fairy',
              },
              {
                value: 'dragon',
                display: 'Dragon',
              },
              {
                value: 'ice',
                display: 'Ice',
              },
            ]}
          />

          <Pagination
            className={`mb-7`}
            pageCount={pageCount}
            filteredPageCount={filteredPageCount}
            activePage={activePageNumber}
          />
          <div className="w-full grid gap-y-14 gap-x-5 place-content-center place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
            {urlsMap
              .filter((url) => {
                if (filterType !== 'none') {
                  return pokemonObject[url.url]?.types.some(
                    (type) => type.name == filterType
                  )
                } else return true
              })
              .map((url, i, arr) => {
                console.log(pokemonObject[url.url])
                return isIndexInBounds(offset, pageLimit, i) ? (
                  <RenderFromType
                    render="card"
                    name={pokemonObject[url.url]?.name}
                    sprites={pokemonObject[url.url]?.sprites}
                    types={pokemonObject[url.url]?.types}
                    key={i}
                  />
                ) : (
                  ''
                )
              })}
          </div>
          <Pagination
            className="mt-7"
            pageCount={pageCount}
            filteredPageCount={filteredPageCount}
            activePage={activePageNumber}
          />
        </>
      )}
    </div>
  )
}

export default Home
