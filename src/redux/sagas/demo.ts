import { all, takeLatest, select } from "redux-saga/effects"

function* listener() {
  console.log("listener")
  const state = yield select()
  console.log(state)
}
function* watchIncrement() {
  yield takeLatest("demo/fetchDemoData/fulfilled", listener)
}

function* demoSaga() {
  yield all([watchIncrement()])
}
export default demoSaga
