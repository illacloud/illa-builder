import { FocusManager } from "@/utils/focusManager"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"
import store from "@/store"
import { onCopyActionItem } from "@/page/App/components/Actions/api"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"

export class CopyManager {
  static currentCopyComponentNodes: ComponentNode[] | null = null

  static currentCopyAction: ActionItem<ActionContent> | null = null

  static copy() {
    switch (FocusManager.getFocus()) {
      case "dataWorkspace_action":
      case "action":
        this.currentCopyAction = store.getState().config.selectedAction
        break
      case "dataWorkspace_component":
      case "canvas":
        this.currentCopyComponentNodes =
          store.getState().config.selectedComponents
        break
      case "none":
        break
      case "components":
        break
      default:
        break
    }
  }

  static paste() {
    switch (FocusManager.getFocus()) {
      case "dataWorkspace_action":
      case "action":
        if (this.currentCopyAction != null) {
          onCopyActionItem(this.currentCopyAction)
        }
        break
      case "dataWorkspace_component":
      case "canvas":
        if (this.currentCopyComponentNodes != null) {
          store.dispatch(
            componentsActions.addComponentReducer(
              this.currentCopyComponentNodes.map((node) => {
                return this.copyComponent(node)
              }),
            ),
          )
        }
        break
      case "none":
        break
      case "components":
        break
    }
  }

  static copyComponent(
    node: ComponentNode,
    offsetX?: number,
    offsetY?: number,
  ): ComponentNode {
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
    return newNode
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
