import { call, spawn, all, race } from "redux-saga/effects";

import demoSaga from './demo'
import demo2Saga from "./demo2";

const sagas = [demoSaga, demo2Saga]

export function* rootSaga(sagaList = sagas) {

  sagaList.map((saga) => {
    // console.log(saga)
    (function* () {
      console.log('yield')
      yield spawn(saga)
    })
  })
  // yield all([demoSaga(), demo2Saga()])

  // yield spawn(sagas[0])
  // yield spawn(sagas[1])
}
