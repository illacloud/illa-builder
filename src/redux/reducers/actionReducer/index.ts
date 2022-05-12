import { combineReducers } from "redux"
import queryListReducer, { QueryListState } from "./queryListReducer"


export interface ActionState {
  queryList: QueryListState
}

const actionReducer = combineReducers({
  queryList: queryListReducer
})

export default actionReducer
