import { CaseReducer, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { DashboardState } from "@/redux/dashboard/dashboardState"

export const incrementByAmountReducer: CaseReducer<
  DashboardState,
  PayloadAction<number>
> = (state, action) => {}

export const fetchListReducer: CaseReducer<
  DashboardState,
  PayloadAction<Test>
> = (state, action) => {}

export const fetchList = createAsyncThunk("todos/fetchList", async () => {
  const response = await fetch("/fakeApi/list")
  return {} as Test
})
