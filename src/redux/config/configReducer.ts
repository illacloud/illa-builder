import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { ConfigState } from "@/redux/config/configState"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { ActionItem } from "@/redux/currentApp/action/actionState"

export const updateLeftPanel: CaseReducer<
  ConfigState,
  PayloadAction<boolean>
> = (state, action) => {
  state.openLeftPanel = action.payload
}

export const updateRightPanel: CaseReducer<
  ConfigState,
  PayloadAction<boolean>
> = (state, action) => {
  state.openRightPanel = action.payload
}

export const updateBottomPanel: CaseReducer<
  ConfigState,
  PayloadAction<boolean>
> = (state, action) => {
  state.openBottomPanel = action.payload
}

export const updateSelectedComponent: CaseReducer<
  ConfigState,
  PayloadAction<ComponentNode[]>
> = (state, action) => {
  state.selectedComponents = action.payload
}

export const updateSelectedAction: CaseReducer<
  ConfigState,
  PayloadAction<ActionItem>
> = (state, action) => {
  state.selectedAction = action.payload
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
