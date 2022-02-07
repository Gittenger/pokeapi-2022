import React from 'react'

// import CIndex from '../components/components.index.js'
import { useFullDataFetch, useTitle } from '../utils/hooks.js'

const PokemonDetailContent = ({ pokemon: name }) => {
  useTitle(name.charAt(0).toUpperCase() + name.slice(1))

  const [fullData] = useFullDataFetch(name)

  return (
    <main className="flex flex-col items-center justify-start pb-10">
      <div className="flex flex-col justify-center items-center space-x-4">
        <p>{fullData.filter((el) => el.name == name)[0]?.id}</p>

        <p>{name}</p>
      </div>
    </main>
  )
}

export default PokemonDetailContent
