export interface PanelConfigState {
  showLeftPanel: boolean
  showRightPanel: boolean
  showBottomPanel: boolean
}

export const panelConfigInitialState: PanelConfigState = {
  showLeftPanel: true,
  showRightPanel: true,
  showBottomPanel: true,
}
