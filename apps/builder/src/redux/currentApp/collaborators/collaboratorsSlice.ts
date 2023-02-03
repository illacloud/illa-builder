import { createSlice } from "@reduxjs/toolkit"
import {
  clearComponentAttachedUsers,
  setInRoomUsers,
  updateComponentAttachedUsers,
} from "@/redux/currentApp/collaborators/collaboratorsReducer"
import { CollaboratorsInitialState } from "@/redux/currentApp/collaborators/collaboratorsState"

const collaboratorsSlice = createSlice({
  name: "collaborators",
  initialState: CollaboratorsInitialState,
  reducers: {
    setInRoomUsers,
    clearComponentAttachedUsers,
    updateComponentAttachedUsers,
  },
})

export const collaboratorsActions = collaboratorsSlice.actions
export default collaboratorsSlice.reducer
