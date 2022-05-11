import { combineReducers } from "redux"
import undoable, { StateWithHistory } from "redux-undo"
import demoReducer, { DemoState } from "./demoReducer"
import modeReducer, { ModeState } from "./modeReducer"
import dragReducer, { DragState } from "./dragReducer"
import dslReducer from "./dslReducer"
import { DslState } from "./dslReducer/dsl-state"
import widgetStatesReducer, {
  WidgetDragResizeState,
} from "./widgetStatesReducer"

export interface EditorState {
  demo: DemoState
  mode: ModeState
  drag: DragState
  dsl: DslState
  widgetStates: WidgetDragResizeState
}

const editorReducer = combineReducers({
  demo: demoReducer,
  mode: modeReducer,
  drag: dragReducer,
  dsl: dslReducer,
  widgetStates: widgetStatesReducer,
})

export type EditorReduxState = StateWithHistory<EditorState>
export default undoable(editorReducer)
