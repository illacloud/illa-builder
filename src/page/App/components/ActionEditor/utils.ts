import { ActionItem } from "@/redux/currentApp/action/actionState"

export function generateName(
  actionType: string,
  actionItems: ActionItem[],
  actionItemsNameSet: Set<string>,
) {
  const length = actionItems.filter((i) => i.actionType === actionType).length
  const prefix = actionType

  const getUniqueName = (length: number): string => {
    const name = `${prefix}${length + 1}`

    if (actionItemsNameSet.has(name)) {
      return getUniqueName(length + 1)
    }

    return name
  }

  return getUniqueName(length)
}
