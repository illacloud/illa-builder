import { combineReducers } from "redux"
import actionListReducer, { ActionListState } from "./actionListReducer"

export interface ActionState {
  actions: ActionListState
}

const actionReducer = combineReducers({
  actions: actionListReducer,
})

export default actionReducer
