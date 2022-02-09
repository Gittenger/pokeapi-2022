import React, { useEffect } from 'react'

import data from './test.data.json'
// data.results.map((el) => el.url)
import { useDetailsData, useArrayData } from '../utils/dataHooks'
import dataCategories from '../utils/dataCategories'

const TestPage = () => {
  useArrayData(
    'https://pokeapi.co/api/v2/pokemon/7/encounters',
    dataCategories.encounters
  )

  useEffect(() => {}, [])

  return (
    <div>
      <h2>testing</h2>
    </div>
  )
}

export default TestPage
