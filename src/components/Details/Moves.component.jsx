import React from 'react'
import styles from './styles/Moves.module.css'

const Moves = React.memo(({ moves, movesObject }) => (
  <div className="w-full flex flex-col justify-center items-center mt-24">
    <h2 className="font-bold italic underline mb-3 text-2xl">MOVES</h2>
    <ul className="w-[90%] sm:w-[85%] flex flex-col justify-center items-center space-y-7 xl:max-w-[1000px]">
      {moves.map((el, i) => {
        return (
          <li
            className={`${styles.grid} grid w-full min-h-[8rem] border border-white rounded-2xl`}
            key={i}
          >
            {/* name/category */}
            <div className="pt-8 px-5 border-r border-white flex flex-col justify-start items-end space-y-2">
              <p className="text-2xl capitalize italic">
                {el.name.replace(/-/g, ' ')}
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
            </div>

            {/* effect */}
            <p className="pt-8 pb-5 px-10">
              {movesObject[el.url]?.effect_entries?.short_effect?.replace(
                '$effect_chance%',
                `${movesObject[el.url]?.effect_chance}%`
              )}
            </p>

            {/* flavor */}
            <p className="italic text-sm pb-3 px-10">
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
