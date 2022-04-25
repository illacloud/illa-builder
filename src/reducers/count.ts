// const countReducer = (state = { count: 0 }, action) => {
//   switch (action.type) {
//     case "INSERT":
//       return {
//         count: state.count + 1
//       }
//     default:
//       return state
//   }
// }

// export default countReducer

import { combineReducers } from 'redux'
import { createSlice } from '@reduxjs/toolkit'

import testReducer from './DataWorkspace/testReducer'


// const rootReducer = combineReducers({
//   test: testReducer
// })

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
  // reducers: testReducer
})

export const { countAdd } = countSlice.actions
export default countSlice.reducer