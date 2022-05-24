import { configureStore } from "@reduxjs/toolkit"
import logger from "redux-logger"
import editorReducer from "@/redux/editor"
import actionReducer from "@/redux/action"
import dashboardReducer from "@/redux/dashboard/dashboardSlice"

const store = configureStore({
  reducer: {
    editor: editorReducer,
    action: actionReducer,
    dashboard: dashboardReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store
