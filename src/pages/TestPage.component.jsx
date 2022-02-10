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
  const [dataset, setDataset] = useState(generateDataset())
  const ref = useRef()
  useEffect(() => {
    const svgElement = d3.select(ref.current)
    svgElement
      .selectAll('circle')
      .data(dataset)
      .join('circle')
      .attr('cx', (d) => d[0])
      .attr('cy', (d) => d[1])
      .attr('r', 3)
  }, [dataset])
  useInterval(() => {
    const newDataset = generateDataset()
    setDataset(newDataset)
  }, 2000)

  return <svg viewBox="0 0 100 50" ref={ref} />
}

export default TestPage
