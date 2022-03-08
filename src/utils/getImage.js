export const getImage = (key, sprites) =>
  key === 'animated'
    ? sprites.versions['generation-v']['black-white'].animated.front_default
    : key === 'dream-world'
    ? sprites.other['dream_world'].front_default
    : key === 'main'
    ? sprites.other['official-artwork'].front_default
    : key === 'home'
    ? sprites.other['home'].front_default
    : sprites.other['official-artwork'].front_default

export default getImage
