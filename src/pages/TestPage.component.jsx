import React, { useState, useRef, useEffect } from 'react'

import * as d3 from 'd3'

import data from './test.data.json'
// data.results.map((el) => el.url)
import { useDetailsData, useArrayData } from '../utils/dataHooks'
import dataCategories from '../utils/dataCategories'

function useInterval(callback, delay) {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

const Circle = () => {
  return (
    <svg>
      <circle cx="150" cy="77" r="40" />
    </svg>
  )
}

const generateDataset = () =>
  Array(10)
    .fill(0)
    .map(() => [Math.random() * 80 + 10, Math.random() * 35 + 10])

const TestPage = () => {
  // const [dataset, setDataset] = useState(generateDataset())
  // const ref = useRef()
  // useEffect(() => {
  //   const svgElement = d3.select(ref.current)
  //   svgElement
  //     .selectAll('circle')
  //     .data(dataset)
  //     .join('circle')
  //     .attr('cx', (d) => d[0])
  //     .attr('cy', (d) => d[1])
  //     .attr('r', 3)
  // }, [dataset])
  // useInterval(() => {
  //   const newDataset = generateDataset()
  //   setDataset(newDataset)
  // }, 2000)

  const data = [
    'mt-coronet-2f',
    'mt-coronet-3f',
    'mt-coronet-4f',
    'mt-coronet-4f-small-room',
    'mt-coronet-5f',
    'mt-coronet-5f',
    'mt-coronet-6f',
    'mt-coronet-1f-from-exterior',
    'mt-coronet-1f-route-216',
    'sinnoh-victory-road-1f',
    'sinnoh-route-210-west-towards-celestic-town',
    'sinnoh-route-211-east-towards-celestic-town',
    'sinnoh-route-216-area',
    'sinnoh-route-217-area',
    'sinnoh-route-225-area',
  ]

  useEffect(() => {
    const newArr = data
      .map((el) => {
        const regex = /.*(-\d+.*)/
        let transformed = el
        transformed = el.match(regex)

        if (el.search(regex) != -1) {
          transformed = el.replace(el.match(regex)[1], '')
          if (transformed.search(regex) != -1) {
            transformed = transformed.replace(transformed.match(regex)[1], '')
          }
        }

        return transformed
      })

      .filter((el, i, arr) => {
        return arr.indexOf(el) == i
      })

    console.log(newArr)
  }, [])

  return <h1>hello</h1>
}

export default TestPage
