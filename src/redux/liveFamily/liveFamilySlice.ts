import { createSlice } from "@reduxjs/toolkit"
import { LiveFamilyInitialState } from "@/redux/liveFamily/liveFamilyState"
import {
  addPresenceReducer,
  removePresenceReducer,
  updateLiveFamilyListReducer,
  updatePresenceReducer,
} from "@/redux/liveFamily/liveFamilyReducer"

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
