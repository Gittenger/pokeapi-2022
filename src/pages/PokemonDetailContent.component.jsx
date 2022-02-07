import React, { useEffect, useState } from 'react'

import CIndex from '../components/components.index.js'
import { usePartialData, useFullData, useTitle } from '../utils/hooks.js'

/*
name -> check for existing name in localPartials
if name in localPartials, find Id, send single Url to fullData
if name not in localPartials, fetch urlForPartials
then, send urlForPartials to usePartialData
then use component state for partialData to identify current pokemon
with id, update urlForFullData
*/

const PokemonDetailContent = ({ pokemon: name }) => {
  useTitle(name.charAt(0).toUpperCase() + name.slice(1))
  const [urlsForPartials, setUrlsForPartials] = useState([])
  const [urlForFullData, setUrlForFullData] = useState([])
  const [fullData, fullDataProcessed] = useFullData(urlForFullData)
  const [partialData, partialDataProcessed] = usePartialData(urlsForPartials)

  useEffect(() => {
    // fetch urls to get partial data if needed
    const fetchUrls = async (urlInit) => {
      const data = await fetch(urlInit).then((res) => res.json())
      setUrlsForPartials(data.results.map((el) => el.url))
    }

    // check local storage for partial data
    const localPartialData = JSON.parse(localStorage.getItem('partials'))
    // prevent null converted to Obj errors
    if (!!localPartialData) {
      const keys = Object.keys(localPartialData)
      if (keys.length != 0) {
        const currentPokemon = keys
          // map to array of values (eliminate url as key)
          .map((key) => {
            return localPartialData[key]
          })
          // then filter by name from urlParam
          .filter((el) => el.name == name)

        const localId = currentPokemon[0].id
        const fullUrl = `https://pokeapi.co/api/v2/pokemon/${localId}/`
        setUrlForFullData([fullUrl])

        // if no local data but component data (prob never happen)
      } else {
        const currentPokemon = partialData.filter((el) => el.name == name)

        const componentStateId = currentPokemon[0].id
        const fullUrl = `https://pokeapi.co/api/v2/pokemon/${componentStateId}/`
        setUrlForFullData([fullUrl])
      }

      // if no partial data exists
    } else {
      // later, set this in context/env
      const limit = '151'
      const urlInit = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}`
      // fetch urls, then use urls to get partial, then re-run useEffect
      fetchUrls(urlInit)
    }
  }, [partialData])

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
