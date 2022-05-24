import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initValue: DemoState = {
  name: "demo name",
  value: {
    a: 1,
    b: [1, 2, 3],
    c: {
      value: "demo value",
    },
    d: {},
  },
}

const fn = () => {
  return fetch("https://api.github.com/users/github", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      return res
    })
}
export const fetchUser = createAsyncThunk(
  "demo/fetchDemoData",
  async (params, thunkAPI) => {
    const response = await fn()
    return response
  },
)

const demoSlice = createSlice({
  name: "demo",
  initialState: initValue,
  reducers: {
    changeDemoValueA(state) {
      state.value.a++
    },
    changeDemoValueB(state) {
      state.value.b.push(4)
    },
    changeDemoValueC(state) {
      state.value.c.value = "demo C"
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      console.log("fetchUser.fulfilled")
      state.value.d = action.payload
    })
  },
})

export const { changeDemoValueA, changeDemoValueB, changeDemoValueC } =
  demoSlice.actions

export default demoSlice.reducer

export interface DemoState {
  name: string
  value: {
    a: number
    b: number[]
    c: {
      value: string
    }
    d: any
  }
}
