import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { ActionItem } from "@/redux/currentApp/action/actionState"

export interface ConfigState {
  openLeftPanel: boolean
  openBottomPanel: boolean
  openRightPanel: boolean
  unitSize: UnitSize
  showDot: boolean
  scale: number
  selectedComponents: ComponentNode[]
  selectedAction: ActionItem
}

export interface UnitSize {
  unitWidth: number
  unitHeight: number
}

export const ConfigInitialState: ConfigState = {
  openLeftPanel: true,
  openBottomPanel: true,
  openRightPanel: true,
  scale: 100,
  selectedComponents: [],
  selectedAction: { actionId: "", displayName: "", actionType: "" },
  showDot: false,
  unitSize: {
    unitHeight: 8,
    unitWidth: 0,
  },
}
