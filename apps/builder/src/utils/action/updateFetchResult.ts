import { Transformer } from "@/redux/currentApp/action/actionState"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import store from "@/store"
import { actionDisplayNameMapFetchResult } from "./runAction"
import { runTransformer } from "./runActionTransformer"

export const updateFetchResultDisplayName = (
  displayName: string,
  rawData: any,
  transformer: Transformer,
) => {
  let transltedData = runTransformer(transformer, rawData?.data ?? "")
  actionDisplayNameMapFetchResult[displayName] = transltedData
  store.dispatch(
    executionActions.updateExecutionByDisplayNameReducer({
      displayName: displayName,
      value: {
        ...rawData,
        data: transltedData,
        runResult: undefined,
        isRunning: false,
        endTime: new Date().getTime(),
      },
    }),
  )
}
