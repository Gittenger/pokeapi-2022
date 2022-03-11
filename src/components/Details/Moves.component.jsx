import React from 'react'

const Moves = React.memo(({ moves, movesObject }) => (
  <div>
    <h2 className="text-2xl font-bold underline">MOVES</h2>
    <ul>
      {moves.map((el, i) => {
        return (
          <li key={i}>
            <p className="underline">{el.name}</p>
            <p>
              effect:{' '}
              {movesObject[el.url]?.effect_entries?.short_effect?.replace(
                '$effect_chance%',
                `${movesObject[el.url]?.effect_chance}%`
              )}
            </p>
            <p>damage-class: {movesObject[el.url]?.damage_class?.name}</p>
            <p>
              "
              {movesObject[el.url]?.flavor_text_entries?.text
                // thanks to Naramsim on github for snippet
                // Page breaks are treated just like newlines.
                // Soft hyphens followed by newlines vanish.
                // Letter-hyphen-newline becomes letter-hyphen, to preserve real
                // hyphenation.
                // Any other newline becomes a space.
                .replace('\f', '\n')
                .replace('\u00ad\n', '')
                .replace('\u00ad', '')
                .replace(' -\n', ' - ')
                .replace('-\n', '-')
                .replace('\n', ' ')}
              "
            </p>
          </li>
        )
      })}
    </ul>
  </div>
))

export default Moves
