import { combineReducers } from "redux"
import undoable, { StateWithHistory } from "redux-undo"
import modeReducer, { ModeState } from "./modeReducer"
import dslReducer, { DslState } from "./dslReducer"
import widgetStatesReducer, {
  WidgetDragResizeState,
} from "./widgetStatesReducer"

export interface EditorState {
  mode: ModeState
  dsl: DslState
  widgetStates: WidgetDragResizeState
}

const editorReducer = combineReducers({
  mode: modeReducer,
  dsl: dslReducer,
  widgetStates: widgetStatesReducer,
})

export type EditorReduxState = StateWithHistory<EditorState>
export default undoable(editorReducer)
