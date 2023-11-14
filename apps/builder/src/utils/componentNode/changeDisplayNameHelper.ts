import { ComponentTreeNode } from "@illa-public/public-types"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"

export const changeDisplayNameHelperWhenUndoRedo = (
  node: ComponentTreeNode,
) => {
  const newDisplayName = DisplayNameGenerator.updateOrGenerateDisplayName(
    node.displayName,
  )

  node.displayName = newDisplayName

  const childrenNode =
    node.childrenNode?.map((item) => {
      item.parentNode = newDisplayName
      return changeDisplayNameHelperWhenUndoRedo(item)
    }) ?? []

  node.childrenNode = childrenNode

  return node
}
