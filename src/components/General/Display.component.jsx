import React, { useEffect, useState, useContext, useReducer } from 'react'
import { Link } from 'react-router-dom'
import MDSpinner from 'react-md-spinner'
import MainContext from '../../contexts/MainContext'

import { usePagination, usePokemonData } from '../../utils/hooks'
import isIndexInBounds from '../../utils/checkBounds'
import CIndex from '../components.index.js'
import images from '../../assets/img/img-index.js'
import styles from './styles/Display.module.css'

const Display = ({ id: currentPage }) => {
  // page settings
  const { pageLimit } = useContext(MainContext)
  const [activePage, setActivePage] = useState('1')
  const { pageCount, offset } = usePagination(currentPage, 13)

  // get pokemon data
  const [pokemonObject, urlsMap] = usePokemonData()

  useEffect(() => {
    if (currentPage) setActivePage(currentPage)
  }, [])

  const { Pagination } = CIndex
  const {
    icons: {
      BugIcon,
      DarkIcon,
      DragonIcon,
      ElectricIcon,
      FairyIcon,
      FightingIcon,
      FireIcon,
      FlyingIcon,
      GhostIcon,
      GrassIcon,
      GroundIcon,
      IceIcon,
      NormalIcon,
      PoisonIcon,
      PsychicIcon,
      RockIcon,
      SteelIcon,
      WaterIcon,
    },
  } = images

  return (
    <div className="flex-col items-center px-10 py-8 w-full">
      {false ? (
        <MDSpinner />
      ) : (
        <>
          <Pagination
            className={`mb-7`}
            pageCount={pageCount}
            activePage={activePage}
          />
          <div className="w-full grid gap-y-14 gap-x-5 place-content-center place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
            {urlsMap
              // .map((el) => {
              //   return {
              //     ...el,
              //     types: el.types.filter((type) => {
              //       return type.type.name == 'grass'
              //     }),
              //   }
              // })
              // .filter((el) => el.types.length > 0)
              .map((el, i) => {
                return isIndexInBounds(offset, pageLimit, i) ? (
                  <div
                    className={`${styles.card} flex flex-col justify-start items-center p-5 bg-indigo-900 ring-4 ring-gray-800 shadow-2xl rounded-3xl h-[430px] w-[99%] xs:w-3/4  sm:w-full relative`}
                    key={i}
                  >
                    <div className="w-full">
                      {/* icons */}
                      <ul className="w-full flex justify-start items-center space-x-2">
                        {pokemonObject[el.url]?.types.map((type, i) => (
                          <li className="w-16" key={i}>
                            {type.name === 'bug' ? (
                              <img src={BugIcon} alt="" />
                            ) : type.name === 'dark' ? (
                              <img src={DarkIcon} />
                            ) : type.name === 'dragon' ? (
                              <img src={DragonIcon} />
                            ) : type.name === 'electric' ? (
                              <img src={ElectricIcon} />
                            ) : type.name === 'fairy' ? (
                              <img src={FairyIcon} />
                            ) : type.name === 'fighting' ? (
                              <img src={FightingIcon} />
                            ) : type.name === 'fire' ? (
                              <img src={FireIcon} />
                            ) : type.name === 'flying' ? (
                              <img src={FlyingIcon} />
                            ) : type.name === 'ghost' ? (
                              <img src={GhostIcon} />
                            ) : type.name === 'grass' ? (
                              <img src={GrassIcon} />
                            ) : type.name === 'ground' ? (
                              <img src={GroundIcon} />
                            ) : type.name === 'ice' ? (
                              <img src={IceIcon} />
                            ) : type.name === 'rock' ? (
                              <img src={RockIcon} />
                            ) : type.name === 'poison' ? (
                              <img src={PoisonIcon} />
                            ) : type.name === 'psychic' ? (
                              <img src={PsychicIcon} />
                            ) : type.name === 'rock' ? (
                              <img src={RockIcon} />
                            ) : type.name === 'steel' ? (
                              <img src={SteelIcon} />
                            ) : type.name === 'water' ? (
                              <img src={WaterIcon} />
                            ) : type.name === 'normal' ? (
                              <img src={NormalIcon} />
                            ) : (
                              <img src={NormalIcon} alt="" />
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <h3 className="uppercase mb-10 mt-5 text-gray-100 text-4xl font-bold">
                      <Link to={`/pokemon/${pokemonObject[el.url]?.name}`}>
                        {pokemonObject[el.url]?.name}
                      </Link>
                    </h3>
                    <div className="flex justify-center items-center bg-slate-100 bg-opacity-50 rounded-full">
                      <img
                        className="w-44"
                        src={
                          pokemonObject[el.url]?.sprites.other[
                            'official-artwork'
                          ].front_default
                        }
                        alt=""
                      />
                    </div>
                  </div>
                ) : (
                  ''
                )
              })}
          </div>
          <Pagination
            className="mt-7"
            pageCount={pageCount}
            activePage={activePage}
          />
        </>
      )}
    </div>
  )
}

export default Display
