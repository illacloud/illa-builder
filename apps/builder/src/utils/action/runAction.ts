import { AxiosResponse } from "axios"
import { createMessage } from "@illa-design/react"
import { ILLAApiError } from "@/api/http"
import { GUIDE_DEFAULT_ACTION_ID } from "@/config/guide"
import i18n from "@/i18n/config"
import { isFileOversize } from "@/page/App/components/Actions/ActionPanel/utils/calculateFileSize"
import { getIsILLAGuideMode } from "@/redux/config/configSelector"
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
import {
  ClientS3,
  S3Action,
  S3ActionTypeContent,
} from "@/redux/currentApp/action/s3Action"
import { SMPTAction } from "@/redux/currentApp/action/smtpAction"
import { getAppId } from "@/redux/currentApp/appInfo/appInfoSelector"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import {
  IActionRunResultResponseData,
  fetchActionRunResult,
} from "@/services/action"
import store from "@/store"
import { transformDataFormat } from "@/utils/action/transformDataFormat"
import { ILLAEditorRuntimePropsCollectorInstance } from "@/utils/executionTreeHelper/runtimePropsCollector"
import { isILLAAPiError } from "@/utils/typeHelper"
import { fetchS3ClientResult } from "./fetchS3ClientResult"
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

const fetchActionResult = async (
  isPublic: boolean,
  resourceId: string,
  actionType: ActionType,
  displayName: string,
  appId: string,
  actionId: string,
  actionContent: ActionContent,
  abortSignal?: AbortSignal,
) => {
  const canSendRequest = checkCanSendRequest(actionType, actionContent)
  if (!canSendRequest) {
    return Promise.reject(false)
  }

  const requestBody = {
    resourceId,
    actionType,
    displayName,
    content: actionContent,
  }
  return await fetchActionRunResult(
    appId,
    actionId,
    requestBody,
    isPublic,
    abortSignal,
  )
}

export interface IExecutionActions extends ActionItem<ActionContent> {
  $actionId: string
  $resourceId: string
}

export const runActionWithExecutionResult = async (
  action: IExecutionActions,
  needRunEventHandler: boolean = true,
  abortSignal?: AbortSignal,
) => {
  const { displayName } = action as ActionItem<
    MysqlLikeAction | RestApiAction<BodyContent>
  >
  const realAction = action
  const { content, $actionId, $resourceId, actionType, transformer } =
    realAction
  const originActionList = getActionList(store.getState())
  const originAction = originActionList.find(
    (item) => item.displayName === displayName,
  )
  if (!content || !originAction) return Promise.reject(false)
  const rootState = store.getState()
  const appId = getAppId(rootState)
  const isGuideMode = getIsILLAGuideMode(rootState)
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
    isGuideMode ? GUIDE_DEFAULT_ACTION_ID : $actionId
  ) as string

  try {
    let response:
      | AxiosResponse<
          IActionRunResultResponseData<Record<string, any>[]>,
          unknown
        >
      | AxiosResponse<BlobPart, unknown>
      | (
          | AxiosResponse<BlobPart, unknown>
          | AxiosResponse<ILLAApiError, any>
        )[] = (await fetchActionResult(
      action.config?.public ?? false,
      ($resourceId as string) || "",
      actionType as ActionType,
      displayName,
      appId,
      currentActionId,
      actionContent,
      abortSignal,
    )) as AxiosResponse<
      IActionRunResultResponseData<Record<string, any>[]>,
      unknown
    >
    const isClientS3 =
      actionType === "s3" &&
      ClientS3.includes(
        (actionContent as S3Action<S3ActionTypeContent>).commands,
      )
    if (isClientS3) {
      response = await fetchS3ClientResult(response.data.Rows, actionContent)
    }
    const illaInnerTransformedResponse = transResponse(
      actionType,
      response,
      isClientS3,
    )
    let userTransformedData = runTransformer(
      transformer,
      illaInnerTransformedResponse.data ?? "",
    )

    store.dispatch(
      executionActions.updateExecutionByDisplayNameReducer({
        displayName: displayName,
        value: {
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
    const timeoutID = window.setTimeout(async () => {
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
    }, delayWhenLoaded as unknown as number)
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
    removeActionPeriod(action.$actionId)
    return
  }
  removeActionPeriod(action.$actionId)
  const timeID = window.setInterval(() => {
    runActionWithExecutionResult(action)
  }, (config.advancedConfig.periodInterval as unknown as number) * 1000)
  actionIDMapTimerID[action.$actionId] = timeID
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
