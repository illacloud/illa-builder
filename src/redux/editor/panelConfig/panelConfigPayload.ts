type PanelConfigType  = "showLeftPanel" | "showRightPanel" | "showBottomPanel"

type SetPanelConfig = {
  [key in PanelConfigType]?: boolean
}