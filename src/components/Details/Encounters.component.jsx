import React, { useEffect } from 'react'

import styles from './styles/Encounters.module.css'
import getLogo from '../../utils/getLogo.js'

import sal from 'sal.js'

import {
  transformAreaString,
  checkVersionEncounters,
} from '../../utils/utilFunctions.js'

export const Encounters = React.memo(({ encountersData, versionsMap }) => {
  useEffect(() => {
    sal({
      once: true,
    })
  }, [])

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-heading" data-sal-duration="500" data-sal="fade">
        Locations
      </h2>
      {encountersData.length > 0 ? (
        <>
          <ul
            className={`${styles.grid} mt-4 w-[90%] xs:w-[70%] sm:w-[60%] md:w-[80%] lg:w-[65%] xl:w-[50%]`}
          >
            {versionsMap.map((thisVersion, versionIndex) => {
              return (
                <li key={versionIndex} data-sal-duration="500" data-sal="fade">
                  <div className="font-bold text-xl underline rounded-lg bg-[#dfcc62] ring-inset ring-red-600 ring-4 relative">
                    <div
                      className={`absolute w-44 h-32 sm:w-56 sm:h:-44 bg-zinc-900 rounded-2xl z-0`}
                    ></div>
                    <div
                      className={`${styles.imgBg} absolute w-44 h-32 sm:w-56 sm:h:-44 rounded-2xl z-10 shadow-2xl`}
                    ></div>
                    <img
                      className="z-30 h-[120px] xs:h-auto xs:w-[65%] sm:w-[75%] md:w-[90%]"
                      src={getLogo(thisVersion.name)}
                      alt=""
                    />
                  </div>
                  {
                    <div className="relative w-full h-full bg-zinc-800  ring-inset ring-8 ring-black rounded-2xl">
                      <p className="italic text-xl min-w-full min-h-full text-whit px-5 py-10 z-30">
                        {
                          // check if this version has some encounter matching current version
                          // if so, return them filtered out below
                          encountersData.some(
                            checkVersionEncounters(thisVersion)
                          )
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
        <p className="max-w-[85%]" data-sal-duration="500" data-sal="fade">
          This Pokémon is not encountered in the wild.
        </p>
      )}
    </div>
  )
})

export default Encounters
