import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"

export type IllaMode = "preview" | "edit" | "production"

export interface ConfigState {
  openLeftPanel: boolean
  openBottomPanel: boolean
  openRightPanel: boolean
  openDebugger: boolean
  showDot: boolean
  scale: number
  selectedComponents: string[]
  selectedAction: ActionItem<ActionContent> | null
  cacheActionContent: {
    [key: string]: ActionContent
  }
  expandedKeys: string[]
  mode: IllaMode
  freezeCanvas: boolean
}

export const ConfigInitialState: ConfigState = {
  openLeftPanel: true,
  cacheActionContent: {},
  mode: "edit",
  openBottomPanel: true,
  openRightPanel: true,
  openDebugger: false,
  scale: 100,
  selectedComponents: [],
  selectedAction: null,
  showDot: false,
  expandedKeys: [],
  freezeCanvas: false,
}
