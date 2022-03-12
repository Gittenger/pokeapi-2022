import React from 'react'
import ImageObject from './ItemImgs.js'

const Items = React.memo(({ held_items, itemsObject }) => {
  return (
      <h2 className="font-bold italic underline mb-3 text-2xl">Items</h2>
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
