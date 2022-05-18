import {
  all,
  put,
  takeEvery,
  takeLatest,
  delay,
  call,
} from "redux-saga/effects"
import {
  increaseDragValue,
  getDataSuccess,
} from "../reducers/editorReducer/dragReducer"

function* increment() {
  yield put(increaseDragValue())
}
function* incrementAsync() {
  yield delay(5000)
  yield put(increaseDragValue())
}
function* getData() {
  const fn = () => {
    return fetch("https://api.github.com/users/github", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        return res
      })
  }
  const res = yield call(fn)
  yield put(getDataSuccess(res))
}
function* watchIncrement() {
  yield takeEvery("increment_saga", increment)
  yield takeLatest("incrementAsync_drag_saga", incrementAsync)
  yield takeLatest("GET_DATA", getData)
}

function* demoSaga() {
  yield all([watchIncrement()])
}
export default demoSaga
