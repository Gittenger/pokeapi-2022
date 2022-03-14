import React from 'react'
import ImageObject from './ItemImgs.js'
import styles from './styles/Items.module.css'

const Items = React.memo(({ className, held_items, itemsObject }) => {
  return (
    <div className={`${className} w-[80%] md:w-[50%] mb-28`}>
      <h2 className="text-heading">Items</h2>
      {held_items?.length === 0 ? (
        <p className="mt-3">This Pokémon does not hold any items.</p>
      ) : (
        <ul className="space-y-5">
          {held_items.map((el, i) => (
            <li className={`${styles.grid} grid`} key={i}>
              <p className="text-xl capitalize">{el.name.replace(/-/g, ' ')}</p>
              <div className="bg-white"></div>
              <div className="w-16 h-16 flex justify-center items-center bg-slate-400 bg-opacity-30 border-white border rounded">
                <img className="h-10" src={ImageObject[el.name]} alt="" />
              </div>
              <p className="italic">
                {itemsObject[el.url]?.effect_entries.short_effect}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
})

export default Items
