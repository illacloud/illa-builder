import { all, put, takeEvery, takeLatest, delay } from 'redux-saga/effects'
import { changeDemoValueA } from '../reducers/editorReducer/demoReducer'


function* incrementAsync() {
  yield delay(1000)
  yield put(changeDemoValueA())
}
function* watchIncrement() {
  yield takeLatest('incrementAsync_demo_saga', incrementAsync)
}

function* demo2Saga() {
  yield all([watchIncrement()])
}
export default demo2Saga
