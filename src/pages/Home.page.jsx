import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import MDSpinner from 'react-md-spinner'
import MainContext from '../contexts/MainContext'

import { usePagination, useTitle } from '../utils/hooks'
import { usePokemonData } from '../utils/dataHooks'
import { isIndexInBounds } from '../utils/utilFunctions.js'
import CIndex from '../components/components.index.js'

const Home = ({ title }) => {
  const { currentPage } = useParams()
  useTitle(title)
  // page settings
  const { pageLimit, activePageNumber, setActivePageNumber } =
    useContext(MainContext)
  const { pageCount, offset } = usePagination(currentPage)

  // get pokemon data
  const [pokemonObject, urlsMap, dataProcessed] = usePokemonData()

  useEffect(() => {
    // console.log(currentPage)
    if (currentPage) {
      setActivePageNumber(currentPage)
      localStorage.setItem('activePageNumber', currentPage)
    } else {
      setActivePageNumber('1')
      localStorage.setItem('activePageNumber', '1')
    }
  }, [dataProcessed, currentPage, offset])

  const { Pagination, RenderFromType } = CIndex

  return (
    <div className="flex flex-col justify-center items-center px-10 py-8 w-full">
      {!dataProcessed ? (
        <MDSpinner />
      ) : (
        <>
          <Pagination
            className={`mb-7`}
            pageCount={pageCount}
            activePage={activePageNumber}
          />
          <div className="w-full grid gap-y-14 gap-x-5 place-content-center place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
            {urlsMap
              // .filter((url) => {
              //   return pokemonObject[url.url]?.types.some(
              //     (type) => type.name == 'poison'
              //   )
              // })
              // .filter((el) => el.types.length > 0)
              .map((url, i) => {
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
            activePage={activePageNumber}
          />
        </>
      )}
    </div>
  )
}

export default Home
