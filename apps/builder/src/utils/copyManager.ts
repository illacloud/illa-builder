import { FocusManager } from "@/utils/focusManager"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"
import store from "@/store"

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
      case "inspect":
        break
      case "components":
        break
      default:
        break
    }
  }

  static paste() {
    switch (FocusManager.getFocus()) {
      case "none":
        break
      case "dataWorkspace_action":
        break
      case "dataWorkspace_component":
        break
      case "action":
        break
      case "canvas":
        break
      case "inspect":
        break
      case "components":
        break
    }
  }
}
