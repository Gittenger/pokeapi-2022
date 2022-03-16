import React, { useRef, useEffect } from 'react'
import * as d3 from 'd3'

import styles from './styles/Graph.module.css'

const Graph = React.memo(({ stats }) => {
  const ref = useRef()

  useEffect(() => {
    if (stats.length > 0) {
      const responsiveFn = (svg) => {
        const container = d3.select(svg.node().parentNode),
          width = parseInt(svg.style('width'), 10),
          height = parseInt(svg.style('height'), 10),
          aspect = width / height

        svg
          .attr('viewBox', `0 0 ${width} ${height}`)
          .attr('preserveAspectRatio', 'xMinYMid')
          .call(resize)

        d3.select(window).on('resize.' + container.attr('id'), resize)

        function resize() {
          const targetWidth = parseInt(container.style('width'))
          svg.attr('width', targetWidth)
          svg.attr('height', Math.round(targetWidth / aspect))
        }
      }

      // margin, dimensions
      const margin = { top: 30, right: 30, bottom: 180, left: 60 },
        width = 325 - margin.left - margin.right,
        height = 375 - margin.top - margin.bottom

      // initialize graph
      const svg = d3
        .select(ref.current)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .call(responsiveFn)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

      // x-scale
      const x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          stats.map(function (d) {
            return d.name
          })
        )
        .padding(0.1)

      // y-scale
      const y = d3.scaleLinear().domain([0, 100]).range([height, 0])

      // append y/x axis
      svg.append('g').call(d3.axisLeft(y))

      svg
        .append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('transform', 'translate(-10,0)rotate(-50)')
        .style('text-anchor', 'end')

      const color = d3.scaleOrdinal([
        '#f83e26',
        '#2a7900',
        '#201791',
        '#8bd762',
        '#638ccb',
        '#6a23b0',
      ])

      svg
        .selectAll('rect')
        .data(stats)
        .enter()
        .append('rect')
        .attr('x', (d) => x(d.name))
        .attr('y', (d) => y(d.base_stat))
        .attr('width', x.bandwidth())
        .attr('height', (d) => height - y(d.base_stat))
        .attr('fill', (d, i) => color(i))
    }
  }, [stats])

  return <div id="graph" className={`${styles.graph}`} ref={ref}></div>
})

export default Graph
