import { useEffect, useState, useContext, useReducer } from 'react'
import MainContext from '../contexts/MainContext'
import {
  pokemonReducerInit,
  pokemonReducer,
} from '../reducer/pokemonReducer.js'
import { SET_POKEMON_DATA } from '../reducer/actions.js'
import { useDataFromUrl } from './dataHooks.js'
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
  const [pokemonState, dispatch] = useReducer(
    pokemonReducer,
    pokemonReducerInit
  )
  const { urlLimit } = useContext(MainContext)
  const urlInit = `https://pokeapi.co/api/v2/pokemon/?limit=${urlLimit}`

  const [urlsInitState] = useDataFromUrl(urlInit, dataCategories.urlsInit)
  const [pokemonDataProcessed, setDataProcessed] = useState(false)

  let localPokemonData = JSON.parse(localStorage.getItem('pokemonData'))
  let pokemonData = {}

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
          console.log('pokemon data from local!')
          return localPokemonData[url]
        }
      })
    )

    const finalData = []

    urls.map((url, i) => {
      if (i > parseInt(urlLimit) - 1 || !url) return
      if (!!localPokemonData && localPokemonData[url]) {
        const { types, abilities, stats, held_items, moves } =
          localPokemonData[url]

        const {
          id,
          name,
          base_experience,
          height,
          weight,
          location_area_encounters,
          sprites,
        } = result[i]

        // importing from local is in diff format,
        // since when save from api, i save cust format below
        const dataFromLocal = {
          id,
          name,
          base_experience,
          height,
          weight,
          location_area_encounters,
          sprites,
          types: types.map(({ name, url }) => {
            return {
              name,
              url,
            }
          }),
          abilities: abilities.map(({ name, url }) => {
            return {
              name,
              url,
            }
          }),
          stats: stats.map(({ name, base_stat, effort }) => {
            return {
              name,
              base_stat,
              effort,
            }
          }),
          held_items: held_items.map(({ name, url }) => {
            return {
              name,
              url,
            }
          }),
          moves: moves.map(({ name, url }) => {
            return {
              name,
              url,
            }
          }),
        }

        finalData[i] = dataFromLocal
        pokemonData[urls[i]] = dataFromLocal
      } else {
        const {
          id,
          name,
          base_experience,
          height,
          weight,
          location_area_encounters,
          sprites,
          types,
          abilities,
          stats,
          held_items,
          moves,
        } = result[i]

        // save to local in custom format
        const dataFromApi = {
          id,
          name,
          base_experience,
          height,
          weight,
          location_area_encounters,
          sprites,
          types: types.map(({ type: { name, url } }) => {
            return {
              name,
              url,
            }
          }),
          abilities: abilities.map(({ ability: { name, url } }) => {
            return {
              name,
              url,
            }
          }),
          stats: stats.map(({ stat: { name }, base_stat, effort }) => {
            return {
              name,
              base_stat,
              effort,
            }
          }),
          held_items: held_items.map(({ item: { name, url } }) => {
            return {
              name,
              url,
            }
          }),
          moves: moves.map(({ move: { name, url } }) => {
            return {
              name,
              url,
            }
          }),
        }

        // prev data set above from local
        // array to send to component
        finalData[i] = { ...dataFromApi, ...finalData[i] }

        // obj for caching
        pokemonData[urls[i]] = {
          ...pokemonData[urls[i]],
          ...dataFromApi,
        }
      }
    })

    // cache, then dispatch
    localStorage.setItem('pokemonData', JSON.stringify(pokemonData))
    dispatch({ type: SET_POKEMON_DATA, payload: finalData })
    setDataProcessed(true)
  }

  useEffect(() => {
    fetchData(urlsInitState, localPokemonData)
  }, [urlsInitState])

  return [pokemonState, pokemonDataProcessed]
}

export const useAssignedFullData = (pokemon) => {
  const [dataValues, setDataValues] = useState({
    id: 0,
    name: '',
    height: '',
    weight: '',
    abilities: [{ name: '', url: '' }],
    location_area_encounters: '',
    moves: [
      {
        name: '',
        url: '',
      },
    ],
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
    if (pokemonData.length > 0) {
      let currentPokemon = pokemonData.filter((el) => el.name == pokemon)

      currentPokemon = {
        ...currentPokemon[0],
      }
      // console.log(currentPokemon)
      // destructure desired vals
      const {
        id,
        name,
        height,
        weight,
        abilities,
        location_area_encounters,
        moves,
        sprites: {
          front_default,
          other: { dream_world, home },
          versions: {
            'generation-i': generationI,
            'generation-ii': generationII,
          },
        },
      } = currentPokemon

      // set vals
      setDataValues({
        ...dataValues,
        id,
        name,
        height,
        weight,
        abilities,
        location_area_encounters,
        moves,
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
