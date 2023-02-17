import { ActionItem } from "@/redux/currentApp/action/actionState"
import { TransformerAction } from "@/redux/currentApp/action/transformerAction"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import store from "@/store"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"

export const runActionTransformer = (
  action: ActionItem<TransformerAction>,
  buildContext?: Record<string, any>,
  isTrigger?: boolean,
) => {
  const rootState = store.getState()
  const allBuildContext = buildContext
    ? buildContext
    : getExecutionResult(rootState)
  let calcResult = ""
  try {
    calcResult = evaluateDynamicString(
      "",
      action.content.transformerString,
      allBuildContext,
    )
    if (isTrigger) {
      store.dispatch(
        executionActions.updateExecutionByDisplayNameReducer({
          displayName: action.displayName,
          value: {
            value: calcResult,
          },
        }),
      )
    }
    return calcResult
  } catch (e) {
    console.log(e)
  }
}
