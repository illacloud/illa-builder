import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { PanelConfigState } from "./panelConfigState"

export const switchPanelState: CaseReducer<
  PanelConfigState,
  PayloadAction<PanelConfigType>
> = (state, action) => {
  state[action.payload]= !state[action.payload]
}
