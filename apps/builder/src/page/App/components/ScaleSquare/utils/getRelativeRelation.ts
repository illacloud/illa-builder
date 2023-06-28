import { RelationMap } from "@/redux/currentApp/editor/components/componentsSelector"

export const getRelativeRelation = (
  selectedComponents: string[],
  currentDisplayName: string,
  relationMap: RelationMap,
): { parentNode: string; childrenNode: string[]; containerType: string } => {
  const relation = relationMap[currentDisplayName]
  if (!relation) return relation

  if (!selectedComponents.includes(relation.parentNode)) {
    return getRelativeRelation(
      selectedComponents,
      relation.parentNode,
      relationMap,
    )
  }
  return relation
}
