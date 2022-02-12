import React from 'react'

import CIndex from '../components/components.index.js'
import { useAssignedFullData, useTitle } from '../utils/hooks.js'
import MDSpinner from 'react-md-spinner'

const PokemonDetailContent = ({ pokemon }) => {
  useTitle(pokemon.charAt(0).toUpperCase() + pokemon.slice(1))

  const {
    currentPokemonData,
    encountersData,
    abilitiesObject,
    dataProcessed,
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
    held_items,
    sprites,
    sprites: {
      other: { dream_world },
    },
  } = currentPokemonData

  const { Abilities, Encounters, Graph, Items, Moves } = CIndex

  return !dataProcessed ? (
    <div className="w-full flex justify-center">
      <MDSpinner />
    </div>
  ) : (
    <main className="flex flex-col items-center justify-start bg-slate-800 text-white pt-8 pb-52">
      <div className="flex flex-col justify-center items-center space-x-4">
        <div className="mb-12">
          <div className="relative mb-5">
            <div className="absolute z-0 w-full h-1 -bottom-1 left-0 bg-teal-500/70 rounded-xl "></div>
            <p className="text-6xl text-shadow font-pokemon tracking-widest text-blue-200 relative z-50">
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </p>
          </div>
          <p>height: {height}</p>
          <p>weight: {weight}</p>
        </div>

        <Abilities
          className="mt-10"
          abilities={abilities}
          abilitiesObject={abilitiesObject}
        />
        <Items held_items={held_items} itemsObject={itemsObject} />
        <div>
          <img
            className="w-20"
            src={
              sprites?.versions['generation-v']['black-white']?.animated
                .front_default
            }
            alt=""
          />
        </div>

        <Graph stats={currentPokemonData?.stats} />

        <Encounters encountersData={encountersData} versionsMap={versionsMap} />

        <Moves moves={moves} movesObject={movesObject} />
      </div>
    </main>
  )
}

export default PokemonDetailContent
