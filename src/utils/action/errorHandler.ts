import store from "@/store"
import { executionActions } from "@/redux/currentApp/executionTree/execution/executionSlice"
import { ACTION_TYPE } from "@/page/App/components/ActionEditor/constant"
import {
  ExecutionErrorType,
  ErrorShape,
} from "@/redux/currentApp/executionTree/execution/executionState"

import { ActionItem } from "@/redux/currentApp/action/actionState"
import { AxiosResponse } from "axios"

function handleSqlError(action: ActionItem, response: AxiosResponse) {
  const { data: errorInfo } = response
  const { errorMessage, errorData } = errorInfo

  if (errorMessage === "SQL syntax error") {
    const errorPayload: ErrorShape = {
      errorType: ExecutionErrorType.LINT,
      errorMessage: errorData.message,
      errorLine: errorData.lineNumber,
    }

    store.dispatch(
      executionActions.updateExecutionErrorByAttrPathReducer({
        attrPath: `${action.displayName}.query`,
        value: errorPayload,
      }),
    )
  }
}

export function errorHandler(action: ActionItem, response: AxiosResponse) {
  switch (action.actionType) {
    case ACTION_TYPE.MYSQL:
      handleSqlError(action, response)
      break
    default:
      break
  }
}
