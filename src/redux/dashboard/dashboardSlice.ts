import { createSlice } from "@reduxjs/toolkit"
import { DashboardInitialState } from "@/redux/dashboard/dashboardState"
import {
  fetchList,
  fetchListReducer,
  incrementByAmountReducer,
} from "@/redux/dashboard/dashboardReducer"

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: DashboardInitialState,
  reducers: {
    incrementByAmountReducer,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchList.fulfilled, fetchListReducer)
  },
})

export default dashboardSlice.reducer
