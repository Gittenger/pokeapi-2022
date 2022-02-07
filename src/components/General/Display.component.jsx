import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MDSpinner from 'react-md-spinner'
import { usePartialData, usePagination } from '../../utils/hooks'
import CIndex from '../components.index.js'

const Display = ({ id: currentPage }) => {
  const { Pagination } = CIndex
  const { pageCount, offset, urlLimit, pageLimit } = usePagination(
    currentPage,
    '151',
    13
  )

  const [urls, setUrls] = useState([])
  const [partialData, partialDataProcessed] = usePartialData(urls)
  const [activePage, setActivePage] = useState('1')

  let urlInit = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${urlLimit}`

  useEffect(() => {
    if (currentPage) setActivePage(currentPage)

    const fetchUrls = async (urlInit) => {
      const data = await fetch(urlInit).then((res) => res.json())
      setUrls(data.results.map((el) => el.url))
    }

    fetchUrls(urlInit)
  }, [])

  return (
    <div className="flex-col items-center px-6 py-8">
      <div className="grid gap-y-14 gap-x-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {!partialDataProcessed ? (
          <MDSpinner />
        ) : (
          partialData.map((el, i) =>
            i > offset - 1 && i < offset + pageLimit - 1 ? (
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
          )
        )}
      </div>
      <Pagination pageCount={pageCount} activePage={activePage} />
    </div>
  )
}

export default Display
