export const isIndexInBounds = (offset, pageLimit, i) =>
  i > offset - 1 && i < offset + pageLimit - 1

export const calculateCount = (totalLength, pageLimit) =>
  Math.ceil(parseInt(totalLength) / pageLimit)

export const returnClassName = (types, styles) =>
  types && types.length !== 0 ? styles[types[0]?.name] : ''

export const checkVersionEncounters = (versionToMatch) => (encounter) =>
  encounter.version_details.some(
    (versionForEncounter) =>
      versionForEncounter.version_name == versionToMatch.name
  )

export const transformAreaString = (areaName) => {
  const regex = /.*?(-\w?\d+.*)$/
  let transformed = areaName

  transformed =
    areaName.search(regex) != -1
      ? areaName.replace(areaName.match(regex)[1], '')
      : areaName

  transformed =
    transformed.search(/-area$/) != -1
      ? transformed.replace(transformed.match(/-area$/)[0], '')
      : transformed

  return transformed
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
