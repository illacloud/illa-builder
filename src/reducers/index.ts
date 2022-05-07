import { combineReducers } from "redux"

import moduleReducer from "./moduleReducer"
const builderReducer = combineReducers({
  module: moduleReducer,
  // user ?
  // actions ?
})

export default builderReducer
