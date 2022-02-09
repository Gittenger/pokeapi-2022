import React, { useEffect } from 'react'

import data from './test.data.json'
const dataMap = data.results.map((el) => el.url)
import { useDetailsData } from '../utils/dataHooks'
import dataCategories from '../utils/dataCategories'

const TestPage = () => {
  useDetailsData(dataMap, dataCategories.moves)

  useEffect(() => {}, [])

  return (
    <div>
      <h2>testing</h2>
    </div>
  )
}

export default TestPage
