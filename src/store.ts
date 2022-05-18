import { configureStore } from "@reduxjs/toolkit"
import builderReducer from "./redux/reducers"
import logger from "redux-logger"
import createSagaMiddleware from "redux-saga"
import { rootSaga } from "./redux/sagas/index"

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: builderReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, logger),
})
sagaMiddleware.run(rootSaga)

export default store
