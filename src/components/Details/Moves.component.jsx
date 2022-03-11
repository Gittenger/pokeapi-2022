import React from 'react'
import styles from './styles/Moves.module.css'

const Moves = React.memo(({ moves, movesObject }) => (
  <div className="w-full flex flex-col justify-center items-center mt-24">
    <h2 className="text-4xl font-bold underline mb-8">MOVES</h2>
    <ul className="w-[85%] ml-32 flex flex-col justify-center items-center">
      {moves.map((el, i) => {
        return (
          <li className={`${styles.grid} grid w-full min-h-[8rem]`} key={i}>
            <p className="text-2xl capitalize italic">
              {el.name.replace('-', ' ')}
            </p>
            <p>
              {movesObject[el.url]?.effect_entries?.short_effect?.replace(
                '$effect_chance%',
                `${movesObject[el.url]?.effect_chance}%`
              )}
            </p>
            {movesObject[el.url]?.damage_class?.name === 'special' ? (
              <p className="text-blue-600">Special</p>
            ) : movesObject[el.url]?.damage_class?.name === 'physical' ? (
              <p className="text-red-500">Physical</p>
            ) : movesObject[el.url]?.damage_class?.name === 'status' ? (
              <p className="text-green-600">Status</p>
            ) : (
              ''
            )}
            <p className="italic text-sm">
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
