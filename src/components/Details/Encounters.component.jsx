import React from 'react'

import styles from './styles/Encounters.module.css'
import getLogo from '../../utils/getLogo.js'

import {
  transformAreaString,
  checkVersionEncounters,
} from '../../utils/utilFunctions.js'

export const Encounters = React.memo(({ encountersData, versionsMap }) => (
  <div className="w-5/6 flex flex-col items-center">
    <h2 className="text-2xl font-bold underline">LOCATIONS</h2>
    <p className="underline self-start ml-8">game-versions:</p>
    {encountersData.length > 0 ? (
      <ul className={`${styles.grid} mt-10`}>
        {versionsMap.map((thisVersion, versionIndex) => {
          return (
            <li key={versionIndex}>
              <div className="font-bold text-xl underline">
                <img src={getLogo(thisVersion.name)} alt="" />
              </div>
              {
                <p>
                  {
                    // check if this version has some encounter matching current version
                    // if so, return them filtered out below
                    encountersData.some(checkVersionEncounters(thisVersion))
                      ? encountersData
                          .filter(checkVersionEncounters(thisVersion))
                          // transform encounter location strings for presentation
                          ?.map(({ location_area }) =>
                            transformAreaString(location_area.name)
                          )
                          // filter remaining duplicates, then display
                          .filter((el, i, arr) => {
                            return arr.indexOf(el) == i
                          })
                          .join(', ')
                      : 'NONE'
                  }
                </p>
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
