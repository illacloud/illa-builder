import { configureStore } from "@reduxjs/toolkit"
import logger from "redux-logger"
import builderReducer from "@/redux/reducers"

const store = configureStore({
  reducer: builderReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store
