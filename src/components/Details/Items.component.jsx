import React from 'react'
import ImageObject from './ItemImgs.js'

const Items = React.memo(({ held_items, itemsObject }) => {
  return (
    <div className="mt-4">
      <h2 className="underline">ITEMS</h2>
      {held_items?.length === 0 ? (
        <p>NONE</p>
      ) : (
        <ul>
          {held_items.map((el, i) => (
            <li key={i}>
              <p className="underline">{el.name}</p>
              <img className="w-10" src={ImageObject[el.name]} alt="" />
              <p>{itemsObject[el.url]?.effect_entries.short_effect}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
})

export default Items
