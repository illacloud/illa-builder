import { AxiosResponse } from "axios"
import { createMessage } from "@illa-design/react"
import { GUIDE_DEFAULT_ACTION_ID } from "@/config/guide"
import i18n from "@/i18n/config"
import { isFileOversize } from "@/page/App/components/Actions/ActionPanel/utils/calculateFileSize"
import {
  getIsILLAGuideMode,
  getIsILLAProductMode,
} from "@/redux/config/configSelector"
import { getActionList } from "@/redux/currentApp/action/actionSelector"
import {
  ActionContent,
  ActionItem,
  ActionType,
} from "@/redux/currentApp/action/actionState"
import { Events } from "@/redux/currentApp/action/actionState"
import { MysqlLikeAction } from "@/redux/currentApp/action/mysqlLikeAction"
import {
  BodyContent,
  RestApiAction,
} from "@/redux/currentApp/action/restapiAction"
import { SMPTAction } from "@/redux/currentApp/action/smtpAction"
import { getAppId } from "@/redux/currentApp/appInfo/appInfoSelector"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { fetchActionRunResult } from "@/services/action"
import store from "@/store"
import { transformDataFormat } from "@/utils/action/transformDataFormat"
import { ILLAEditorRuntimePropsCollectorInstance } from "@/utils/executionTreeHelper/runtimePropsCollector"
import {
  isClientS3ActionContent,
  isDriveActionContent,
  isILLAAPiError,
} from "@/utils/typeHelper"
import { fetchILLADriveClientResult } from "./driveActions"
import { fetchS3ClientResult } from "./fetchS3ClientResult"
import { runActionErrorForColla } from "./runActionErrorForColla"
import { runAllEventHandler } from "./runActionEventHandler"
import { runTransformer } from "./runActionTransformer"
import { transResponse } from "./transResponse"

const message = createMessage()

const checkCanSendRequest = (
  actionType: ActionType,
  actionContent: ActionContent,
) => {
  if (actionType !== "smtp") {
    return true
  }
  const { attachment } = actionContent as SMPTAction
  const result = !!attachment && isFileOversize(attachment, "smtp")
  if (result) {
    message.error({
      content: i18n.t("editor.action.panel.error.max_file"),
    })
  }
  return !result
}

export const fetchActionResult = async (
  isPublic: boolean,
  resourceID: string,
  actionType: ActionType,
  displayName: string,
  appId: string,
  actionID: string,
  actionContent: ActionContent,
  actionContext: Record<string, unknown> = {},
  abortSignal?: AbortSignal,
) => {
  const canSendRequest = checkCanSendRequest(actionType, actionContent)
  if (!canSendRequest) {
    return Promise.reject(false)
  }

  const requestBody = {
    resourceID,
    actionType,
    displayName,
    content: actionContent,
    context: actionContext,
  }
  return await fetchActionRunResult(
    appId,
    actionID,
    requestBody,
    isPublic,
    abortSignal,
  )
}

export interface IExecutionActions extends ActionItem<ActionContent> {
  $actionID: string
  $resourceID: string
  $context: Record<string, unknown>
}

export const runActionWithExecutionResult = async (
  action: IExecutionActions,
  needRunEventHandler: boolean = true,
  abortSignal?: AbortSignal,
) => {
  const { displayName } = action as ActionItem<
    MysqlLikeAction | RestApiAction<BodyContent>
  >
  const { content, $actionID, $resourceID, actionType, transformer, $context } =
    action
  const originActionList = getActionList(store.getState())
  const originAction = originActionList.find(
    (item) => item.displayName === displayName,
  )
  if (!content || !originAction) return Promise.reject(false)
  const rootState = store.getState()
  const appId = getAppId(rootState)
  const isGuideMode = getIsILLAGuideMode(rootState)
  const isProductionMode = getIsILLAProductMode(rootState)
  const {
    successEvent: _successEvent = [],
    failedEvent: _failedEvent = [],
    ...restContent
  } = content as ActionContent & Events

  const {
    successEvent: originSuccessEvent = [],
    failedEvent: originFailedEvent = [],
    $dynamicAttrPaths = [],
  } = originAction.content as ActionContent &
    Events & { $dynamicAttrPaths: string[] }
  const actionContent = transformDataFormat(
    actionType as ActionType,
    restContent,
  ) as ActionContent

  store.dispatch(
    executionActions.updateExecutionByDisplayNameReducer({
      displayName: displayName,
      value: {
        isRunning: true,
        startTime: new Date().getTime(),
        endTime: new Date().getTime(),
      },
    }),
  )

  const currentActionId = (
    isGuideMode ? GUIDE_DEFAULT_ACTION_ID : $actionID
  ) as string

  try {
    let response: AxiosResponse = await fetchActionResult(
      !isProductionMode ? false : action.config?.public ?? false,
      ($resourceID as string) || "",
      actionType as ActionType,
      displayName,
      appId,
      currentActionId,
      actionContent,
      $context,
      abortSignal,
    )

    if (isClientS3ActionContent(actionType, actionContent)) {
      response = await fetchS3ClientResult(response.data.Rows, actionContent)
    } else if (isDriveActionContent(actionType, actionContent)) {
      response = await fetchILLADriveClientResult(
        !isProductionMode ? false : action.config?.public ?? false,
        ($resourceID as string) || "",
        displayName,
        appId,
        currentActionId,
        actionContent,
        response,
      )
    }
    const illaInnerTransformedResponse = transResponse(
      actionType,
      actionContent,
      response,
    )

    let userTransformedData = runTransformer(
      transformer,
      illaInnerTransformedResponse.data ?? "",
    )

    store.dispatch(
      executionActions.updateExecutionByDisplayNameReducer({
        displayName: displayName,
        value: {
          ...illaInnerTransformedResponse,
          data: userTransformedData,
          runResult: undefined,
          isRunning: false,
          endTime: new Date().getTime(),
        },
      }),
    )

    if (needRunEventHandler) {
      runAllEventHandler(originSuccessEvent, $dynamicAttrPaths)
    }
    return Promise.resolve(userTransformedData)
  } catch (e) {
    let runResult = {
      error: true,
      message: "An unknown error",
    }
    runActionErrorForColla(actionType, actionContent, e)
    if (isILLAAPiError(e)) {
      runResult.message = e.data?.errorMessage || "An unknown error"
    }
    store.dispatch(
      executionActions.updateExecutionByDisplayNameReducer({
        displayName: displayName,
        value: {
          data: undefined,
          runResult: runResult,
          isRunning: false,
          endTime: new Date().getTime(),
        },
      }),
    )
    if (needRunEventHandler)
      runAllEventHandler(originFailedEvent, $dynamicAttrPaths)

    return Promise.reject(runResult)
  }
}

export const runOriginAction = async (action: ActionItem<ActionContent>) => {
  const { displayName } = action
  const finalContext =
    ILLAEditorRuntimePropsCollectorInstance.getGlobalCalcContext()
  const realAction = finalContext[displayName] as IExecutionActions
  return await runActionWithExecutionResult(realAction)
}

export const runActionWithDelay = (
  action: IExecutionActions,
  abortSignal?: AbortSignal,
) => {
  const { config } = action
  if (!config || !config.advancedConfig) {
    runActionWithExecutionResult(action, true, abortSignal)
    return
  }
  const { advancedConfig } = config
  const { delayWhenLoaded } = advancedConfig
  return new Promise((resolve, reject) => {
    const timeoutID = window.setTimeout(
      async () => {
        window.clearTimeout(timeoutID)

        try {
          const result = await runActionWithExecutionResult(
            action,
            true,
            abortSignal,
          )
          return resolve(result)
        } catch (e) {
          console.log("e", e)
          return reject(e)
        }
      },
      delayWhenLoaded as unknown as number,
    )
  })
}

const actionIDMapTimerID: Record<string, number> = {}

export const registerActionPeriod = (action: IExecutionActions) => {
  const { config } = action
  if (
    !config ||
    !config.advancedConfig ||
    !config.advancedConfig.isPeriodically ||
    (config.advancedConfig.periodInterval as unknown as number) <= 0
  ) {
    removeActionPeriod(action.$actionID)
    return
  }
  removeActionPeriod(action.$actionID)
  const timeID = window.setInterval(
    () => {
      runActionWithExecutionResult(action)
    },
    (config.advancedConfig.periodInterval as unknown as number) * 1000,
  )
  actionIDMapTimerID[action.$actionID] = timeID
}

export const removeActionPeriod = (actionID: string) => {
  if (actionIDMapTimerID[actionID]) {
    window.clearInterval(actionIDMapTimerID[actionID])
  }
}

export const removeAllActionPeriod = () => {
  Object.values(actionIDMapTimerID).forEach((id) => {
    window.clearInterval(id)
  })
}
