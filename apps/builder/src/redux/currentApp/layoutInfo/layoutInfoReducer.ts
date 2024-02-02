import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import {
  BatchUpdateWidgetLayoutInfoPayload,
  LayoutInfoState,
  UpdateWidgetLayoutInfoPayload,
} from "./layoutInfoState"

export const setWidgetLayoutInfoReducer: CaseReducer<
  LayoutInfoState,
  PayloadAction<LayoutInfoState["widgetsLayoutInfo"]>
> = (state, action) => {
  state.widgetsLayoutInfo = action.payload
}

export const updateWidgetLayoutInfoReducer: CaseReducer<
  LayoutInfoState,
  PayloadAction<UpdateWidgetLayoutInfoPayload>
> = (state, action) => {
  if (!state) return
  const { displayName, layoutInfo } = action.payload
  const widgetsLayoutInfo = state.widgetsLayoutInfo
  const currentWidget = widgetsLayoutInfo[displayName]
  if (!currentWidget || !layoutInfo || Object.keys(layoutInfo).length === 0) {
    return
  }
  currentWidget.layoutInfo = {
    ...currentWidget.layoutInfo,
    ...layoutInfo,
  }
}

export const batchUpdateWidgetLayoutInfoReducer: CaseReducer<
  LayoutInfoState,
  PayloadAction<BatchUpdateWidgetLayoutInfoPayload[]>
> = (state, action) => {
  if (!state) return
  action.payload.forEach((updateSlice) => {
    const { displayName, layoutInfo } = updateSlice
    const widgetsLayoutInfo = state.widgetsLayoutInfo
    const currentWidget = widgetsLayoutInfo[displayName]
    if (!currentWidget || !layoutInfo || Object.keys(layoutInfo).length === 0) {
      return
    }
    currentWidget.layoutInfo = {
      ...currentWidget.layoutInfo,
      ...layoutInfo,
    }
  })
}

export const updateWidgetLayoutInfoWhenChangeDisplayNameReducer: CaseReducer<
  LayoutInfoState,
  PayloadAction<{ oldDisplayName: string; newDisplayName: string }>
> = (state, action) => {
  const { oldDisplayName, newDisplayName } = action.payload
  const widgetsLayoutInfo = state.widgetsLayoutInfo
  const currentWidget = widgetsLayoutInfo[oldDisplayName]
  if (!currentWidget) return
  delete widgetsLayoutInfo[oldDisplayName]
  widgetsLayoutInfo[newDisplayName] = currentWidget
}
