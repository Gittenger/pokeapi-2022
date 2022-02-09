import React, { useState, useEffect, useContext } from 'react'

// import CIndex from '../components/components.index.js'
import { useAssignedFullData, useTitle } from '../utils/hooks.js'
import { useDetailsData, useArrayData } from '../utils/dataHooks.js'
import dataCategories from '../utils/dataCategories.js'

const PokemonDetailContent = ({ pokemon }) => {
  useTitle(pokemon.charAt(0).toUpperCase() + pokemon.slice(1))

  const [dataValues] = useAssignedFullData(pokemon)
  const [abilitiesMap, setAbilitiesMap] = useState([])
  const [movesMap, setMovesMap] = useState([])
  const [encountersUrl, setEncountersUrl] = useState('')
  useDetailsData(abilitiesMap, dataCategories.abilities)
  useDetailsData(movesMap, dataCategories.moves)
  useArrayData(encountersUrl, dataCategories.encounters)

  const {
    id,
    name,
    height,
    weight,
    sprites,
    sprites: {
      other: { dream_world, home },
      versions: {
        generationI: { redBlue, yellow },
        generationII: { crystal, gold, silver },
      },
    },
  } = dataValues

  useEffect(() => {
    setAbilitiesMap(
      dataValues.abilities.map((el) => {
        return el.url
      })
    )

    setMovesMap(
      dataValues.moves.map((el) => {
        return el.url
      })
    )

    setEncountersUrl(dataValues.location_area_encounters)
  }, [dataValues])

  return (
    <main className="flex flex-col items-center justify-start bg-slate-700 pt-8 pb-52">
      <div className="flex flex-col justify-center items-center space-x-4">
        <div className="mb-12">
          <p>{id}</p>
          <p>{name.charAt(0).toUpperCase() + name.slice(1)}</p>
          <p>{height}</p>
          <p>{weight}</p>
        </div>
        <div>
          <img src={dream_world.front_default} alt="" />
          <img src={home.front_default} alt="" />
          <img src={home.front_shiny} alt="" />
          <img src={crystal.front_shiny_transparent} alt="" />
          <img src={sprites.front_default} alt="" />
          <img src={redBlue.front_transparent} alt="" />
          <img src={yellow.front_transparent} alt="" />
          <img src={crystal.front_transparent} alt="" />
          <img src={gold.front_transparent} alt="" />
          <img src={silver.front_transparent} alt="" />
        </div>
      </div>
    </main>
  )
}

export default PokemonDetailContent
