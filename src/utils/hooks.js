import { useEffect, useState } from 'react'

export const useApiData = (urls) => {
  const [apiData, setApiData] = useState([])
  const [dataProcessed, setDataProcessed] = useState(false)

  const cachedItems = {}
  urls.forEach((url) => {
    cachedItems[url] = JSON.parse(localStorage.getItem(url))
  })

  const fetchData = async (urls, cachedItems) => {
    setDataProcessed(false)
    if (urls == []) return
    const result = await Promise.all(
      urls.map((url) => {
        if (!cachedItems[url]) {
          console.log(`fetching from ${url}`)
          return fetch(url).then((res) => res.json())
        } else {
          console.log('from local!')
          return cachedItems[url]
        }
      })
    )

    const finalData = []
    result.forEach((url, i) => {
      const {
        name,
        species,
        forms,
        types,
        sprites: { front_default, back_default, other },
      } = result[i]

      const shrink = {
        name,
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
      localStorage.setItem(urls[i], JSON.stringify(shrink))
      finalData.push(result[i])
    })
    setApiData(finalData)
    setDataProcessed(true)
  }

  useEffect(() => {
    if (urls !== []) fetchData(urls, cachedItems)
  }, [urls])

  return [apiData, dataProcessed]
}
