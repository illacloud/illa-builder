import { Transformer } from "@/redux/currentApp/action/actionState"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import store from "@/store"
import { runTransformer } from "./runActionTransformer"

export const updateFetchResultDisplayName = (
  displayName: string,
  rawData: any,
  transformer: Transformer,
) => {
  let transltedData = runTransformer(transformer, rawData?.data ?? "")
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
