import { all, put, takeEvery, takeLatest, delay } from 'redux-saga/effects'
import { increaseDragValue } from '../reducers/editorReducer/dragReducer'

function* increment() {
  yield put(increaseDragValue())
}
function* incrementAsync() {
  yield delay(5000)
  yield put(increaseDragValue())
}
function* watchIncrement() {
  yield takeEvery('increment_saga', increment)
  yield takeLatest('incrementAsync_drag_saga', incrementAsync)
}

function* demoSaga() {
  yield all([watchIncrement()])
}
export default demoSaga
