import { EXECUTION_WORKER_MESSAGES } from "@/utils/worker/interface"
import { ExecutionTreeFactory } from "@/utils/executionTreeHelper/executionTreeFactory"
import { RawTreeShape } from "@/utils/executionTreeHelper/interface"

const context: Worker = self as any

export let executionTree: ExecutionTreeFactory | undefined

export const messageEventListenerManager = (
  fn: (
    action: EXECUTION_WORKER_MESSAGES,
    globalData: Record<string, any>,
  ) => any,
) => {
  return (event: MessageEvent) => {
    const { action, globalData } = event.data
    if (action) {
      const responseData = fn(action, globalData) || {}
      if (responseData) {
        try {
          context.postMessage({
            ...responseData,
          })
        } catch (e) {
          console.error(e)
        }
      }
    }
  }
}

context.addEventListener(
  "message",
  messageEventListenerManager((message, globalData) => {
    switch (message) {
      case EXECUTION_WORKER_MESSAGES.SETUP: {
        // TODO: @aruseito when has plugin,can install plugin here
        return true
      }
      case EXECUTION_WORKER_MESSAGES.EXECUTION_TREE: {
        let errorTree: Record<string, any> = {}
        let evaluatedTree: Record<string, any> = {}
        let dependencyMap: Record<string, any> = {}
        try {
          if (!executionTree) {
            // TODO: @aruseito when has diff method,remove const
            const executionTree = new ExecutionTreeFactory()
            const executionResult = executionTree.initTree(
              globalData as RawTreeShape,
            )
            errorTree = executionResult.errorTree
            evaluatedTree = executionResult.evaluatedTree
            dependencyMap = executionResult.dependencyTree
          } else if (executionTree.hasCyclical) {
            const dataTreeEvaluator = new ExecutionTreeFactory()
            const dataTreeResult = dataTreeEvaluator.initTree(
              globalData as RawTreeShape,
            )
            errorTree = dataTreeResult.errorTree
            evaluatedTree = dataTreeResult.evaluatedTree
            dependencyMap = dataTreeResult.dependencyTree
          } else {
            //  TODO: @aruseito need diff to update tree
          }
        } catch (e) {
          console.log(e)
        }
        return {
          evaluatedTree,
          errorTree,
          dependencyMap,
        }
      }
    }
  }),
)
