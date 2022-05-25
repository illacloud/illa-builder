import { RootState } from "@/store"

export const getWidgetStates = (state: RootState) => state.editor.widgetStates

export const getFocusedWidget = (state: RootState) =>
  state.editor.widgetStates.focusedWidget

export const getDragDetails = (state: RootState) =>
    state.editor.widgetStates.dragDetails