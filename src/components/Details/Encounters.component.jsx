import React from 'react'

import {
  transformAreaString,
  checkVersionEncounters,
} from '../../utils/utilFunctions.js'

export const Encounters = React.memo(({ encountersData, versionsMap }) => (
  <div>
    <h2 className="text-2xl font-bold underline">LOCATIONS</h2>
    {encountersData.length > 0 ? (
      <ul>
        <p className="underline">game-versions:</p>
        {versionsMap.map((thisVersion, versionIndex) => {
          return (
            <li key={versionIndex}>
              <p className="font-bold text-xl underline">{thisVersion.name}</p>
              {
                // check if this version has some encounter matching current version
                // if so, return them filtered out below
                encountersData.some(checkVersionEncounters(thisVersion)) ? (
                  encountersData
                    .filter(checkVersionEncounters(thisVersion))
                    // transform encounter location strings for presentation
                    ?.map(({ location_area }) =>
                      transformAreaString(location_area.name)
                    )
                    // filter remaining duplicates, then display
                    .filter((el, i, arr) => {
                      return arr.indexOf(el) == i
                    })
                    .map((el, i) => <p key={i}>{el}</p>)
                ) : (
                  <p>NONE</p>
                )
              }
            </li>
          )
        })}
      </ul>
    ) : (
      'none'
    )}
  </div>
))

export default Encounters
