import { spawn, all } from "redux-saga/effects"

import demoSaga from "./demo"
import demo2Saga from "./demo2"

const sagas = [demoSaga, demo2Saga]

export function* rootSaga(sagaList = sagas) {
  yield all(
    sagaList.map((saga) =>
      spawn(function* () {
        yield spawn(saga)
      }),
    ),
  )
}
