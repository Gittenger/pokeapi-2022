export default function isIndexInBounds(offset, pageLimit, i) {
  return i > offset - 1 && i < offset + pageLimit - 1
}
