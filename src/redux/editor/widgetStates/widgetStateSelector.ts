import { RootState } from "@/store"
import { createSelector } from "@reduxjs/toolkit"
import { WidgetDragResizeState } from "@/redux/editor/widgetStates/widgetStatesState"

export const getWidgetStates = (state: RootState): WidgetDragResizeState =>
  state.editor.widgetStates

export const getFocusedWidget = (state: any) =>
  state.editor.widgetStates.focusedWidget

export const getSelectedWidgets = createSelector(
  [getWidgetStates],
  (widgetState) => widgetState.selectedWidgets,
)
