import { InspectState } from "@/redux/inspect/inspectState"
import { RootState } from "@/store"
import { createSelector } from "@reduxjs/toolkit"
import { getSelectedWidgets } from "@/redux/editor/widgetStates/widgetStateSelector"

export const getInspectState = (state: RootState): InspectState =>
  state.editor.inspect

export const getWidgetInspectBySelectId = createSelector(
  [getInspectState, getSelectedWidgets],
  (inspectState, selectIds) => {
    if (selectIds.length === 1) {
      return inspectState[selectIds[0]]
    }
  },
)
