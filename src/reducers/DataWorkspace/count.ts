import { createSlice } from '@reduxjs/toolkit'

const countSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    countAdd(state) {
      state.value += 1
    }
  }
})

export const { countAdd } = countSlice.actions
export default countSlice.reducer
