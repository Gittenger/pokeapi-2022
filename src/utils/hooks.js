import { useEffect, useState, useContext, useReducer } from 'react'
import MainContext from '../contexts/MainContext'
import {
  pokemonReducerInit,
  pokemonReducer,
} from '../reducer/pokemonReducer.js'
import { SET_POKEMON_DATA } from '../reducer/actions.js'
import { reducer, reducerInit } from '../reducer/reducer'
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
  const [urlsInitState] = useArrayData(urlInit, dataCategories.urlsInit)

  const [pokemonState] = useDetailsData(urlsInitState, dataCategories.pokemon)

  // const [pokemonDataProcessed, setDataProcessed] = useState(false)

  return [pokemonState]
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
