import { configureStore } from "@reduxjs/toolkit"
import builderReducer from "./reducers"

const store = configureStore({
  reducer: builderReducer,
})

export default store
