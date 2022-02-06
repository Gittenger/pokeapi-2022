import React, { useEffect, useState } from 'react'
import MDSpinner from 'react-md-spinner'
import { useApiData } from '../../utils/hooks'

const Display = () => {
  const [urls, setUrls] = useState([])
  const [apiData, dataProcessed] = useApiData(urls)

  let urlInit = 'https://pokeapi.co/api/v2/pokemon/?limit=151'

  useEffect(() => {
    const fetchUrls = async (urlInit) => {
      const data = await fetch(urlInit).then((res) => res.json())
      setUrls(data.results.map((el) => el.url))
    }

    fetchUrls(urlInit)
  }, [])

  return (
    <div className="flex-col items-center px-6 py-8">
      <div className="grid gap-y-14 gap-x-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {!dataProcessed ? (
          <MDSpinner />
        ) : (
          apiData.map((el, i) => (
            <div
              className="flex flex-col justify-start items-center p-5 bg-slate-200 ring-4 ring-gray-800 shadow-2xl rounded-3xl"
              key={i}
            >
              <h3 className="capitalize text-gray-800 text-2xl underline font-bold">
                {el.name}
              </h3>
              <div className="mt-2">
                <img
                  src={el.sprites.other['official-artwork'].front_default}
                  alt=""
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Display
