import { AxiosError, AxiosResponse } from "axios"
import { get } from "lodash"
import { createMessage, isNumber, isString } from "@illa-design/react"
import { ActionApi, Api, ApiError } from "@/api/base"
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
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { Params } from "@/redux/resource/restapiResource"
import store from "@/store"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"
import {
  isDynamicString,
  wrapFunctionCode,
} from "@/utils/evaluateDynamicString/utils"
import { runEventHandler } from "@/utils/eventHandlerHelper"
import { ILLAEditorRuntimePropsCollectorInstance } from "@/utils/executionTreeHelper/runtimePropsCollector"
import { downloadSingleFile } from "@/utils/file"
import { isObject } from "@/utils/typeHelper"

export const actionDisplayNameMapFetchResult: Record<string, any> = {}

const message = createMessage()

export const calcRealContent = (content: Record<string, any>) => {
  let realContent: Record<string, any> = {}
  const rootState = store.getState()
  const executionResult = getExecutionResult(rootState)
  if (Array.isArray(content)) {
    realContent = content.map((item) => {
      if (isDynamicString(item)) {
        try {
          return evaluateDynamicString("", item, executionResult)
        } catch (e) {
          message.error({
            content: `maybe run error`,
          })
        }
      } else {
        return calcRealContent(item)
      }
    })
  } else if (isObject(content)) {
    for (let key in content) {
      const value = content[key]
      if (isDynamicString(value)) {
        try {
          realContent[key] = evaluateDynamicString("", value, executionResult)
        } catch (e) {
          message.error({
            content: `maybe run error`,
          })
        }
      } else {
        realContent[key] = calcRealContent(value)
      }
    }
  } else {
    realContent = content
  }
  return realContent
}

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
  isTrigger: boolean,
  rawData: any,
  transformer: Transformer,
  resultCallback?: (data: unknown, error: boolean) => void,
  actionCommand?: string,
) => {
  const isRestApi = actionType === "restapi"
  const realData = isRestApi ? rawData?.data : rawData
  const transRawData = transformRawData(realData, actionType)
  let calcResult = runTransformer(transformer, transRawData)
  let data = calcResult
  if (isRestApi) {
    data = { result: calcResult, extraData: rawData?.extraData }
  }
  resultCallback?.(data, false)
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
  resourceId: string,
  actionType: ActionType,
  displayName: string,
  actionContent: Record<string, any>,
  successEvent: any[] = [],
  failedEvent: any[] = [],
  transformer: Transformer,
  isTrigger: boolean,
  resultCallback?: (data: unknown, error: boolean) => void,
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
        const response = await Api.asyncRequest({
          url: readURL,
          method: "GET",
          headers,
        })
        const { request: readReq, config: readConf, ...readRes } = response
        result = {
          ...readRes,
        }
        break
      case S3ActionRequestType.DOWNLOAD_ONE:
        const url = urlInfos[0].url
        let downloadCommandArgs = actionContent.commandArgs
        const downloadResponse = await Api.asyncRequest<string>({
          url,
          method: "GET",
          headers,
        })
        const contentType =
          downloadResponse.headers["content-type"].split(";")[0] ?? ""
        downloadSingleFile(
          contentType,
          downloadCommandArgs.objectKey,
          downloadResponse.data || "",
        )
        const {
          request: downloadReq,
          config: downloadConf,
          ...downloadRes
        } = downloadResponse
        result = {
          ...downloadRes,
        }
        break
      case S3ActionRequestType.UPLOAD:
        let uploadCommandArgs = actionContent.commandArgs
        const uploadUrl = urlInfos[0].url
        const uploadResponse = await Api.asyncRequest({
          url: uploadUrl,
          method: "PUT",
          data: uploadCommandArgs.objectData,
          headers: {
            ...headers,
            "x-amz-acl": urlInfos[0].acl ?? "public-read",
          },
        })
        const {
          request: uploadReq,
          config: uploadConf,
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
            Api.asyncRequest({
              url: data.url,
              method: "PUT",
              data: objectDataList[index],
              headers: {
                ...headers,
                "x-amz-acl": data.acl ?? "public-read",
              },
            }),
          )
        })
        const res = await Promise.all(requests)
        result = res.map((response) => {
          const { request, config, ...others } = response
          return others
        })
        break
    }
    calculateFetchResultDisplayName(
      actionType,
      displayName,
      isTrigger,
      result,
      transformer,
      resultCallback,
      commands,
    )
    const realSuccessEvent: any[] = isTrigger
      ? successEvent || []
      : getRealEventHandler(successEvent)

    runAllEventHandler(realSuccessEvent)
  } catch (e) {
    resultCallback?.(e, true)
    store.dispatch(
      executionActions.updateExecutionByDisplayNameReducer({
        displayName: displayName,
        value: {
          isRunning: false,
          endTime: new Date().getTime(),
        },
      }),
    )
    const realFailedEvent: any[] = isTrigger
      ? failedEvent || []
      : getRealEventHandler(failedEvent)
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

const fetchActionResult = (
  isPublic: boolean,
  resourceId: string,
  actionType: ActionType,
  displayName: string,
  appId: string,
  actionId: string,
  actionContent: ActionContent,
  successEvent: any[] = [],
  failedEvent: any[] = [],
  transformer: Transformer,
  isTrigger: boolean,
  resultCallback?: (data: unknown, error: boolean) => void,
) => {
  const success = (data: ActionRunResult) => {
    const isS3ActionType = actionType === "s3"
    const isClientS3 =
      isS3ActionType &&
      ClientS3.includes(
        (actionContent as S3Action<S3ActionTypeContent>).commands,
      )
    if (isClientS3) {
      fetchS3ClientResult(
        data.data.Rows,
        resourceId || "",
        actionType,
        displayName,
        actionContent,
        successEvent,
        failedEvent,
        transformer,
        isTrigger,
        resultCallback,
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
      isTrigger,
      paramsData,
      transformer,
      resultCallback,
    )
    const realSuccessEvent: any[] = isTrigger
      ? successEvent || []
      : getRealEventHandler(successEvent)

    runAllEventHandler(realSuccessEvent)
  }
  const failure = (res: AxiosResponse<ApiError>) => {
    let runResult = {
      error: true,
      message: res?.data?.errorMessage || "An unknown error",
    }
    resultCallback?.(res.data, true)
    const realSuccessEvent: any[] = isTrigger
      ? failedEvent || []
      : getRealEventHandler(failedEvent)
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
  const crash = (res: AxiosError) => {
    resultCallback?.(res, true)
    const realSuccessEvent: any[] = isTrigger
      ? failedEvent || []
      : getRealEventHandler(failedEvent)
    runAllEventHandler(realSuccessEvent)
    message.error({
      content: "not online",
    })
    store.dispatch(
      executionActions.updateExecutionByDisplayNameReducer({
        displayName: displayName,
        value: {
          data: undefined,
          runResult: {
            error: true,
            message: "An unknown error",
          },
          isRunning: false,
          endTime: new Date().getTime(),
        },
      }),
    )
  }

  const canSendRequest = checkCanSendRequest(actionType, actionContent)
  if (!canSendRequest) {
    return
  }

  if (isPublic) {
    ActionApi.teamIdentifierRequest(
      {
        method: "POST",
        url: `/apps/${appId}/publicActions/${actionId}/run`,
        data: {
          resourceId,
          actionType,
          displayName,
          content: actionContent,
        },
      },
      success,
      failure,
      crash,
    )
  } else {
    ActionApi.teamRequest(
      {
        method: "POST",
        url: `/apps/${appId}/actions/${actionId}/run`,
        data: {
          resourceId,
          actionType,
          displayName,
          content: actionContent,
        },
      },
      success,
      failure,
      crash,
    )
  }
}

function getRealEventHandler(eventHandler?: any[]) {
  const realEventHandler: any[] = []
  eventHandler?.map((item) => {
    const event: Record<string, any> = calcRealContent(item)
    realEventHandler.push(event)
  })
  return realEventHandler
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

export const runAction = (
  action: ActionItem<ActionContent>,
  resultCallback?: (data: unknown, error: boolean) => void,
  isTrigger: boolean = false,
) => {
  const {
    content,
    actionId,
    resourceId,
    displayName,
    actionType,
    transformer,
  } = action as ActionItem<MysqlLikeAction | RestApiAction<BodyContent>>
  if (!content) return
  const rootState = store.getState()
  const appId = getAppId(rootState)
  const executionResult = getExecutionResult(rootState)
  const isGuideMode = getIsILLAGuideMode(rootState)
  const { successEvent, failedEvent, ...restContent } = content
  const realContent: Record<string, any> = isTrigger
    ? restContent
    : get(executionResult, `${displayName}.content`, restContent)
  const actionContent = transformDataFormat(
    actionType,
    realContent,
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
  const currentActionId = isGuideMode ? GUIDE_DEFAULT_ACTION_ID : actionId

  fetchActionResult(
    action.config?.public || false,
    resourceId || "",
    actionType,
    displayName,
    appId,
    currentActionId,
    actionContent,
    successEvent,
    failedEvent,
    transformer,
    isTrigger,
    resultCallback,
  )
}
