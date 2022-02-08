import { useEffect, useState, useContext, useReducer } from 'react'
import MainContext from '../contexts/MainContext'
import { reducer, initState } from '../reducer/reducer'
import { SET_URLS, SET_POKEMON_DATA } from '../reducer/actions.js'

export const useUrlsInit = (urlInit) => {
  const [state, dispatch] = useReducer(reducer, initState)
  const { urlLimit } = useContext(MainContext)

  const fetchUrls = async (urlInit) => {
    const data = await fetch(urlInit).then((res) => res.json())
    // map payload as urls, dispatch, cache
    const payload = data.results.map((el) => el.url)
    dispatch({ type: SET_URLS, payload })
    localStorage.setItem('urlsInit', JSON.stringify(payload))
  }

  useEffect(() => {
    // if cached & correct length, dispatch from cache, else fetch
    const localUrlsInit = JSON.parse(localStorage.getItem('urlsInit'))
    if (!localUrlsInit || localUrlsInit.length != urlLimit) fetchUrls(urlInit)
    else {
      dispatch({ type: SET_URLS, payload: localUrlsInit })
    }
  }, [])

  return [state]
}

export const usePokemonData = () => {
  const [state, dispatch] = useReducer(reducer, initState)
  const { urlLimit } = useContext(MainContext)
  const urlInit = `https://pokeapi.co/api/v2/pokemon/?limit=${urlLimit}`

  const [urlInitState] = useUrlsInit(urlInit)
  const [pokemonDataProcessed, setDataProcessed] = useState(false)

  let localPokemonData = JSON.parse(localStorage.getItem('pokemonData'))

  const fetchData = async (urls, localPokemonData) => {
    setDataProcessed(false)
    // if no urls exit
    if (urls.length === 0) return
    // await resolved map
    const result = await Promise.all(
      urls.map((url) => {
        // if local key exists, use, else fetch
        if (localPokemonData == null || !localPokemonData[url]) {
          console.log(`fetching from ${url}`)
          return fetch(url).then((res) => res.json())
        } else {
          console.log('from local!')
          return localPokemonData[url]
        }
      })
    )

    const finalData = []
    const pokemonData = {}

    result.forEach((url, i) => {
      if (i > parseInt(urlLimit) - 1) return

      // choose fields
      const {
        id,
        name,
        abilities,
        species,
        forms,
        types,
        order,
        base_experience,
        height,
        weight,
        stats,
        // location_area_encounters,
        // moves,
        sprites,
      } = result[i]

      const shrink = {
        id,
        name,
        abilities,
        species,
        forms,
        types,
        order,
        base_experience,
        height,
        weight,
        stats,
        sprites,
      }
      // array to send to component
      finalData.push(shrink)

      // obj for caching
      pokemonData[urls[i]] = shrink
    })

    // cache, then dispatch
    localStorage.setItem('pokemonData', JSON.stringify(pokemonData))
    dispatch({ type: SET_POKEMON_DATA, payload: finalData })
    setDataProcessed(true)
  }

  useEffect(() => {
    fetchData(urlInitState.urlsInit, localPokemonData)
  }, [urlInitState.urlsInit])

  return [state, pokemonDataProcessed]
}

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

export const useAssignedFullData = (pokemon) => {
  const [dataValues, setDataValues] = useState({
    id: 0,
    name: '',
    height: '',
    weight: '',
    sprites: {
      front_default: '',
      other: {
        dream_world: {
          front_default: '',
        },
        home: {
          front_default: '',
          front_shiny: '',
        },
      },
      versions: {
        generationI: {
          redBlue: { front_transparent: '' },
          yellow: { front_transparent: '' },
        },
        generationII: {
          crystal: { front_transparent: '', front_shiny_transparent: '' },
          gold: { front_transparent: '' },
          silver: { front_transparent: '' },
        },
      },
    },
  })
  const [pokemonData] = usePokemonData()

  useEffect(() => {
    if (pokemonData.pokemonData.length > 0) {
      let currentPokemon = pokemonData.pokemonData.filter(
        (el) => el.name == pokemon
      )

      currentPokemon = {
        ...currentPokemon[0],
      }
      // destructure desired vals
      const {
        id,
        name,
        height,
        weight,
        sprites: {
          front_default,
          other: { dream_world, home },
          versions: {
            'generation-i': generationI,
            'generation-ii': generationII,
          },
        },
      } = currentPokemon
      console.log(generationI, generationII)

      // set vals
      setDataValues({
        ...dataValues,
        id,
        name,
        height,
        weight,
        sprites: {
          front_default,
          other: {
            dream_world: {
              front_default: dream_world.front_default,
            },
            home: {
              front_default: home.front_default,
              front_shiny: home.front_shiny,
            },
          },
          versions: {
            generationI: {
              redBlue: {
                front_transparent: generationI['red-blue'].front_transparent,
              },
              yellow: {
                front_transparent: generationI['yellow'].front_transparent,
              },
            },
            generationII: {
              crystal: {
                front_transparent: generationII['crystal'].front_transparent,
                front_shiny_transparent:
                  generationII['crystal'].front_shiny_transparent,
              },
              gold: {
                front_transparent: generationII['gold'].front_transparent,
              },
              silver: {
                front_transparent: generationII['silver'].front_transparent,
              },
            },
          },
        },
      })
    }
  }, [pokemon, pokemonData])

  return [dataValues]
}
