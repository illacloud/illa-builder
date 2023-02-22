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
  cachedAction: ActionItem<ActionContent> | null
  expandedKeys: string[]
  mode: IllaMode
  freezeCanvas: boolean
  canvasHeight: number
  canvasWidth: number
  isOnline: boolean
  isDragging: boolean
}

export const ConfigInitialState: ConfigState = {
  openLeftPanel: true,
  mode: "edit",
  openBottomPanel: true,
  openRightPanel: true,
  openDebugger: false,
  scale: 100,
  selectedComponents: [],
  selectedAction: null,
  cachedAction: null,
  showDot: false,
  expandedKeys: [],
  freezeCanvas: false,
  canvasHeight: 1080,
  canvasWidth: 1920,
  isOnline: true,
  isDragging: false,
}
