import { createSlice } from "@reduxjs/toolkit"
import {
  addPresenceReducer,
  removePresenceReducer,
  updateLiveFamilyListReducer,
  updatePresenceReducer,
} from "@/redux/liveFamily/liveFamilyReducer"
import { LiveFamilyInitialState } from "@/redux/liveFamily/liveFamilyState"

const liveFamilySlice = createSlice({
  name: "liveFamily",
  initialState: LiveFamilyInitialState,
  reducers: {
    updateLiveFamilyListReducer,
    addPresenceReducer,
    removePresenceReducer,
    updatePresenceReducer,
  },
})

export const liveFamilyActions = liveFamilySlice.actions
export default liveFamilySlice.reducer
