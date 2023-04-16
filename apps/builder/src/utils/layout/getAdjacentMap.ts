import { fromPairs } from "lodash"

interface LayoutInfo {
  displayName: string
  x: number
  y: number
  w: number
  h: number
}

export const getAdjacentMap = (
  layout: Record<string, LayoutInfo>,
): Record<string, Set<string>> => {
  const pairs = Object.values(layout).map((item) => {
    const adjacentItems = Object.values(layout)
      .filter((otherItem) => {
        const isSameItem = item.displayName === otherItem.displayName
        const isAdjacent =
          item.x < otherItem.x + otherItem.w &&
          item.x + item.w > otherItem.x &&
          item.y + item.h === otherItem.y

        return !isSameItem && isAdjacent
      })
      .map((adjacentItem) => adjacentItem.displayName)
    return [item.displayName, new Set(adjacentItems)]
  })

  return fromPairs(pairs)
}
