import { useEffect, useState, useContext, useReducer } from 'react'
import MainContext from '../contexts/MainContext'
import { useArrayData, useDetailsData } from './dataHooks.js'
import dataCategories from './dataCategories'

export const useTitle = (title) => {
  useEffect(() => {
    document.title = `${process.env.MAIN_TITLE} | ${title}`
  }, [title])
}

export const usePagination = (currentPage) => {
  const [pageCount, setPageCount] = useState(1)
  const [offset, setOffset] = useState(0)

  const { urlLimit, pageLimit } = useContext(MainContext)

  const setLimits = (currentPage, urlLimit, pageLimit) => {
    // how many pages
    let count = Math.ceil(parseInt(urlLimit) / pageLimit)
    setPageCount(count)

    // calculate offset based on current page
    let offsetCalc = 0
    if (!!currentPage) offsetCalc = pageLimit * currentPage - pageLimit
    setOffset(offsetCalc)
  }

  useEffect(() => {
    setLimits(currentPage, urlLimit, pageLimit)
  }, [])

  return { pageCount, offset }
}

export const usePokemonData = () => {
  const { urlLimit } = useContext(MainContext)

  const urlInit = `https://pokeapi.co/api/v2/pokemon/?limit=${urlLimit}`
  const [urlResults] = useArrayData(urlInit, dataCategories.urlsInit)
  const [urlsMap, setUrlsMap] = useState([])

  const [pokemonObject, dataProcessed] = useDetailsData(
    urlsMap,
    dataCategories.pokemon
  )

  useEffect(() => {
    setUrlsMap(urlResults.map((el) => el.url))
  }, [urlResults])

  return [pokemonObject, urlResults, dataProcessed]
}

export const useAssignedFullData = (pokemon) => {
  const [abilitiesMap, setAbilitiesMap] = useState([])
  const [movesMap, setMovesMap] = useState([])
  const [itemsMap, setItemsMap] = useState([])
  const [versionsMap] = useArrayData(
    'https://pokeapi.co/api/v2/version/',
    dataCategories.versions
  )
  // encounter url from currentPokemon
  const [encountersUrl, setEncountersUrl] = useState('')

  // maps of urls to get more data, updates when states above update
  const [abilitiesObject] = useDetailsData(
    abilitiesMap,
    dataCategories.abilities
  )
  const [movesObject] = useDetailsData(movesMap, dataCategories.moves)
  const [itemsObject] = useDetailsData(itemsMap, dataCategories.items)
  const [encountersData] = useArrayData(
    encountersUrl,
    dataCategories.encounters
  )

  const [dataProcessed, setDataProcessed] = useState(false)

  const [currentPokemonData, setCurrentPokemonData] = useState({
    id: 0,
    name: '',
    height: '',
    weight: '',
    stats: [],
    location_area_encounters: '',
    held_items: [],
    abilities: [],
    moves: [
      {
        name: '',
        url: '',
      },
    ],
    sprites: {
      front_default: '',
      other: {
        dream_world: {},
        home: {},
      },
    },
  })

  // get top level pokemon data (usually just from local)
  const [pokemonObject, urlsMap] = usePokemonData()

  // create curated data from incoming pokemonData
  useEffect(() => {
    if (Object.keys(pokemonObject).length > 0) {
      let currentPokemon = urlsMap
        .map((el) => {
          return pokemonObject[el.url]
        })
        .filter((el) => el.name == pokemon)

      currentPokemon = {
        ...currentPokemon[0],
      }

      // destructure desired vals
      // const {
      //   id,
      //   name,
      //   height,
      //   weight,
      //   abilities,
      //   location_area_encounters,
      //   held_items,
      //   moves,
      //   sprites
      // } = currentPokemon

      // set vals
      setCurrentPokemonData(currentPokemon)
      setDataProcessed(true)
    }
  }, [pokemon, pokemonObject])

  // set maps of secondary urls
  // hook will return details of these maps
  useEffect(() => {
    setAbilitiesMap(
      currentPokemonData.abilities.map((el) => {
        return el.url
      })
    )

    setMovesMap(
      currentPokemonData.moves.map((el) => {
        return el.url
      })
    )

    setItemsMap(currentPokemonData.held_items.map((el) => el.url))

    setEncountersUrl(currentPokemonData.location_area_encounters)
  }, [currentPokemonData])

  return {
    versionsMap,
    currentPokemonData,
    dataProcessed,
    itemsObject,
    movesObject,
    abilitiesObject,
    encountersData,
  }
}
