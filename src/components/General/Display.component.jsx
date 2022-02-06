import React, { useEffect, useState } from 'react'

const Display = () => {
  const [pokemon, setPokemon] = useState([])

  let api = 'https://pokeapi.co/api/v2/pokemon/?limit=50'

  useEffect(() => {
    const fetchData = async (urls) => {
      const result = await Promise.all(
        [...urls].map((url) => {
          return fetch(url).then((res) => res.json())
        })
      )
      const imgs = []
      result.forEach((el) => {
        const imgSrc = el.sprites.other['official-artwork'].front_default
        imgs.push(imgSrc)
      })
      setPokemon(imgs)
    }

    fetch(api)
      .then((res) => res.json())
      .then((res) => {
        let urls = []
        res.results.forEach((el) => {
          urls.push(el.url)
        })
        fetchData(urls)
      })
  }, [])

  return (
    <div>
      <div>
        {pokemon.map((el, i) => (
          <div key={i}>
            <img src={el} alt="" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Display
