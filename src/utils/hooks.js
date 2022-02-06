import { useEffect, useState } from 'react'

export const useApiData = (urls) => {
  const [apiData, setApiData] = useState([])
  const [dataProcessed, setDataProcessed] = useState(false)

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
      const {
        id,
        name,
        species,
        forms,
        types,
        sprites: { front_default, back_default, other },
      } = result[i]

      const shrink = {
        name,
        id,
        species,
        forms,
        types,
        sprites: {
          front_default,
          back_default,
          other: {
            dream_world: result[i].sprites.other.dream_world,
            'official-artwork': result[i].sprites.other['official-artwork'],
          },
        },
      }
      partials[urls[i]] = shrink
      finalData.push(shrink)
    })
    localStorage.setItem('partials', JSON.stringify(partials))
    setApiData(finalData)
    setDataProcessed(true)
  }

  useEffect(() => {
    console.log('lP', localPartials)
    if (urls !== []) fetchData(urls, localPartials)
  }, [urls])

  return [apiData, dataProcessed]
}

export const useFullData = (urls) => {
  const [fullData, setFullData] = useState([])
  const [dataProcessed, setDataProcessed] = useState(false)

  const localFullData = JSON.parse(localStorage.getItem('fullData'))

  const fetchData = async (urls, localFullData) => {
    setDataProcessed(false)
    if (urls.length === 0) return
    console.log('urls not empty, continuing')
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

    console.log(result)
    const finalData = []

    const fullData = {}
    result.forEach((url, i) => {
      const {
        id,
        name,
        species,
        forms,
        types,
        sprites: { front_default, back_default, other },
      } = result[i]

      // const shrink = {
      //   name,
      //   id,
      //   species,
      //   forms,
      //   types,
      //   sprites: {
      //     front_default,
      //     back_default,
      //     other: {
      //       dream_world: result[i].sprites.other.dream_world,
      //       'official-artwork': result[i].sprites.other['official-artwork'],
      //     },
      //   },
      // }
      fullData[urls[i]] = result[i]
      finalData.push(result[i])
    })
    localStorage.setItem('fullData', JSON.stringify(fullData))
    setFullData(finalData)
    setDataProcessed(true)
  }

  useEffect(() => {
    console.log('urls', urls)
    console.log('localFull', localFullData)
    if (urls !== []) fetchData(urls, localFullData)
  }, [urls])

  return [fullData, dataProcessed]
}
