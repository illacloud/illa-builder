import { createStore } from "redux";
import countReducer from "./reducers/count";
const store = createStore(countReducer)

export default store