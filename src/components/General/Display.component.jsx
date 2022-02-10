import React, { useEffect, useState, useContext, useReducer } from 'react'
import { Link } from 'react-router-dom'
import MDSpinner from 'react-md-spinner'
import MainContext from '../../contexts/MainContext'

import { usePagination, usePokemonData } from '../../utils/hooks'
import isIndexInBounds from '../../utils/checkBounds'
import CIndex from '../components.index.js'

const Display = ({ id: currentPage }) => {
  // page settings
  const { pageLimit } = useContext(MainContext)
  const [activePage, setActivePage] = useState('1')
  const { pageCount, offset } = usePagination(currentPage, 13)

  // get pokemon data
  const [pokemonObject, urlsMap] = usePokemonData()

  useEffect(() => {
    if (currentPage) setActivePage(currentPage)
  }, [])

  const { Pagination } = CIndex

  return (
    <div className="flex-col items-center px-6 py-8">
      {false ? (
        <MDSpinner />
      ) : (
        <>
          <Pagination
            className={`mb-7`}
            pageCount={pageCount}
            activePage={activePage}
          />
          <div className="grid gap-y-14 gap-x-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
              .map((el, i) => {
                return isIndexInBounds(offset, pageLimit, i) ? (
                  <div
                    className="flex flex-col justify-start items-center p-5 bg-slate-200 ring-4 ring-gray-800 shadow-2xl rounded-3xl"
                    key={i}
                  >
                    <div className="">
                      <ul className="flex space-x-2">
                        {pokemonObject[el.url]?.types.map((type, i) => (
                          <li key={i}>{type.name}</li>
                        ))}
                      </ul>
                      {pokemonObject[el.url]?.stats
                        .filter((el) => {
                          return el.name == 'hp'
                        })
                        .map((el, i) => (
                          <p key={i}>hp: {el.base_stat}</p>
                        ))}
                    </div>
                    <h3 className="capitalize text-gray-800 text-2xl underline font-bold">
                      <Link to={`/pokemon/${pokemonObject[el.url]?.name}`}>
                        {pokemonObject[el.url]?.name}
                      </Link>
                    </h3>
                    <div className="mt-2">
                      <img
                        src={
                          pokemonObject[el.url]?.sprites.other[
                            'official-artwork'
                          ].front_default
                        }
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
