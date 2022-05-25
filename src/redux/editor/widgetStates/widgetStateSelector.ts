import { RootState } from "@/store"

export const getWidgetStates = (state: RootState) => state.editor.widgetStates

export const getFocusedWidget = (state: RootState) =>
  state.editor.widgetStates.focusedWidget
