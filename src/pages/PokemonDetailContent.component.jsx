import React, { useState, useEffect, useContext } from 'react'

// import CIndex from '../components/components.index.js'
import { useAssignedFullData, useTitle } from '../utils/hooks.js'

const PokemonDetailContent = ({ pokemon }) => {
  useTitle(pokemon.charAt(0).toUpperCase() + pokemon.slice(1))

  const {
    currentPokemonData,
    encountersData,
    itemsData,
    abilitiesData,
    abilitiesObject,
    movesData,
  } = useAssignedFullData(pokemon)

  const {
    id,
    name,
    height,
    weight,
    abilities,
    sprites: {
      other: { dream_world },
    },
  } = currentPokemonData

  useEffect(() => {
    // console.log(abilitiesObject)
  }, [abilitiesData])

  return (
    <main className="flex flex-col items-center justify-start bg-slate-800 text-white pt-8 pb-52">
      <div className="flex flex-col justify-center items-center space-x-4">
        <div className="mb-12">
          <p>id: {id}</p>
          <p>name: {name.charAt(0).toUpperCase() + name.slice(1)}</p>
          <p>height: {height}</p>
          <p>weight: {weight}</p>
        </div>
        <div>
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
        <div>
          <img src={dream_world.front_default} alt="" />
        </div>
      </div>
    </main>
  )
}

export default PokemonDetailContent
