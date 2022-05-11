import { combineReducers } from "redux"

import editorReducer from "./editorReducer"

const builderReducer = combineReducers({
  editor: editorReducer,
  // action: actionReducer
  // userGroup: userGroupReducer
  // metaInfo: metaInfoReducer
})

export default builderReducer
