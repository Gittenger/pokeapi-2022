import { useEffect, useState, useContext, useReducer } from 'react'
import MainContext from '../contexts/MainContext'

import { reducer, reducerInit } from '../reducer/reducer.js'
import { SET_DATA } from '../reducer/actions.js'

export const useDetailsData = (urls, dataCategory) => {
  const { urlLimit } = useContext(MainContext)
  const [reducerState, dispatch] = useReducer(reducer, reducerInit)

  const { localKey, category, options, transformationKeys } = dataCategory

  let localData = JSON.parse(localStorage.getItem(localKey))
  let objectToSave = {}
  const arrayToSave = []

  // if local data exists and has values, prepare for re-saving
  if (!!localData && Object.keys(localData).length > 0) {
    objectToSave = { ...localData }
  }

  const fetchData = async (urls, localData) => {
    //  setDataProcessed(false)
    // if no urls exit
    if (urls.length === 0) return
    // await resolved map
    const result = await Promise.all(
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

          // array--component, object--local
          arrayToSave[urlIndex] = localData[url]
          objectToSave[urls[urlIndex]] = localData[url]
          return localData[url]
        }
      })
    )

    // if (dataCategory.category == 'moves') console.log(result)

    // set from API
    urls.forEach((url, urlIndex) => {
      if (!url) return
      // if using url limit for data
      if (options.useUrlLimit && urlIndex > parseInt(urlLimit) - 1) return
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

        // array for sending to component
        arrayToSave[urlIndex] = { ...arrayToSave[urlIndex], ...dataFromApi }
        // object for saving to local
        objectToSave[urls[urlIndex]] = {
          ...objectToSave[urls[urlIndex]],
          ...dataFromApi,
        }
      }
    })

    // save obj to local
    localStorage.setItem(localKey, JSON.stringify(objectToSave))
    dispatch({ type: SET_DATA, payload: arrayToSave })
    // setDataProcessed(true)
  }

  useEffect(() => {
    fetchData(urls, localData)
  }, [urls])

  return [reducerState]
}
