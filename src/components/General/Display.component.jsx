import React, { useEffect, useState, useContext, useReducer } from 'react'
import { Link } from 'react-router-dom'
import MDSpinner from 'react-md-spinner'
import MainContext from '../../contexts/MainContext'

import { usePartialData, usePagination, useUrlsInit } from '../../utils/hooks'
import isIndexInBounds from '../../utils/checkBounds'
import CIndex from '../components.index.js'

const Display = ({ id: currentPage }) => {
  const { urlLimit, pageLimit } = useContext(MainContext)
  let urlInit = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${urlLimit}`
  const [activePage, setActivePage] = useState('1')
  const { pageCount, offset } = usePagination(currentPage, 13)

  const [state] = useUrlsInit(urlInit)

  const [partialData, partialDataProcessed] = usePartialData(state.urlsInit)

  useEffect(() => {
    if (currentPage) setActivePage(currentPage)
  }, [])

  const { Pagination } = CIndex

  return (
    <div className="flex-col items-center px-6 py-8">
      {!partialDataProcessed ? (
        <MDSpinner />
      ) : (
        <>
          <Pagination
            className={`mb-7`}
            pageCount={pageCount}
            activePage={activePage}
          />
          <div className="grid gap-y-14 gap-x-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {state.results?.map((el) => (
              <div>
                <p>{el}</p>
              </div>
            ))}
            {partialData
              // .map((el) => {
              //   return {
              //     ...el,
              //     types: el.types.filter((type) => {
              //       return type.type.name == 'grass'
              //     }),
              //   }
              // })
              // .filter((el) => el.types.length > 0)
              .map((el, i) => {
                return isIndexInBounds(offset, pageLimit, i) ? (
                  <div
                    className="flex flex-col justify-start items-center p-5 bg-slate-200 ring-4 ring-gray-800 shadow-2xl rounded-3xl"
                    key={i}
                  >
                    <h3 className="capitalize text-gray-800 text-2xl underline font-bold">
                      <Link to={`/pokemon/${el.name}`}>{el.name}</Link>
                    </h3>
                    <div className="mt-2">
                      <img
                        src={el.sprites.other['official-artwork'].front_default}
                        alt=""
                      />
                    </div>
                  </div>
                ) : (
                  ''
                )
              })}
          </div>
          <Pagination
            className="mt-7"
            pageCount={pageCount}
            activePage={activePage}
          />
        </>
      )}
    </div>
  )
}

export default Display
