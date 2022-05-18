import { BuilderState } from "@/redux/reducers/interface"

export const getWidgetStates = (state: BuilderState) =>
  state.editor.present.widgetStates

export const getFocusedWidget = (state: BuilderState) =>
  state.editor.present.widgetStates.focusedWidget
