import { configureStore } from "@reduxjs/toolkit"
import builderReducer from "./redux/reducers"

const store = configureStore({
  reducer: builderReducer,
})

export default store
