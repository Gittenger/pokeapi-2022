export const returnClassName = (types, styles) => {
  if (types === undefined) return ''
  else
    return types.length !== 0 && types[0]?.name == 'bug'
      ? styles.bug
      : types[0]?.name == 'dark'
      ? styles.dark
      : types[0]?.name == 'dragon'
      ? styles.dragon
      : types[0]?.name == 'electric'
      ? styles.electric
      : types[0]?.name == 'fairy'
      ? styles.fairy
      : types[0]?.name == 'fighting'
      ? styles.fighting
      : types[0]?.name == 'fire'
      ? styles.fire
      : types[0]?.name == 'flying'
      ? styles.flying
      : types[0]?.name == 'ghost'
      ? styles.ghost
      : types[0]?.name == 'grass'
      ? styles.grass
      : types[0]?.name == 'ground'
      ? styles.ground
      : types[0]?.name == 'ice'
      ? styles.ice
      : types[0]?.name == 'normal'
      ? styles.normal
      : types[0]?.name == 'poison'
      ? styles.poison
      : types[0]?.name == 'psychic'
      ? styles.psychic
      : types[0]?.name == 'rock'
      ? styles.rock
      : types[0]?.name == 'steel'
      ? styles.steel
      : types[0]?.name == 'water'
      ? styles.water
      : ''
}

export default returnClassName
