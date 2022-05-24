import { CaseReducer, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { DashboardState } from "@/redux/reducers/dashboard/dashboardState"

export const incrementByAmountReducer: CaseReducer<
  DashboardState,
  PayloadAction<number>
> = (state, action) => {
  state.appsState.co += action.payload
}

export const fetchListReducer: CaseReducer<
  DashboardState,
  PayloadAction<Test>
> = (state, action) => {}

export const fetchList = createAsyncThunk("todos/fetchList", async () => {
  const response = await fetch("/fakeApi/list")
  return {} as Test
})
