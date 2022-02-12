export const returnClassName = (types, styles) => {
  if (types === undefined) return ''
  return types.length !== 0 && styles[types[0]?.name]
}

export default returnClassName
