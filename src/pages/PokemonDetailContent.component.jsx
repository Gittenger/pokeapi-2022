import React, { useState, useEffect, useContext, useRef } from 'react'
import * as d3 from 'd3'
import styles from './styles/graph.module.css'

// import CIndex from '../components/components.index.js'
import { useAssignedFullData, useTitle } from '../utils/hooks.js'

const AbilitiesRender = React.memo(function Abilities({
  abilities,
  abilitiesObject,
  className,
}) {
  return (
    <div className={`${className}`}>
      <h2>ABILITIES</h2>
      <ul>
        {abilities.map((el, i) => {
          return (
            <li key={i}>
              <p className="underline">{el.name}</p>
              <p>{abilitiesObject[el.url]?.effect_entries.short_effect}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
})

const MovesRender = React.memo(function ({ moves, movesObject }) {
  return (
    <div>
      <h2 className="text-2xl font-bold underline">MOVES</h2>
      <ul>
        {moves.map((el, i) => {
          return (
            <li key={i}>
              <p className="underline">{el.name}</p>
              <p>
                effect:{' '}
                {movesObject[el.url]?.effect_entries.short_effect.replace(
                  '$effect_chance%',
                  `${movesObject[el.url]?.effect_chance}%`
                )}
              </p>
              <p>damage-class: {movesObject[el.url]?.damage_class.name}</p>
              <p>
                "
                {movesObject[el.url]?.flavor_text_entries.text
                  .replace('\f', '\n')
                  .replace('\u00ad\n', '')
                  .replace('\u00ad', '')
                  .replace(' -\n', ' - ')
                  .replace('-\n', '-')
                  .replace('\n', ' ')}
                "
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
})

const ItemsRender = React.memo(function ({ held_items, itemsObject }) {
  return (
    <div className="mt-4">
      <h2>ITEMS</h2>
      <ul>
        {held_items.map((el, i) => {
          return (
            <li key={i}>
              <p className="underline">{el.name}</p>
              <p>{itemsObject[el.url]?.effect_entries.short_effect}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
})

const EncountersRender = React.memo(function ({ encountersData, versionsMap }) {
  return (
    <div>
      <h2 className="text-2xl font-bold underline">LOCATIONS</h2>
      {encountersData.length > 0 ? (
        <ul>
          <p className="underline">game-versions:</p>
          {versionsMap.map((el, versionIndex) => {
            return (
              <li key={versionIndex}>
                <p className="font-bold text-xl underline">{el.name}</p>
                {encountersData.some((enc) => {
                  return enc.version_details.some(
                    (version) => version.version_name == el.name
                  )
                }) ? (
                  encountersData
                    // map of only locations matching current pokemon encountersData
                    .filter((enc) => {
                      return enc.version_details.some((version) => {
                        return version.version_name == el.name
                      })
                    })
                    ?.map((el, i, arr) => {
                      // transform location string
                      const str = el.location_area.name
                      const regex = /.*(-\d+.*)/
                      let transformed = str

                      transformed =
                        str.search(regex) != -1
                          ? str.replace(str.match(regex)[1], '')
                          : str

                      transformed =
                        transformed.search(regex) != -1
                          ? transformed.replace(transformed.match(regex)[1], '')
                          : transformed

                      transformed =
                        transformed.search(/-area$/) != -1
                          ? transformed.replace(
                              transformed.match(/-area$/)[0],
                              ''
                            )
                          : transformed

                      return transformed
                        .split('-')
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(' ')
                    })
                    // filter remaining duplicates, then display
                    .filter((el, i, arr) => {
                      return arr.indexOf(el) == i
                    })
                    .map((el, i) => <p key={i}>{el}</p>)
                ) : (
                  <p>NONE</p>
                )}
              </li>
            )
          })}
        </ul>
      ) : (
        'none'
      )}
    </div>
  )
})

const PokemonDetailContent = ({ pokemon }) => {
  useTitle(pokemon.charAt(0).toUpperCase() + pokemon.slice(1))

  const {
    currentPokemonData,
    encountersData,
    abilitiesObject,
    movesObject,
    itemsObject,
    versionsMap,
  } = useAssignedFullData(pokemon)

  const {
    id,
    name,
    height,
    weight,
    abilities,
    moves,
    stats,
    held_items,
    sprites: {
      other: { dream_world },
    },
  } = currentPokemonData

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
  }, [currentPokemonData])

  return (
    <main className="flex flex-col items-center justify-start bg-slate-800 text-white pt-8 pb-52">
      <div className="flex flex-col justify-center items-center space-x-4">
        <div className="mb-12">
          <p className="text-6xl font-pokemon tracking-widest bg-gradient-to-r from-red-900 to-orange-700 text-blue-500 rounded-xl">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </p>
          <p>height: {height}</p>
          <p>weight: {weight}</p>
        </div>

        <div className={`${styles.graph}`} ref={ref}></div>

        <AbilitiesRender
          className="mt-10"
          abilities={abilities}
          abilitiesObject={abilitiesObject}
        />
        <ItemsRender held_items={held_items} itemsObject={itemsObject} />
        <div>
          <img src={dream_world.front_default} alt="" />
        </div>
        <EncountersRender
          encountersData={encountersData}
          versionsMap={versionsMap}
        />

        <MovesRender moves={moves} movesObject={movesObject} />
      </div>
    </main>
  )
}

export default PokemonDetailContent
