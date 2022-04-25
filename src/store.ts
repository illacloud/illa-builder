import { configureStore } from "@reduxjs/toolkit";
import countReducer from "./reducers/count";
const store = configureStore({
  reducer: {
    counter: countReducer
  }
})

export default store