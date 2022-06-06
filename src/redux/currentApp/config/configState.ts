export interface ConfigState {
  openLeftPanel: boolean
  openBottomPanel: boolean
  openRightPanel: boolean
}

export const ConfigInitialState: ConfigState = {
  openLeftPanel: true,
  openBottomPanel: true,
  openRightPanel: true,
}
