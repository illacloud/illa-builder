import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { ConfigState } from "@/redux/currentApp/config/configState"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

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

export const updateUnitWidth: CaseReducer<
  ConfigState,
  PayloadAction<number>
> = (state, action) => {
  state.unitSize.unitWidth = action.payload
}

export const updateSelectedComponent: CaseReducer<
  ConfigState,
  PayloadAction<ComponentNode[]>
> = (state, action) => {
  state.selectedComponents = action.payload
}

export const updateShowDot: CaseReducer<ConfigState, PayloadAction<boolean>> = (
  state,
  action,
) => {
  state.showDot = action.payload
}

export const plusScale: CaseReducer<ConfigState, PayloadAction<void>> = (
  state,
  action,
) => {
  state.scale = state.scale + 10
}

export const minusScale: CaseReducer<ConfigState, PayloadAction<void>> = (
  state,
  action,
) => {
  state.scale = state.scale - 10
}
