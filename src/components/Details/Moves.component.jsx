import React from 'react'
import styles from './styles/Moves.module.css'

const Moves = React.memo(({ moves, movesObject }) => (
  <div className="w-full flex flex-col justify-center items-center mt-24">
    <h2 className="text-heading">Moves</h2>
    <ul className="w-[90%] sm:w-[80%] md:w-[70%] flex flex-col justify-center items-center space-y-7 xl:max-w-[1000px]">
      {moves.map((el, i) => {
        return (
          <li
            className={`${styles.grid} grid w-full min-h-[8rem] border-2 border-black rounded-2xl shadow-xl`}
            key={i}
          >
            {/* name/category */}
            <div
              className={`${styles.nameDiv} pt-6 md:pt-8 px-5 border-r-0 border-b md:border-r md:border-b-0 border-black flex flex-col justify-start items-center md:items-end space-y-2 rounded-t-xl md:rounded-tr-none md:rounded-l-xl`}
            >
              <p className="text-2xl capitalize italic font-bold text-sky-100">
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
            <p className="pt-5 md:pt-8 pb-5 px-10">
              {movesObject[el.url]?.effect_entries?.short_effect?.replace(
                '$effect_chance%',
                `${movesObject[el.url]?.effect_chance}%`
              )}
            </p>

            {/* flavor */}
            <p className="italic text-sm pb-5 md:pb-3 px-10">
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
