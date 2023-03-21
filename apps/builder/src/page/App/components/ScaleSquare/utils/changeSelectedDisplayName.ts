import { RelationMap } from "@/redux/currentApp/editor/components/componentsSelector"

export const changeSelectedDisplayName = (
  currentSelectedDisplayName: string[],
  widgetDisplayNameRelationMap: RelationMap,
  displayName: string,
  displayNameMapDepth: Record<string, number>,
) => {
  const depths = currentSelectedDisplayName.map((displayName) => {
    return displayNameMapDepth[displayName]
  })
  let isEqual = depths.every((depth) => depth === depths[0])
  if (!isEqual) {
    const newDisplayName = widgetDisplayNameRelationMap[displayName].parentNode
    currentSelectedDisplayName.splice(-1, 1, newDisplayName)
    changeSelectedDisplayName(
      currentSelectedDisplayName,
      widgetDisplayNameRelationMap,
      newDisplayName,
      displayNameMapDepth,
    )
  }
}
