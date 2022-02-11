import React from 'react'
import { Link } from 'react-router-dom'

import styles from './styles/TypeStyles.module.css'
import returnClassName from '../../utils/returnClassName'
import images from '../../assets/img/img-index.js'

const RenderIcons = ({ types, className }) => {
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
    <ul
      className={`${className} w-full flex justify-start items-center space-x-2`}
    >
      {types?.map((type, i) => (
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
          <RenderFromType render="icons" types={types} />
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
