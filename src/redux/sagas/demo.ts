import {
  all,
  put,
  takeEvery,
  takeLatest,
  delay,
  call,
  select,
} from "redux-saga/effects"
import { increaseDragValue } from "../reducers/editorReducer/dragReducer"

function* increment() {
  yield put(increaseDragValue())
}
function* incrementAsync() {
  yield delay(5000)
  yield put(increaseDragValue())
}
function* listener() {
  console.log("listener")
}
function* watchIncrement() {
  yield takeEvery("increment_saga", increment)
  yield takeLatest("incrementAsync_drag_saga", incrementAsync)
  yield takeLatest("demo/fetchDemoData/fulfilled", listener)
}

function* demoSaga() {
  yield all([watchIncrement()])
}
export default demoSaga
