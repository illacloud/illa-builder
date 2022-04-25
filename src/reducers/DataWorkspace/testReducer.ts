// const testReducer = (state = { count: 0 }, action) => {
//   switch (action.type) {
//     case "INSERT":
//       return {
//         count: state.count + 1
//       }
//     default:
//       return state
//   }
// }

// export default testReducer

import { createAction, createReducer } from '@reduxjs/toolkit'

interface CounterState {
	value: number
}

const increment = createAction('counter/increment')
// const decrement = createAction('counter/decrement')
// const incrementByAmount = createAction<number>('counter/incrementByAmount')

const initialState = { value: 0 } as CounterState

const testReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(increment, (state, action) => {
			state.value++
		})
})

export default testReducer