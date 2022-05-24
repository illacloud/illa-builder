import { createSlice } from "@reduxjs/toolkit"
import { DashboardInitialState } from "@/redux/reducers/dashboard/dashboardState"
import {
  fetchList,
  fetchListReducer,
  incrementByAmountReducer,
} from "@/redux/reducers/dashboard/dashboardReducer"

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
