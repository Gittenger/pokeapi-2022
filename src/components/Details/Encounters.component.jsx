import React from 'react'

import styles from './styles/Encounters.module.css'
import getLogo from '../../utils/getLogo.js'

import {
  transformAreaString,
  checkVersionEncounters,
} from '../../utils/utilFunctions.js'

export const Encounters = React.memo(({ encountersData, versionsMap }) => (
  <div className="w-full flex flex-col items-center">
    <h2 className="font-bold italic underline mb-3 text-2xl">LOCATIONS</h2>
    {encountersData.length > 0 ? (
      <>
        <ul
          className={`${styles.grid} mt-4 w-[90%] md:w-[80%] lg:w-[65%] xl:w-[50%]`}
        >
          {versionsMap.map((thisVersion, versionIndex) => {
            return (
              <li key={versionIndex}>
                <div className="font-bold text-xl underline rounded-lg bg-[#796921] ring-inset ring-red-700 ring-4">
                  <div
                    className={`absolute w-56 h-44 bg-zinc-900 rounded-2xl z-0`}
                  ></div>
                  <div
                    className={`${styles.imgBg} absolute w-56 h-44 rounded-2xl z-10 shadow-2xl`}
                  ></div>
                  <img
                    className="z-30 w-[90%]"
                    src={getLogo(thisVersion.name)}
                    alt=""
                  />
                </div>
                {
                  <div className="relative w-full h-full bg-[#000] p-3 rounded-2xl">
                    <div className="absolute w-[97%] h-[90%] bg-zinc-900 z-0 rounded-xl"></div>
                    <p className="italic text-xl min-w-full min-h-full text-whit px-5 py-7 z-30">
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
                          : 'None...'
                      }
                    </p>
                  </div>
                }
              </li>
            )
          })}
        </ul>
      </>
    ) : (
      <p>This Pokémon is not encountered in the wild....</p>
    )}
  </div>
))

export default Encounters
