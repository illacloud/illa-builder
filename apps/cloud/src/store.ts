import { currentUserReducer, teamReducer } from "@illa-public/user-data"
import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    team: teamReducer,
  },
})

export type ILLARootState = ReturnType<typeof store.getState>
