import React from 'react'

const Abilities = React.memo(({ abilities, abilitiesObject, className }) => (
  <div className={`${className} pb-8 border-b border-white`}>
    <h2 className="text-heading">Abilities</h2>
    <ul className="space-y-8 mt-6">
      {abilities.map((el, i) => {
        return (
          <li key={i}>
            <p className="capitalize font-pokemon tracking-widest text-3xl mb-2 text-sky-100">
              {el.name.replace(/-/g, ' ')}
            </p>
            <p>{abilitiesObject[el.url]?.effect_entries.short_effect}</p>
          </li>
        )
      })}
    </ul>
  </div>
))

export default Abilities
