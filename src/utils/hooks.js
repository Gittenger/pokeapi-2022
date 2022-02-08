import { useEffect, useState, useContext } from 'react'
import MainContext from '../contexts/MainContext'

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

export const usePartialData = (urls) => {
  const [partialData, setPartialData] = useState([])
  const [partialDataProcessed, setDataProcessed] = useState(false)
  const { urlLimit } = useContext(MainContext)

  const localPartials = JSON.parse(localStorage.getItem('partials'))

  const fetchData = async (urls, localPartials) => {
    setDataProcessed(false)
    if (urls.length === 0) return
    const result = await Promise.all(
      urls.map((url) => {
        if (localPartials == null || !localPartials[url]) {
          console.log(`fetching from ${url}`)
          return fetch(url).then((res) => res.json())
        } else {
          console.log('from local!')
          return localPartials[url]
        }
      })
    )

    const finalData = []

    const partials = {}
    result.forEach((url, i) => {
      if (i > parseInt(urlLimit) - 1) return
      const {
        id,
        name,
        types,
        sprites: { front_default, back_default, other },
      } = result[i]

      const shrink = {
        name,
        id,
        types,
        sprites: {
          front_default,
          back_default,
          other: {
            dream_world: other.dream_world,
            'official-artwork': other['official-artwork'],
          },
        },
      }
      partials[urls[i]] = shrink
      finalData.push(shrink)
    })
    localStorage.setItem('partials', JSON.stringify(partials))
    setPartialData(finalData)
    setDataProcessed(true)
  }

  useEffect(() => {
    // console.log('lP', localPartials)
    if (urls !== []) fetchData(urls, localPartials)
  }, [urls])

  return [partialData, partialDataProcessed]
}

export const useFullData = (urls) => {
  const [fullData, setFullData] = useState([])
  const [fullDataProcessed, setDataProcessed] = useState(false)

  let localFullData = JSON.parse(localStorage.getItem('fullData'))

  const fetchData = async (urls, localFullData) => {
    setDataProcessed(false)
    if (urls.length === 0) return
    const result = await Promise.all(
      urls.map((url) => {
        if (localFullData == null || !localFullData[url]) {
          console.log(`fetching from ${url}`)
          return fetch(url).then((res) => res.json())
        } else {
          console.log('from local!')
          return localFullData[url]
        }
      })
    )

    const finalData = []

    let fullData = {}
    result.forEach((url, i) => {
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
      finalData.push(shrink)
      fullData = { ...localFullData, [urls[i]]: shrink }
    })

    localStorage.setItem('fullData', JSON.stringify(fullData))
    setFullData(finalData)
    setDataProcessed(true)
  }

  useEffect(() => {
    if (urls !== []) fetchData(urls, localFullData)
  }, [urls])

  return [fullData, fullDataProcessed]
}

/*
name -> check for existing name in localPartials
if name in localPartials, find Id, send single Url to fullData
if name not in localPartials, fetch urlForPartials
then, send urlForPartials to usePartialData
then use component state for partialData to identify current pokemon
with id, update urlForFullData
*/
export const useFullDataFetch = (name) => {
  const [urlsForPartials, setUrlsForPartials] = useState([])
  const [urlForFullData, setUrlForFullData] = useState([])
  const [fullData, fullDataProcessed] = useFullData(urlForFullData)
  const [partialData, partialDataProcessed] = usePartialData(urlsForPartials)

  const { urlLimit } = useContext(MainContext)

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
      const urlInit = `https://pokeapi.co/api/v2/pokemon/?limit=${urlLimit}`
      // fetch urls, then use urls to get partial, then re-run useEffect
      fetchUrls(urlInit)
    }
  }, [partialData])

  return [fullData]
}

export const useAssignedFullData = (fullData) => {
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

  useEffect(() => {
    if (fullData.length > 0) {
      console.log(fullData)

      // convert to obj
      let obj = {
        ...fullData[0],
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
      } = obj
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
  }, [fullData])

  return [dataValues]
}
