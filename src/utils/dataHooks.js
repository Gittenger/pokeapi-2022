import { useEffect, useState, useContext, useReducer } from 'react'
import MainContext from '../contexts/MainContext'
import {
  abilitiesReducer,
  abilitiesReducerInit,
} from '../reducer/abilitiesReducer.js'
import { SET_ABILITIES_DATA } from '../reducer/actions.js'

export const useAbilitiesData = (urls) => {
  const [abilitiesState, dispatch] = useReducer(
    abilitiesReducer,
    abilitiesReducerInit
  )

  const { urlLimit } = useContext(MainContext)

  let localAbilitiesData = JSON.parse(localStorage.getItem('abilitiesData'))
  let abilitiesData = {}

  if (!!localAbilitiesData && Object.keys(localAbilitiesData).length > 0) {
    abilitiesData = { ...localAbilitiesData }
  }

  const fetchData = async (urls, localAbilitiesData) => {
    //  setDataProcessed(false)
    // if no urls exit
    if (urls.length === 0) return
    // await resolved map
    const result = await Promise.all(
      urls.map((url) => {
        // if local key exists, use, else fetch
        if (!url) return
        if (localAbilitiesData == null || !localAbilitiesData[url]) {
          console.log(`fetching abilities from ${url}`)
          return fetch(url).then((res) => res.json())
        } else {
          console.log('abilities from local!')
          return localAbilitiesData[url]
        }
      })
    )

    const finalData = []

    urls.map((url, i) => {
      if (i > parseInt(urlLimit) - 1 || !url) return
      if (!!localAbilitiesData && localAbilitiesData[url]) {
        console.log('setting from local')
        const {
          id,
          name,
          effect_changes,
          flavor_text_entries,
          effect_entries,
          pokemon,
        } = localAbilitiesData[url]

        const dataFromLocal = {
          id,
          name,
          effect_changes,
          flavor_text_entries,
          effect_entries,
          pokemon,
        }

        finalData[i] = dataFromLocal
        abilitiesData[urls[i]] = dataFromLocal
      } else {
        const {
          id,
          name,
          effect_changes,
          flavor_text_entries,
          effect_entries,
          pokemon,
        } = result[i]

        const dataFromApi = {
          id,
          name,
          effect_changes,
          flavor_text_entries,
          effect_entries,
          pokemon,
        }

        finalData[i] = { ...finalData[i], ...dataFromApi }
        abilitiesData[urls[i]] = { ...abilitiesData[urls[i]], ...dataFromApi }
      }

      localStorage.setItem('abilitiesData', JSON.stringify(abilitiesData))
      dispatch({ type: SET_ABILITIES_DATA, payload: finalData })
      // setDataProcessed(true)
    })
  }

  useEffect(() => {
    fetchData(urls, localAbilitiesData)
  }, [urls])

  return [abilitiesState]
}
