import { AxiosResponse } from "axios"
import { createMessage, isNumber, isString } from "@illa-design/react"
import { ILLAApiError } from "@/api/http"
import { GUIDE_DEFAULT_ACTION_ID } from "@/config/guide"
import i18n from "@/i18n/config"
import { isFileOversize } from "@/page/App/components/Actions/ActionPanel/utils/calculateFileSize"
import { getIsILLAGuideMode } from "@/redux/config/configSelector"
import {
  ActionContent,
  ActionItem,
  ActionRunResult,
  ActionType,
  Transformer,
} from "@/redux/currentApp/action/actionState"
import { Events } from "@/redux/currentApp/action/actionState"
import { CouchDBActionStructParamsDataTransferType } from "@/redux/currentApp/action/couchDBAction"
import { DynamoActionStructParamsDataTransferType } from "@/redux/currentApp/action/dynamoDBAction"
import {
  AuthActionTypeValue,
  FirestoreActionTypeValue,
  ServiceTypeValue,
} from "@/redux/currentApp/action/firebaseAction"
import { GoogleSheetDataTypeTransform } from "@/redux/currentApp/action/googleSheetsAction"
import {
  BooleanTypes,
  BooleanValueMap,
} from "@/redux/currentApp/action/huggingFaceAction"
import { MysqlLikeAction } from "@/redux/currentApp/action/mysqlLikeAction"
import {
  BodyContent,
  RestApiAction,
} from "@/redux/currentApp/action/restapiAction"
import {
  ClientS3,
  S3Action,
  S3ActionRequestType,
  S3ActionTypeContent,
} from "@/redux/currentApp/action/s3Action"
import { SMPTAction } from "@/redux/currentApp/action/smtpAction"
import { getAppId } from "@/redux/currentApp/appInfo/appInfoSelector"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { Params } from "@/redux/resource/restapiResource"
import { fetchActionRunResult, fetchS3ActionRunResult } from "@/services/action"
import store from "@/store"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"
import { wrapFunctionCode } from "@/utils/evaluateDynamicString/utils"
import { runEventHandler } from "@/utils/eventHandlerHelper"
import { ILLAEditorRuntimePropsCollectorInstance } from "@/utils/executionTreeHelper/runtimePropsCollector"
import { downloadSingleFile } from "@/utils/file"
import { isILLAAPiError, isObject } from "@/utils/typeHelper"

export const actionDisplayNameMapFetchResult: Record<string, any> = {}

const message = createMessage()

function runTransformer(transformer: Transformer, rawData: any) {
  let calcResult: any = rawData
  if (transformer?.enable) {
    const evaluateTransform = wrapFunctionCode(transformer.rawData)
    const canEvalString = `{{${evaluateTransform}()}}`
    const finalContext =
      ILLAEditorRuntimePropsCollectorInstance.getGlobalCalcContext({
        data: rawData,
      })
    try {
      calcResult = evaluateDynamicString("events", canEvalString, finalContext)
    } catch (e) {
      console.log(e)
    }
  }
  return calcResult
}

const transformRawData = (rawData: unknown, actionType: ActionType) => {
  switch (actionType) {
    case "graphql":
    case "restapi": {
      if (Array.isArray(rawData) && rawData.length === 1) {
        return rawData[0]
      }
      return rawData
    }
    default:
      return rawData
  }
}

const calculateFetchResultDisplayName = (
  actionType: ActionType,
  displayName: string,
  rawData: any,
  transformer: Transformer,
) => {
  const isRestApi = actionType === "restapi"
  const realData = isRestApi ? rawData?.data : rawData
  const transRawData = transformRawData(realData, actionType)
  let calcResult = runTransformer(transformer, transRawData)
  actionDisplayNameMapFetchResult[displayName] = calcResult
  store.dispatch(
    executionActions.updateExecutionByDisplayNameReducer({
      displayName: displayName,
      value: {
        data: calcResult,
        runResult: undefined,
        isRunning: false,
        endTime: new Date().getTime(),
      },
    }),
  )
}

const runAllEventHandler = (events: any[] = []) => {
  const finalContext =
    ILLAEditorRuntimePropsCollectorInstance.getGlobalCalcContext()
  events.forEach((scriptObj) => {
    runEventHandler(scriptObj, finalContext)
  })
}

const fetchS3ClientResult = async (
  presignData: Record<string, any>[],
  actionType: ActionType,
  displayName: string,
  actionContent: Record<string, any>,
  successEvent: any[] = [],
  failedEvent: any[] = [],
  transformer: Transformer,
) => {
  const urlInfos = presignData as { key: string; url: string; acl?: string }[]
  try {
    if (!urlInfos.length) {
      return Promise.reject("presignedURL is undefined")
    }
    const headers = {
      "Content-Encoding": "compress",
      Authorization: "",
    }
    let result
    const { commands } = actionContent
    switch (commands) {
      case S3ActionRequestType.READ_ONE:
        const readURL = urlInfos[0].url
        const response = await fetchS3ActionRunResult(readURL, "GET", headers)

        const { request: _readReq, config: _readConf, ...readRes } = response
        result = {
          ...readRes,
        }
        break
      case S3ActionRequestType.DOWNLOAD_ONE:
        const url = urlInfos[0].url
        let downloadCommandArgs = actionContent.commandArgs
        const downloadResponse = await fetchS3ActionRunResult(
          url,
          "GET",
          headers,
        )
        const contentType =
          downloadResponse.headers["content-type"].split(";")[0] ?? ""
        downloadSingleFile(
          contentType,
          downloadCommandArgs.objectKey,
          downloadResponse.data || "",
        )
        const {
          request: _downloadReq,
          config: _downloadConf,
          ...downloadRes
        } = downloadResponse
        result = {
          ...downloadRes,
        }
        break
      case S3ActionRequestType.UPLOAD:
        let uploadCommandArgs = actionContent.commandArgs
        const uploadUrl = urlInfos[0].url
        const uploadResponse = await fetchS3ActionRunResult(
          uploadUrl,
          "PUT",
          {
            ...headers,
            "x-amz-acl": urlInfos[0].acl ?? "public-read",
          },
          uploadCommandArgs.objectData,
        )
        const {
          request: _uploadReq,
          config: _uploadConf,
          ...uploadRes
        } = uploadResponse
        result = {
          ...uploadRes,
        }
        break
      case S3ActionRequestType.UPLOAD_MULTIPLE:
        const multipleCommandArgs = actionContent.commandArgs
        const { objectDataList } = multipleCommandArgs
        let requests: any[] = []
        urlInfos.forEach((data, index) => {
          requests.push(
            fetchS3ActionRunResult(
              data.url,
              "PUT",
              {
                ...headers,
                "x-amz-acl": data.acl ?? "public-read",
              },
              objectDataList[index],
            ),
          )
        })
        const res = await Promise.all(requests)
        result = res.map((response) => {
          const { request: _request, config: _config, ...others } = response
          return others
        })
        break
    }
    calculateFetchResultDisplayName(
      actionType,
      displayName,
      result,
      transformer,
    )
    const realSuccessEvent: any[] = successEvent || []

    runAllEventHandler(realSuccessEvent)
  } catch (e) {
    store.dispatch(
      executionActions.updateExecutionByDisplayNameReducer({
        displayName: displayName,
        value: {
          isRunning: false,
          endTime: new Date().getTime(),
        },
      }),
    )
    const realFailedEvent: any[] = failedEvent || []
    runAllEventHandler(realFailedEvent)
  }
}

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
  return await fetchActionRunResult(appId, actionId, requestBody, isPublic)
}

const getAppwriteFilterValue = (value: string) => {
  const val = value.trim().replace(/^\[|\]$/g, "")
  return `[${val.split(",").map((v) => `"${v.trim()}"`)}]`
}

const transformDataFormat = (
  actionType: ActionType,
  contents: Record<string, any>,
) => {
  switch (actionType) {
    case "smtp": {
      const { attachment } = contents
      if (Array.isArray(attachment)) {
        return {
          ...contents,
          attachment: attachment.map((value) => ({
            ...value,
            data: btoa(encodeURIComponent(value.data || "")),
          })),
        }
      } else if (attachment) {
        return {
          ...contents,
          attachment: [btoa(encodeURIComponent(attachment || ""))],
        }
      }
      return contents
    }
    case "restapi": {
      if (contents.bodyType === "raw" && contents.body?.content) {
        return {
          ...contents,
          body: {
            ...contents.body,
            content: JSON.stringify(contents.body.content),
          },
        }
      }
      return contents
    }
    case "firebase":
      const { service, operation } = contents
      if (
        service === ServiceTypeValue.AUTH &&
        operation === AuthActionTypeValue.LIST_USERS
      ) {
        const { number = "", ...others } = contents.options
        return {
          ...contents,
          options: {
            ...others,
            ...(number !== "" && { number }),
          },
        }
      }
      if (
        service === ServiceTypeValue.FIRESTORE &&
        (operation === FirestoreActionTypeValue.QUERY_FIREBASE ||
          operation === FirestoreActionTypeValue.QUERY_COLLECTION_GROUP)
      ) {
        const { limit = "", ...others } = contents.options
        return {
          ...contents,
          options: {
            ...others,
            ...(limit !== "" && { limit }),
          },
        }
      }
      return contents
    case "graphql": {
      return {
        ...contents,
        query: contents.query.replace(/\n/g, ""),
      }
    }
    case "huggingface":
    case "hfendpoint":
      const isEndpoint = actionType === "hfendpoint"
      const { modelID, detailParams, ...otherParams } = contents
      const { type, content } = otherParams.inputs || {}
      let newInputs = { type, content }
      if (type === "json") {
        if (isString(content)) {
          try {
            newInputs = {
              type,
              content: JSON.parse(content),
            }
          } catch (e) {
            console.log(e)
          }
        }
      }
      const keys = Object.keys(detailParams)
      const realDetailParams = keys.map((key: string) => {
        const currentValue = detailParams[key]
        return {
          key,
          value: currentValue
            ? BooleanTypes.includes(key)
              ? BooleanValueMap[currentValue as keyof typeof BooleanValueMap] ??
                currentValue
              : parseFloat(currentValue)
            : "",
        }
      })
      return {
        ...(!isEndpoint && { modelID }),
        params: {
          withDetailParams: otherParams.withDetailParams,
          inputs: newInputs,
          detailParams: realDetailParams,
        },
      }
    case "dynamodb":
      const { structParams } = contents
      let newStructParams = { ...structParams }
      Object.keys(DynamoActionStructParamsDataTransferType).forEach((key) => {
        const value = DynamoActionStructParamsDataTransferType[key]
        if (structParams[key] === "") {
          newStructParams[key] = value
        }
      })
      return {
        ...contents,
        structParams: newStructParams,
      }
    case "couchdb":
      const { opts } = contents
      let newOpts = { ...opts }
      Object.keys(CouchDBActionStructParamsDataTransferType).forEach((key) => {
        const value = CouchDBActionStructParamsDataTransferType[key]
        if (newOpts[key] === "") {
          newOpts[key] = value
        }
      })
      return {
        ...contents,
        opts: newOpts,
      }
    case "appwrite":
      const { method: appwriteMethod, opts: appwriteOpts } = contents
      if (appwriteMethod === "list") {
        const { orderBy = [], filter = [], limit = 100 } = appwriteOpts
        return {
          ...contents,
          opts: {
            ...appwriteOpts,
            orderBy: orderBy.map(({ key, ...others }: Params) => ({
              ...others,
              attribute: key,
            })),
            filter: filter.map(({ key, value, ...others }: Params) => ({
              ...others,
              value: getAppwriteFilterValue(value),
              attribute: key,
            })),
            limit: isNumber(limit) ? limit : 100,
          },
        }
      }
      const { data, ...other } = appwriteOpts
      const showData = !["get", "delete"].includes(appwriteMethod)
      return {
        ...contents,
        opts: {
          ...other,
          ...(showData && { data: isObject(data) ? data : {} }),
        },
      }
    case "googlesheets": {
      const { opts: googleOpts } = contents
      const googleSheetsTransformKeys = Object.keys(
        GoogleSheetDataTypeTransform,
      )
      const newGoogleSheetOpts = { ...googleOpts }
      googleSheetsTransformKeys.forEach((key) => {
        const value =
          GoogleSheetDataTypeTransform[
            key as keyof typeof GoogleSheetDataTypeTransform
          ]
        if (newGoogleSheetOpts[key] === "") {
          newGoogleSheetOpts[key] = value
        }
      })
      return {
        ...contents,
        opts: newGoogleSheetOpts,
      }
    }
    default:
      return contents
  }
}

const successHandler = (
  actionType: ActionType,
  displayName: string,
  actionContent: ActionContent,
  data: AxiosResponse<ActionRunResult>,
  successEvent: any[],
  failedEvent: any[],
  transformer: any,
) => {
  const isS3ActionType = actionType === "s3"
  const isClientS3 =
    isS3ActionType &&
    ClientS3.includes((actionContent as S3Action<S3ActionTypeContent>).commands)
  if (isClientS3) {
    fetchS3ClientResult(
      data.data.Rows,
      actionType,
      displayName,
      actionContent,
      successEvent,
      failedEvent,
      transformer,
    )
    return
  }
  // @ts-ignore
  //TODO: @aruseito not use any
  const rawData = data.data.Rows
  const { headers, status } = data
  const isRestApi = actionType === "restapi"
  const paramsData = !isRestApi
    ? rawData
    : {
        data: !rawData.length ? data.data?.Extra?.body : rawData,
        extraData: { headers, status },
      }

  calculateFetchResultDisplayName(
    actionType,
    displayName,
    paramsData,
    transformer,
  )
  const realSuccessEvent: any[] = successEvent || []

  runAllEventHandler(realSuccessEvent)
}
const failureHandler = (
  displayName: string,
  failedEvent: any[],
  res?: AxiosResponse<ILLAApiError>,
) => {
  let runResult = {
    error: true,
    message: res?.data?.errorMessage || "An unknown error",
  }
  const realSuccessEvent: any[] = failedEvent || []
  runAllEventHandler(realSuccessEvent)
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
}

interface IExecutionActions extends ActionItem<ActionContent> {
  $actionId: string
  $resourceId: string
}

// need refactor & apps/builder/src/page/App/components/Actions/ActionPanel/utils/runAction.ts also need refactor
export const runActionWithExecutionResult = async (
  action: ActionItem<ActionContent>,
) => {
  const { displayName } = action as ActionItem<
    MysqlLikeAction | RestApiAction<BodyContent>
  >
  const finalContext =
    ILLAEditorRuntimePropsCollectorInstance.getGlobalCalcContext()
  const realAction = finalContext[displayName] as IExecutionActions
  const { content, $actionId, $resourceId, actionType, transformer } =
    realAction
  if (!content) return Promise.reject(false)
  const rootState = store.getState()
  const appId = getAppId(rootState)
  const isGuideMode = getIsILLAGuideMode(rootState)
  const {
    successEvent = [],
    failedEvent = [],
    ...restContent
  } = content as ActionContent & Events
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
      },
    }),
  )
  const currentActionId = (
    isGuideMode ? GUIDE_DEFAULT_ACTION_ID : $actionId
  ) as string

  try {
    const response = await fetchActionResult(
      action.config?.public || false,
      ($resourceId as string) || "",
      actionType as ActionType,
      displayName,
      appId,
      currentActionId,
      actionContent,
    )
    successHandler(
      actionType,
      displayName,
      actionContent,
      response,
      successEvent,
      failedEvent,
      transformer,
    )
    return Promise.resolve(true)
  } catch (e) {
    if (isILLAAPiError(e)) {
      failureHandler(displayName, failedEvent, e)
      return Promise.reject(false)
    }
    failureHandler(displayName, failedEvent)
    return Promise.reject(false)
  }
}

export const runActionWithDelay = (action: ActionItem<ActionContent>) => {
  const { config } = action
  if (!config || !config.advancedConfig) {
    runActionWithExecutionResult(action)
    return
  }
  const { advancedConfig } = config
  const { delayWhenLoaded } = advancedConfig
  return new Promise((resolve, reject) => {
    const timeoutID = window.setTimeout(async () => {
      const result = await runActionWithExecutionResult(action)
      window.clearTimeout(timeoutID)
      if (result) {
        resolve(result)
      } else {
        reject(result)
      }
    }, delayWhenLoaded as unknown as number)
  })
}

const actionIDMapTimerID: Record<string, number> = {}

export const registerActionPeriod = (action: ActionItem<ActionContent>) => {
  const { config } = action
  if (
    !config ||
    !config.advancedConfig ||
    !config.advancedConfig.isPeriodically ||
    (config.advancedConfig.periodInterval as unknown as number) <= 0
  ) {
    removeActionPeriod(action.actionId)
    return
  }
  removeActionPeriod(action.actionId)
  const timeID = window.setInterval(() => {
    runActionWithExecutionResult(action)
  }, (config.advancedConfig.periodInterval as unknown as number) * 1000)
  actionIDMapTimerID[action.actionId] = timeID
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
