import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { ActionItem } from "@/redux/currentApp/action/actionState"

export type IllaMode = "preview" | "edit" | "production"

export interface ConfigState {
  openLeftPanel: boolean
  openBottomPanel: boolean
  openRightPanel: boolean
  showDot: boolean
  scale: number
  selectedComponents: ComponentNode[]
  selectedAction: ActionItem
  expandedKeys: string[]
  mode: IllaMode
}

export const ConfigInitialState: ConfigState = {
  openLeftPanel: true,
  mode: "preview",
  openBottomPanel: true,
  openRightPanel: true,
  scale: 100,
  selectedComponents: [],
  selectedAction: {
    actionId: "",
    displayName: "",
    actionType: "",
    actionTemplate: { transformer: "" },
  },
  showDot: false,
  expandedKeys: [],
}
