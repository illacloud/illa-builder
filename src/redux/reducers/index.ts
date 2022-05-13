import { combineReducers } from "redux"

import editorReducer from "./editorReducer"
import actionReducer from "./actionReducer"

const builderReducer = combineReducers({
  editor: editorReducer,
  action: actionReducer,
  // userGroup: userGroupReducer
  // metaInfo: metaInfoReducer
})

export default builderReducer
