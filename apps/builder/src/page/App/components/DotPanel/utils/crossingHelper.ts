import { WidgetLayoutInfo } from "@/redux/currentApp/layoutInfo/layoutInfoState"
import { illaSnapshot } from "../constant/snapshotNew"

export interface NodeShape {
  x: number
  y: number
  w: number
  h: number
}

export const isNewCrossing = (mainNode: NodeShape, otherNode: NodeShape) => {
  return (
    mainNode.y < otherNode.y + otherNode.h &&
    mainNode.y + mainNode.h > otherNode.y &&
    mainNode.x < otherNode.x + otherNode.w &&
    mainNode.x + mainNode.w > otherNode.x
  )
}

export const isOnlyCrossingY = (mainNode: NodeShape, otherNode: NodeShape) => {
  return (
    mainNode.y < otherNode.y + otherNode.h &&
    mainNode.y + mainNode.h > otherNode.y
  )
}

export const getCrossingWidget = (
  parentNodeDisplayName: string,
  mainNode: NodeShape,
  draggedDisplayNames: string[],
) => {
  const widgetLayoutArray = illaSnapshot.getSnapShotArrayByParentDisplayName(
    parentNodeDisplayName,
  )
  const filteredWidgetLayoutArray = widgetLayoutArray.filter((item) => {
    return !draggedDisplayNames.includes(item.displayName)
  })
  return filteredWidgetLayoutArray.filter((item) => {
    return isNewCrossing(mainNode, item.layoutInfo)
  })
}

export const sortedRuleByYAndX = (
  node1: WidgetLayoutInfo,
  node2: WidgetLayoutInfo,
) => {
  if (node1.layoutInfo.y < node2.layoutInfo.y) {
    return -1
  }
  if (node1.layoutInfo.y > node2.layoutInfo.y) {
    return 1
  }
  if (node1.layoutInfo.y === node2.layoutInfo.y) {
    if (node1.layoutInfo.x > node2.layoutInfo.x) {
      return 1
    }
    if (node1.layoutInfo.x < node2.layoutInfo.x) {
      return -1
    }
  }
  return 0
}

export const getNewPositionWithCrossing = (
  mainSquare: NodeShape,
  parentDisplayName: string,
  effectedDisplayNames: string[],
  realTimeLayout?: WidgetLayoutInfo[],
) => {
  const widgetLayoutArray = realTimeLayout
    ? realTimeLayout
    : illaSnapshot.getSnapShotArrayByParentDisplayName(parentDisplayName)
  const filterWidgetLayoutArray = widgetLayoutArray.filter((item) => {
    return !effectedDisplayNames.includes(item.displayName)
  })

  const newEffectedDisplayNames = [...effectedDisplayNames]

  const sortedLayoutInfos = filterWidgetLayoutArray.sort(sortedRuleByYAndX)

  const crossingWidgetInfos = sortedLayoutInfos.filter((item) => {
    return isNewCrossing(mainSquare, item.layoutInfo)
  })

  if (crossingWidgetInfos.length > 0) {
    const compareInfos = [
      {
        compareNode: {
          displayName: "root",
          ...mainSquare,
        },
        crossingWidgetInfos,
      },
    ]
    const effectMap: Map<String, WidgetLayoutInfo> = new Map()
    while (compareInfos.length > 0) {
      const firstCompareInfo = compareInfos.shift()
      if (firstCompareInfo) {
        const { compareNode, crossingWidgetInfos } = firstCompareInfo

        newEffectedDisplayNames.push(compareNode.displayName)
        if (effectMap.get(compareNode.displayName)) {
          compareNode.y =
            effectMap.get(compareNode.displayName)?.layoutInfo.y ?? 0
        }
        crossingWidgetInfos.forEach((crossingItem) => {
          if (isNewCrossing(compareNode, crossingItem.layoutInfo)) {
            const newWidgetInfo = {
              ...crossingItem,
              layoutInfo: {
                ...crossingItem.layoutInfo,
                y: compareNode.y + compareNode.h,
              },
            }
            effectMap.set(crossingItem.displayName, newWidgetInfo)
          }
        })

        crossingWidgetInfos.forEach((crossingItem) => {
          const newWidgetInfo = effectMap.get(crossingItem.displayName)!

          const filterWidgetLayoutArray = widgetLayoutArray.filter((item) => {
            return ![
              ...newEffectedDisplayNames,
              newWidgetInfo.displayName,
            ].includes(item.displayName)
          })
          const crossingWidgetInfos = filterWidgetLayoutArray
            .filter((item) => {
              const newItemWidgetInfo = {
                ...item.layoutInfo,
              }

              if (effectMap.get(item.displayName)) {
                newItemWidgetInfo.y =
                  effectMap.get(item.displayName)?.layoutInfo.y ?? 0
              }
              return isNewCrossing(newWidgetInfo.layoutInfo, newItemWidgetInfo)
            })
            .map((item) => {
              const newItemWidgetInfo = {
                ...item.layoutInfo,
              }

              if (effectMap.get(item.displayName)) {
                newItemWidgetInfo.y =
                  effectMap.get(item.displayName)?.layoutInfo.y ?? 0
              }
              return {
                ...item,
                layoutInfo: newItemWidgetInfo,
              }
            })
            .sort(sortedRuleByYAndX)
          if (crossingWidgetInfos.length > 0) {
            const oldIndex = compareInfos.findIndex((item) => {
              return item.compareNode.displayName === newWidgetInfo.displayName
            })
            if (oldIndex !== -1) {
              compareInfos.splice(oldIndex, 1)
            }
            compareInfos.push({
              compareNode: {
                displayName: newWidgetInfo.displayName,
                x: newWidgetInfo.layoutInfo.x,
                y: newWidgetInfo.layoutInfo.y,
                w: newWidgetInfo.layoutInfo.w,
                h: newWidgetInfo.layoutInfo.h,
              },
              crossingWidgetInfos,
            })
          }
        })
      }
    }
    return effectMap
  }
}
