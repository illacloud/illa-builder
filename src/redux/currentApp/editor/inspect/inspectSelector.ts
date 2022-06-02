import { InspectState } from "@/redux/currentApp/editor/inspect/inspectState"
import { RootState } from "@/store"
import { createSelector } from "@reduxjs/toolkit"

export const getInspectState = (state: RootState): InspectState =>
  state.currentApp.editor.inspect

export const getWidgetInspectBySelectId = createSelector(
  // TODO: chenlongbo
  [getInspectState, () => ["0"]],
  (inspectState, selectIds) => {
    if (selectIds.length === 1) {
      return inspectState[selectIds[0]]
    }
  },
)
