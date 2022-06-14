import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

export interface ConfigState {
  openLeftPanel: boolean
  openBottomPanel: boolean
  openRightPanel: boolean
  unitSize: UnitSize
  showDot: boolean
  scale: number
  selectedComponents: ComponentNode[]
}

export interface UnitSize {
  unitWidth: number
  unitHeight: number
}

export const ConfigInitialState: ConfigState = {
  openLeftPanel: true,
  scale: 100,
  openBottomPanel: true,
  selectedComponents: [],
  openRightPanel: true,
  showDot: false,
  unitSize: {
    unitHeight: 8,
    unitWidth: 0,
  },
}
