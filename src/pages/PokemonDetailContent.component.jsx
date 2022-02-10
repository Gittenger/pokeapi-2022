import React, { useState, useEffect, useContext } from 'react'

// import CIndex from '../components/components.index.js'
import { useAssignedFullData, useTitle } from '../utils/hooks.js'

const AbilitiesRender = React.memo(function Abilities({
  abilities,
  abilitiesObject,
}) {
  return (
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
          {versionsMap.map((el, i) => {
            return (
              <li key={i}>
                <p className="font-bold text-xl underline">{el.name}</p>
                {encountersData
                  .map((enc) => {
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
              </li>
            )
          })}
          )
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
    held_items,
    sprites: {
      other: { dream_world },
    },
  } = currentPokemonData

  useEffect(() => {}, [encountersData])

  return (
    <main className="flex flex-col items-center justify-start bg-slate-800 text-white pt-8 pb-52">
      <div className="flex flex-col justify-center items-center space-x-4">
        <div className="mb-12">
          <p className="text-4xl">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </p>
          <p>height: {height}</p>
          <p>weight: {weight}</p>
        </div>
        <AbilitiesRender
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
