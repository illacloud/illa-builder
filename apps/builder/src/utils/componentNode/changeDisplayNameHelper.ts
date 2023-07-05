import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"

export const changeDisplayNameHelperWhenUndoRedo = (node: ComponentNode) => {
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
