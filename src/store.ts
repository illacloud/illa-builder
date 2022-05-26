import { configureStore } from "@reduxjs/toolkit"
import builderReducer from "./redux/reducers"
import logger from "redux-logger"
import createSagaMiddleware from "redux-saga"

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: builderReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, logger),
})

export default store
