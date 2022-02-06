import React, { useEffect, useState } from 'react'

import CIndex from '../components/components.index.js'
import { useApiData, useFullData } from '../utils/hooks.js'

const PokemonDetailContent = ({ name }) => {
  const [urls, setUrls] = useState([])
  const [fullData, dataProcessed] = useFullData(urls)

  let urlInit = 'https://pokeapi.co/api/v2/pokemon/?limit=3'

  useEffect(() => {
    const fetchUrls = async (urlInit) => {
      const data = await fetch(urlInit).then((res) => res.json())
      setUrls(data.results.map((el) => el.url))
    }

    const localFullData = JSON.parse(localStorage.getItem('localFullData'))

    fetchUrls(urlInit)
  }, [])

  return (
    <main className="flex flex-col items-center justify-start pb-10">
      <div className="flex flex-col justify-center items-center space-x-4">
        <p>{fullData.filter((el) => el.name == name)[0]?.id}</p>

        <p>{name}</p>
      </div>
    </main>
  )
}

export default PokemonDetailContent
