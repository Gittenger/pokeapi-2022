import React, { useEffect } from 'react'
import sal from 'sal.js'

const Abilities = React.memo(({ abilities, abilitiesObject, className }) => {
  useEffect(() => {
    sal({
      once: true,
    })
  }, [])

  return (
    <div
      className={`${className} pb-8 border-b border-white`}
      data-sal-duration="500"
      data-sal="fade"
    >
      <h2 className="text-heading" data-sal-duration="500" data-sal="fade">
        Abilities
      </h2>
      <ul className="space-y-8 mt-6">
        {abilities.map((el, i) => {
          return (
            <li key={i}>
              <p className="capitalize font-pokemon text-2xl sm:text-3xl tracking-widest mb-2 text-sky-100 text-shadow">
                {el.name.replace(/-/g, ' ')}
              </p>
              <p>{abilitiesObject[el.url]?.effect_entries.short_effect}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
})

export default Abilities
