import * as Redux from "redux"

export const reduxAsync: Redux.Middleware = (store) => (next) => (action) => {
  const { type, payload } = action

  let returnedValue = next(action)

  return returnedValue
}
