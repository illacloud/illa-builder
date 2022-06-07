export interface ConfigState {
  openLeftPanel: boolean
  openBottomPanel: boolean
  openRightPanel: boolean
  unitSize: UnitSize
}

export interface UnitSize {
  unitWidth: number
  unitHeight: number
}

export const ConfigInitialState: ConfigState = {
  openLeftPanel: true,
  openBottomPanel: true,
  openRightPanel: true,
  unitSize: {
    unitHeight: 8,
    unitWidth: 0,
  },
}
