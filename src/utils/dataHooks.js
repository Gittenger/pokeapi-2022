import { useEffect, useState, useContext, useReducer } from 'react'
import MainContext from '../contexts/MainContext'

import {
  reducer,
  reducerInit,
  SET_ARRAY,
  SET_OBJECT,
} from '../reducer/reducer.js'

import dataCategories from './dataCategories'

export const useDetailsData = (urls, dataCategory) => {
  const { urlLimit } = useContext(MainContext)
  const [objectReducerState, dispatchObject] = useReducer(
    reducer,
    reducerInit.object
  )
  const [dataProcessed, setDataProcessed] = useState(false)

  const { localKey, category, options, transformationKeys } = dataCategory

  console.log(localStorage.getItem(localKey))
  let localData = JSON.parse(localStorage.getItem(localKey))
  let objectToSave = {}

  // if local data exists and has values, prepare for re-saving
  if (!!localData && Object.keys(localData).length > 0) {
    objectToSave = { ...localData }
  }

  const fetchData = async (urls, localData) => {
    // if no urls exit
    if (urls.length === 0) return
    setDataProcessed(false)
    // await resolved map
    let result = await Promise.all(
      urls.map((url, urlIndex) => {
        // if local key exists, use-- else fetch
        if (!url) return
        if (localData == null || !localData[url]) {
          console.log(`fetching ${category} from ${url}`)
          return fetch(url).then((res) => res.json())
        } else {
          console.log(`fetching/setting ${category} from local!`)
          // no transformations from local
          // each key has val from local data
          transformationKeys.forEach((el) => {
            objectToSave[url][el.key] = localData[url][el.key]
          })

          objectToSave[urls[urlIndex]] = localData[url]
          return localData[url]
        }
      })
    )

    // if (dataCategory.category == 'encounters') console.log(result)

    // set from API
    urls.forEach((url, urlIndex) => {
      if (!url) return
      // if using url limit for data, check
      if (options.useUrlLimit && urlIndex > parseInt(urlLimit) - 1) return
      // if no local data, set from api
      if (localData == null || !localData[url]) {
        console.log(`setting ${category} from API`)

        const dataFromApi = {}

        // transform and save data
        transformationKeys.forEach((el) => {
          if (el.transformation == null)
            dataFromApi[el.key] = result[urlIndex][el.key]
          else {
            dataFromApi[el.key] = el.transformation(
              result[urlIndex][el.key],
              urlIndex,
              urlLimit
            )
          }
        })

        // object for saving to local
        objectToSave[urls[urlIndex]] = {
          ...objectToSave[urls[urlIndex]],
          ...dataFromApi,
        }
      }
    })

    // save obj to local
    localStorage.setItem(localKey, JSON.stringify(objectToSave))
    dispatchObject({ type: SET_OBJECT, payload: objectToSave })

    setDataProcessed(true)
  }

  useEffect(() => {
    fetchData(urls, localData)
  }, [urls])

  return [objectReducerState, dataProcessed]
}

export const useArrayData = (url, dataCategory) => {
  // const { urlLimit } = useContext(MainContext)
  const [reducerState, dispatch] = useReducer(reducer, reducerInit.array)
  const [dataProcessed, setDataProcessed] = useState(false)

  const { localKey, category, options, transformationKeys } = dataCategory

  console.log(localStorage.getItem(localKey))
  let localData = JSON.parse(localStorage.getItem(localKey))
  let updatedLocalData = {}
  let arrayToSave = []

  // if local data exists and has values, prepare for re-saving
  if (!!localData && Object.keys(localData).length > 0) {
    updatedLocalData = { ...localData }
  }

  const fetchData = async (url, localData) => {
    //  setDataProcessed(false)
    // if no urls exit
    if (!url) return
    // if local key exists, use-- else fetch
    if (localData == null || !localData[url]) {
      console.log(`fetching ${category} from ${url}`)
      const result = await fetch(url).then((res) => res.json())

      if (result.length === 0) {
        arrayToSave = []
      } else if (
        category == dataCategories.urlsInit.category ||
        category == dataCategories.versions.category
      ) {
        arrayToSave =
          category == dataCategories.versions.category
            ? // manually adding x/y versions since not in versions API, but are in encounters
              [
                ...result.results,
                {
                  name: 'x',
                  url: '',
                },
                { name: 'y', url: '' },
              ]
            : [...result.results]
      } else {
        let transformedResult = [...result]
        // create transformations on each element of result, then prepare for saving
        transformedResult.forEach((obj, i) => {
          let newObj = {}

          transformationKeys.forEach((el) => {
            if (el.transformation == null) {
              newObj[el.key] = obj[el.key]
            } else {
              newObj[el.key] = el.transformation(obj[el.key])
            }
          })
          transformedResult[i] = newObj
        })

        arrayToSave = transformedResult
      }

      // save array in local url key
      // updatedLocal preserves old
      updatedLocalData[url] = arrayToSave
      localStorage.setItem(localKey, JSON.stringify(updatedLocalData))
    } else {
      console.log(`fetching ${category} from local`)
      arrayToSave = localData[url]
    }
    setDataProcessed(true)
    // dispatch transformed/local array to component state
    dispatch({ type: SET_ARRAY, payload: arrayToSave })
  }

  useEffect(() => {
    fetchData(url, localData)
  }, [url])

  return [reducerState, dataProcessed]
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
  const [movesObject, movesDataProcessed] = useDetailsData(
    movesMap,
    dataCategories.moves
  )
  const [itemsObject] = useDetailsData(itemsMap, dataCategories.items)
  const [encountersData, encountersDataProcessed] = useArrayData(
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
      let currentPokemon =
        pokemonObject[urlsMap.find((el) => el.name === pokemon).url]
      // console.log(currentPokemon)

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
    movesDataProcessed,
    abilitiesObject,
    encountersData,
    encountersDataProcessed,
  }
}
