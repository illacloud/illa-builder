import { combineReducers } from "redux"
import demoReducer from "./demoReducer"

const moduleReducer = combineReducers({
  demo: demoReducer,
})

export default moduleReducer
