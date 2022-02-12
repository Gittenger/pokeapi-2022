import React from 'react'
import { Link } from 'react-router-dom'

import styles from './styles/TypeStyles.module.css'
import returnClassName from '../../utils/returnClassName'
import typeObject from '../../utils/typeObject'

const RenderIcons = ({ typeObject, types, className }) => {
  return (
    <ul
      className={`${className} w-full flex justify-start items-center space-x-2`}
    >
      {types?.map((type, i) => (
        <li className="w-16" key={i}>
          <img src={typeObject ? typeObject[type.name].icon : ''} alt="" />
        </li>
      ))}
    </ul>
  )
}

const RenderCard = ({ types, key, className, name, sprites }) => {
  return (
    <Link
      className={`${className} bg-transparent rounded-3xl shadow-2xl  h-[430px] w-[99%] xs:w-3/4 group sm:w-full relative`}
      to={`/pokemon/${name}`}
    >
      <div
        className={`${returnClassName(types, styles)} ${
          styles.bgImg
        } rounded-3xl ring-4 ring-gray-800 flex fade-in flex-col justify-start items-center p-5 w-full h-full absolute top-0 left-0 duration-300 group-hover:-top-1`}
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
          className={`${styles.text} mb-10 mt-5 duration-300 bg-slate-800/30 group-hover:bg-red-900/40 p-2`}
        >
          <h3
            className={`scale-in-right uppercase text-gray-100 text-4xl font-bold`}
          >
            {name}
          </h3>
        </div>
        <div className="flex justify-center items-center bg-slate-200 bg-opacity-80 rounded-full">
          <img
            className="w-44"
            src={sprites?.other['official-artwork'].front_default}
            alt=""
          />
        </div>
      </div>
    </Link>
  )
}

const RenderFromType = ({ render, ...props }) => {
  return render === 'card' ? (
    <RenderCard {...props} />
  ) : render === 'icons' ? (
    <RenderIcons {...props} />
  ) : (
    ''
  )
}

export default RenderFromType
