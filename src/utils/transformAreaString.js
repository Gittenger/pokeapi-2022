export default function transformAreaString(areaName) {
  const regex = /.*?(-\d+.*)$/
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
