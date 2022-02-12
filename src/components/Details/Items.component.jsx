import React from 'react'

const Items = React.memo(({ held_items, itemsObject }) => (
  <div className="mt-4">
    <h2 className="underline">ITEMS</h2>
    {held_items?.length === 0 ? (
      <p>NONE</p>
    ) : (
      <ul>
        {held_items.map((el, i) => (
          <li key={i}>
            <p className="underline">{el.name}</p>
            <p>{itemsObject[el.url]?.effect_entries.short_effect}</p>
          </li>
        ))}
      </ul>
    )}
  </div>
))

export default Items
