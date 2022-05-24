import { configureStore } from "@reduxjs/toolkit"
import logger from "redux-logger"
import editorReducer from "@/redux/reducers/editorReducer"
import actionReducer from "@/redux/reducers/actionReducer"
import dashboardReducer from "@/redux/reducers/dashboard/dashboardSlice"

const store = configureStore({
  reducer: {
    editor: editorReducer,
    action: actionReducer,
    dashboard: dashboardReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store
