import { useEffect, useState } from 'react'

export const usePartialData = (urls) => {
  const [partialData, setPartialData] = useState([])
  const [partialDataProcessed, setDataProcessed] = useState(false)

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
        sprites: { front_default, back_default, other },
      } = result[i]

      const shrink = {
        name,
        id,
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
