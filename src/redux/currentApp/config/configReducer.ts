import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { ConfigState } from "@/redux/currentApp/config/configState"

export const updateLeftPanel: CaseReducer<
  ConfigState,
  PayloadAction<boolean>
> = (state, action) => {
  state = {
    ...state,
    openLeftPanel: action.payload,
  }
  return state
}

export const updateRightPanel: CaseReducer<
  ConfigState,
  PayloadAction<boolean>
> = (state, action) => {
  state = {
    ...state,
    openRightPanel: action.payload,
  }
  return state
}

export const updateBottomPanel: CaseReducer<
  ConfigState,
  PayloadAction<boolean>
> = (state, action) => {
  state = {
    ...state,
    openBottomPanel: action.payload,
  }
  return state
}
