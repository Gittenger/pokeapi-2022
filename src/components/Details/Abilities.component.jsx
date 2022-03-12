import React from 'react'

const Abilities = React.memo(({ abilities, abilitiesObject, className }) => (
    <h2 className="font-bold italic underline mb-3 text-2xl">Abilities</h2>
    <ul className="space-y-5">
      {abilities.map((el, i) => {
        return (
          <li key={i}>
            <p className="capitalize font-pokemon tracking-widest text-xl">
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
