import { combineReducers } from 'redux'

import countReducer from "./DataWorkspace/count";

export const rootReducer = combineReducers({
	counter: countReducer
})