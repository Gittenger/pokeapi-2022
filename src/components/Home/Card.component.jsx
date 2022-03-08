import React, { useContext, useEffect, useState } from 'react'
import MainContext from '../../contexts/MainContext'
import { Link } from 'react-router-dom'

import CIndex from '../components.index'
import styles from './styles/TypeStyles.module.css'
import typeObject from '../../utils/typeObject'
import getImage from '../../utils/getImage.js'
import { returnClassName } from '../../utils/utilFunctions'

const Card = ({ types, key, className, name, sprites }) => {
  const { RenderFromType } = CIndex
  const [pokemonImage, setPokemonImage] = useState('')
  const { imageStyle, setImageStyle } = useContext(MainContext)

  useEffect(() => {
    if (sprites.versions) {
      setPokemonImage(getImage(imageStyle, sprites))
    }
  }, [imageStyle])

  return (
    <Link
      className={`${className} ${styles.boxShadow} bg-transparent rounded-3xl h-[430px] w-[99%] xs:w-3/4 group sm:w-full relative`}
      to={`/pokemon/${name}`}
    >
      <div
        className={`${returnClassName(types, styles)} ${
          styles.bgImg
        } rounded-xl ring-2 ring-gray-100 flex fade-in flex-col justify-start items-center p-5 w-full h-full absolute top-0 left-0 duration-300 group-hover:-top-1`}
        key={key}
      >
        <div className="w-full">
          {/* icons */}
          <RenderFromType
            render="icons"
            types={types}
            typeObject={typeObject}
          />
        </div>
        <div
          className={`${styles.text} mb-10 mt-5 duration-300 bg-zinc-800/30 group-hover:bg-red-900/40 p-2`}
        >
          <h3
            className={`scale-in-right uppercase text-gray-100 text-4xl font-card font-medium`}
          >
            {name}
          </h3>
        </div>
        <div className="flex justify-center items-center bg-slate-200 bg-opacity-80 rounded-full">
          <img className="w-44" src={pokemonImage} alt="" />
        </div>
      </div>
    </Link>
  )
}

export default Card
