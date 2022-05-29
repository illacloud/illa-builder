import { RootState } from "@/store"
import { createSelector } from "@reduxjs/toolkit"

export const getWidgetStates = (state: RootState) => state.editor.widgetStates

export const getFocusedWidget = (state: RootState) =>
  state.editor.widgetStates.focusedWidget

export const getDragDetails = (state: RootState) =>
  state.editor.widgetStates.dragDetails

export const getSelectedWidgets = createSelector(
  [getWidgetStates],
  (widgetState) => widgetState.selectedWidgets,
)
