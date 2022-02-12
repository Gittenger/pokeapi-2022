import React from 'react'

const Abilities = React.memo(({ abilities, abilitiesObject, className }) => (
  <div className={`${className}`}>
    <h2>ABILITIES</h2>
    <ul>
      {abilities.map((el, i) => {
        return (
          <li key={i}>
            <p className="underline">{el.name}</p>
            <p>{abilitiesObject[el.url]?.effect_entries.short_effect}</p>
          </li>
        )
      })}
    </ul>
  </div>
))

export default Abilities
