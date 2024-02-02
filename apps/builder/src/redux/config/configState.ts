import { ActionContent } from "@illa-public/public-types"
import { ActionItem } from "@illa-public/public-types"
import {
  ILLA_WEBSOCKET_CONTEXT,
  ILLA_WEBSOCKET_STATUS,
} from "@/api/ws/interface"

export type IllaMode = "preview" | "edit" | "production" | "template-edit"

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
  expandedWidgets: Record<string, boolean>
  mode: IllaMode
  canvasHeight: number
  canvasWidth: number
  isOnline: boolean
  wsStatus: Record<ILLA_WEBSOCKET_CONTEXT, ILLA_WEBSOCKET_STATUS>
  hoveredComponents: string[]
  draggingComponentIDs: string[]
  resizingComponentIDs: string[]
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
  canvasHeight: 1080,
  canvasWidth: 1920,
  isOnline: true,
  hoveredComponents: [],
  expandedWidgets: {},
  wsStatus: {
    [ILLA_WEBSOCKET_CONTEXT.DASHBOARD]: ILLA_WEBSOCKET_STATUS.INIT,
    [ILLA_WEBSOCKET_CONTEXT.APP]: ILLA_WEBSOCKET_STATUS.INIT,
    [ILLA_WEBSOCKET_CONTEXT.APP_BINARY]: ILLA_WEBSOCKET_STATUS.INIT,
    [ILLA_WEBSOCKET_CONTEXT.AI_AGENT]: ILLA_WEBSOCKET_STATUS.INIT,
  },
  draggingComponentIDs: [],
  resizingComponentIDs: [],
}
