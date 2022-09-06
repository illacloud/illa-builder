import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
import { searchDsl } from "@/redux/currentApp/editor/components/componentsSelector"
import store from "@/store"

export class ComponentManager {
  static copyComponent(
    node: ComponentNode,
    offsetX?: number,
    offsetY?: number,
  ): ComponentNode {
    const parentNode = searchDsl(
      store.getState().currentApp.editor.components,
      node.parentNode,
    )
    if (parentNode != null) {
      const newNode = {
        ...node,
        displayName: DisplayNameGenerator.generateDisplayName(
          node.type,
          node.showName,
        ),
        x: (offsetX ?? 0) + node.x,
        y: (offsetY ?? 0) + node.y,
      } as ComponentNode
      this.changeComponentNodeChildrenDisplayName(newNode)
      parentNode.childrenNode.push(newNode)
      return newNode
    } else {
      return node
    }
  }

  private static changeComponentNodeChildrenDisplayName(
    componentNode: ComponentNode,
  ) {
    if (
      componentNode.childrenNode != null &&
      componentNode.childrenNode.length > 0
    ) {
      componentNode.childrenNode.forEach((node) => {
        node = {
          ...node,
          displayName: DisplayNameGenerator.generateDisplayName(
            node.type,
            node.showName,
          ),
        } as ComponentNode
        if (node.childrenNode != null && node.childrenNode.length > 0) {
          this.changeComponentNodeChildrenDisplayName(node)
        }
      })
    }
  }
}
