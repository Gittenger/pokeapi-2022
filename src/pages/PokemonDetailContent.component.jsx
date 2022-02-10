import React, { useState, useEffect, useContext } from 'react'

// import CIndex from '../components/components.index.js'
import { useAssignedFullData, useTitle } from '../utils/hooks.js'

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
    held_items,
    sprites: {
      other: { dream_world },
    },
  } = currentPokemonData

  useEffect(() => {
    console.log(encountersData)
  }, [encountersData])

  return (
    <main className="flex flex-col items-center justify-start bg-slate-800 text-white pt-8 pb-52">
      <div className="flex flex-col justify-center items-center space-x-4">
        <div className="mb-12">
          <p>id: {id}</p>
          <p>name: {name.charAt(0).toUpperCase() + name.slice(1)}</p>
          <p>height: {height}</p>
          <p>weight: {weight}</p>
        </div>
        <div className="mt-4">
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
        <div>
          <img src={dream_world.front_default} alt="" />
        </div>
        <div>
          <h2 className="text-2xl font-bold underline">LOCATIONS</h2>
          <ul>
            <p className="underline">game-versions:</p>
            <li>
              {versionsMap.map((el) => {
                return (
                  <>
                    <p className="font-bold text-xl underline">{el.name}</p>
                    {encountersData
                      .map((enc) => {
                        console.log(encountersData)
                        return {
                          ...enc,
                          version_details: enc.version_details.filter(
                            (ver) => ver.version_name == el.name
                          ),
                        }
                      })
                      .map((el, i) => (
                        <p key={i}>{el.location_area.name}</p>
                      ))}
                  </>
                )
              })}
            </li>
          </ul>
        </div>
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
      </div>
    </main>
  )
}

export default PokemonDetailContent
