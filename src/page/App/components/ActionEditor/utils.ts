import { ActionItem } from "@/redux/currentApp/action/actionList/actionListState"

export function generateName(
  type: string,
  actionItems: ActionItem[],
  actionItemsNameSet: Set<string>,
) {
  const length = actionItems.filter((i) => i.type === type).length
  const prefix = type

  const getUniqueName = (length: number): string => {
    const name = `${prefix}${length + 1}`

    if (actionItemsNameSet.has(name)) {
      return getUniqueName(length + 1)
    }

    return name
  }

  return getUniqueName(length)
}
