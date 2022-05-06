import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import MainContext from '../contexts/MainContext.js'
import sal from 'sal.js'

import CIndex from '../components/components.index.js'
import { useAssignedFullData } from '../utils/dataHooks.js'
import { useTitle } from '../utils/hooks.js'
import getImage from '../utils/getImage.js'
import MDSpinner from 'react-md-spinner'
import styles from './styles/PokemonDetail.module.css'

const PokemonDetails = () => {
  const { pokemon } = useParams()
  useTitle(pokemon.charAt(0).toUpperCase() + pokemon.slice(1))
  const [pokemonImage, setPokemonImage] = useState('')
  const { imageStyle, setImageStyle } = useContext(MainContext)

  const {
    currentPokemonData,
    encountersData,
    encountersDataProcessed,
    abilitiesObject,
    dataProcessed,
    movesObject,
    movesDataProcessed,
    itemsObject,
    versionsMap,
  } = useAssignedFullData(pokemon)

  const { id, name, height, weight, abilities, moves, held_items, sprites } =
    currentPokemonData

  useEffect(() => {
    sal({ once: true })
  }, [])

  useEffect(() => {
    if (sprites.versions) setPokemonImage(getImage(imageStyle, sprites))
  }, [currentPokemonData, imageStyle])

  const updateImageStyle = (el) => {
    const value = el.target.attributes.value.value
    setImageStyle(value)
  }

  const { Abilities, Encounters, Graph, Items, Moves, Dropdown } = CIndex

  return !dataProcessed ? (
    <div className="w-full flex justify-center min-h-[1000px] py-8">
      <MDSpinner />
    </div>
  ) : (
    <main className="min-h-[1000px] flex flex-col items-center justify-start bg-zinc-900 text-white pt-8 pb-52 w-full">
      <div className="flex flex-col justify-center items-center w-full">
        {/* name */}
        <div className="mb-5" data-sal-duration="500" data-sal="fade">
          <div className="relative">
            <div className="absolute z-0 w-full h-1 -bottom-1 left-0 bg-teal-500/70 rounded-xl "></div>
            <p className="text-4xl md:text-6xl text-shadow font-pokemon tracking-widest text-blue-200 relative z-50">
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </p>
          </div>
        </div>

        {/* hero grid */}
        <div
          className={`${styles.heroGrid} w-full min-h-[690px] sm:pt-0 pt-10`}
          data-sal-duration="500"
          data-sal="fade"
        >
          {/* image */}
          <div className="">
            <div className="w-56">
              <img className="w-full" src={pokemonImage} alt="" />
            </div>
            {/* img opt */}

            <Dropdown
              className="mt-8"
              handler={updateImageStyle}
              type="image"
            />
          </div>

          <div className={`${styles.statsGrid} grid mt-16 xl:mt-0`}>
            <p className="italic">Height:</p>
            <p>{height}</p>
            <p className="italic">Weight:</p>
            <p>{weight}</p>
          </div>

          <Graph stats={currentPokemonData?.stats} />
        </div>

        {/* abilities & items */}
        <Abilities
          className="mt-0 sm:mt-10 w-[80%] md:w-[50%]"
          abilities={abilities}
          abilitiesObject={abilitiesObject}
        />
        <Items
          className="mt-10"
          held_items={held_items}
          itemsObject={itemsObject}
        />

        {/* encounters & moves */}
        {!encountersDataProcessed ? (
          <div className="w-full flex justify-center">
            <MDSpinner />
          </div>
        ) : (
          <Encounters
            encountersData={encountersData}
            versionsMap={versionsMap}
          />
        )}

        {!movesDataProcessed ? (
          <div className="w-full flex justify-center">
            <MDSpinner />
          </div>
        ) : (
          <Moves moves={moves} movesObject={movesObject} />
        )}
      </div>
    </main>
  )
}

export default PokemonDetails
