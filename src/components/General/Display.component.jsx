import React, { useEffect, useState, useContext, useReducer } from 'react'
import MDSpinner from 'react-md-spinner'
import MainContext from '../../contexts/MainContext'

import { usePagination } from '../../utils/hooks'
import { usePokemonData } from '../../utils/dataHooks'
import { isIndexInBounds } from '../../utils/utilFunctions.js'
import CIndex from '../components.index.js'

const Display = ({ id: currentPage }) => {
  // page settings
  const { pageLimit, activePageNumber, setActivePageNumber } =
    useContext(MainContext)
  const { pageCount, offset } = usePagination(currentPage, 13)

  // get pokemon data
  const [pokemonObject, urlsMap, dataProcessed] = usePokemonData()

  useEffect(() => {
    if (currentPage) {
      setActivePageNumber(currentPage)
      localStorage.setItem('activePageNumber', currentPage)
    } else {
      setActivePageNumber('1')
      localStorage.setItem('activePageNumber', '1')
    }
  }, [dataProcessed])

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
              // .map((el) => {
              //   return {
              //     ...el,
              //     types: el.types.filter((type) => {
              //       return type.type.name == 'grass'
              //     }),
              //   }
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

export default Display
