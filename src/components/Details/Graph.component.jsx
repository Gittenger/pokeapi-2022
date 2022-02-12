import React, { useRef, useEffect } from 'react'
import * as d3 from 'd3'

import styles from './styles/Graph.module.css'

const Graph = React.memo(({ stats }) => {
  const ref = useRef()

  useEffect(() => {
    if (stats.length > 0) {
      var margin = { top: 30, right: 30, bottom: 180, left: 60 },
        width = 500 - margin.left - margin.right,
        height = 530 - margin.top - margin.bottom

      var svg = d3
        .select(ref.current)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          stats.map(function (d) {
            return d.name
          })
        )
        .padding(0.2)
      svg
        .append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('transform', 'translate(-10,0)rotate(-45)')
        .style('text-anchor', 'end')

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 100]).range([height, 0])
      svg.append('g').call(d3.axisLeft(y))

      svg
        .selectAll('mybar')
        .data(stats)
        .enter()
        .append('rect')
        .attr('x', function (d) {
          return x(d.name)
        })
        .attr('y', function (d) {
          return y(d.base_stat)
        })
        .attr('width', x.bandwidth())
        .attr('height', function (d) {
          return height - y(d.base_stat)
        })
        .attr('fill', '#69b3a2')
    }
  }, [stats])

  return <div className={`${styles.graph}`} ref={ref}></div>
})

export default Graph
