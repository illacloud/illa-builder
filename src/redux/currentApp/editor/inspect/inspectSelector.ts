import { InspectState } from "@/redux/currentApp/editor/inspect/inspectState"
import { RootState } from "@/store"
import { createSelector } from "@reduxjs/toolkit"
import { getSelectedComponentsDisplayName } from "@/redux/currentApp/config/configSelector"

export const getInspectState = (state: RootState): InspectState =>
  state.currentApp.editor.inspect

export const getWidgetInspectBySingleSelected = createSelector(
  [getInspectState, getSelectedComponentsDisplayName],
  (inspectState, selectedComponentDisplayNames) => {
    if (selectedComponentDisplayNames.length === 1) {
      return inspectState[selectedComponentDisplayNames[0]]
    }
  },
)
