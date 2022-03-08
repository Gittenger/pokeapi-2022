import React, { useEffect, useState } from 'react'

import CIndex from '../components/components.index.js'
import { useAssignedFullData } from '../utils/dataHooks.js'
import { useTitle } from '../utils/hooks.js'
import MDSpinner from 'react-md-spinner'

const PokemonDetailContent = ({ pokemon }) => {
  useTitle(pokemon.charAt(0).toUpperCase() + pokemon.slice(1))
  const [pokemonImage, setPokemonImage] = useState('')

  const {
    currentPokemonData,
    encountersData,
    abilitiesObject,
    dataProcessed,
    movesObject,
    itemsObject,
    versionsMap,
  } = useAssignedFullData(pokemon)

  const { id, name, height, weight, abilities, moves, held_items, sprites } =
    currentPokemonData

  useEffect(() => {
    console.log(sprites)
    if (sprites.versions)
      setPokemonImage(sprites.other['dream_world'].front_default)
  }, [currentPokemonData])

  const handleUpdateImage = (el) => {
    const getImage = (key) =>
      key === 'animated'
        ? sprites.versions['generation-v']['black-white'].animated.front_default
        : key === 'dream-world'
        ? sprites.other['dream_world'].front_default
        : key === 'main'
        ? sprites.other['official-artwork'].front_default
        : key === 'home'
        ? sprites.other['home'].front_default
        : sprites.other['official-artwork'].front_default

    setPokemonImage(getImage(el.target.value))
  }

  const { Abilities, Encounters, Graph, Items, Moves } = CIndex

  return !dataProcessed ? (
    <div className="w-full flex justify-center">
      <MDSpinner />
    </div>
  ) : (
    <main className="flex flex-col items-center justify-start bg-zinc-900 text-white pt-8 pb-52">
      <div className="flex flex-col justify-center items-center">
        <div className="mb-12">
          <div className="relative mb-5">
            <div className="absolute z-0 w-full h-1 -bottom-1 left-0 bg-teal-500/70 rounded-xl "></div>
            <p className="text-6xl text-shadow font-pokemon tracking-widest text-blue-200 relative z-50">
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </p>
          </div>
        </div>

        <div>
          <img className="w-44" src={pokemonImage} alt="" />
        </div>
        <div>
          <h1>SELECT IMAGE</h1>
          <ul>
            <li>
              <button value="main" onClick={handleUpdateImage}>
                Main
              </button>
            </li>
            <li>
              <button value="dream-world" onClick={handleUpdateImage}>
                Dream World
              </button>
            </li>
            <li>
              <button value="home" onClick={handleUpdateImage}>
                Home
              </button>
            </li>
            <li>
              <button value="animated" onClick={handleUpdateImage}>
                Animated
              </button>
            </li>
          </ul>
        </div>

        <Abilities
          className="mt-10"
          abilities={abilities}
          abilitiesObject={abilitiesObject}
        />
        <Items held_items={held_items} itemsObject={itemsObject} />

        <p>height: {height}</p>
        <p>weight: {weight}</p>

        <Graph stats={currentPokemonData?.stats} />

        <Encounters encountersData={encountersData} versionsMap={versionsMap} />

        <Moves moves={moves} movesObject={movesObject} />
      </div>
    </main>
  )
}

export default PokemonDetailContent
