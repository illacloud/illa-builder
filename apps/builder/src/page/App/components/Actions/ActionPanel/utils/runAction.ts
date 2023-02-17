import { cloneDeep, get, merge } from "lodash"
import { createMessage, isString } from "@illa-design/react"
import { BuilderApi } from "@/api/base"
import { runActionTransformer } from "@/page/App/components/Actions/ActionPanel/utils/runActionTransformerHelper"
import { BUILDER_CALC_CONTEXT } from "@/page/App/context/globalDataProvider"
import {
  ActionContent,
  ActionItem,
  ActionRunResult,
  ActionType,
  Transformer,
} from "@/redux/currentApp/action/actionState"
import {
  AuthActionTypeValue,
  FirestoreActionTypeValue,
  ServiceTypeValue,
} from "@/redux/currentApp/action/firebaseAction"
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
  S3Action,
  S3ActionRequestType,
  S3ActionTypeContent,
} from "@/redux/currentApp/action/s3Action"
import { TransformerAction } from "@/redux/currentApp/action/transformerAction"
import { getAppId } from "@/redux/currentApp/appInfo/appInfoSelector"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import store from "@/store"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"
import {
  isDynamicString,
  wrapFunctionCode,
} from "@/utils/evaluateDynamicString/utils"
import { runEventHandler } from "@/utils/eventHandlerHelper"
import { isObject } from "@/utils/typeHelper"
import {
  ClientS3,
  downloadActionResult,
  encodeToBase64,
  s3ClientInitialMap,
} from "./clientS3"

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
    try {
      calcResult = evaluateDynamicString("events", canEvalString, {
        ...BUILDER_CALC_CONTEXT,
        data: rawData,
      })
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
      if (Array.isArray(rawData) && rawData.length > 0) {
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
  const transRawData = transformRawData(rawData, actionType)
  let calcResult = runTransformer(transformer, transRawData)
  let data = calcResult
  if (actionCommand && actionCommand === S3ActionRequestType.READ_ONE) {
    const { Body = {}, ...otherData } = calcResult
    data = { ...otherData, Body: {} }
  }
  resultCallback?.(data, false)
  actionDisplayNameMapFetchResult[displayName] = calcResult
  store.dispatch(
    executionActions.updateExecutionByDisplayNameReducer({
      displayName: displayName,
      value: {
        data: calcResult,
      },
    }),
  )
}

const runAllEventHandler = (events: any[] = []) => {
  const rootState = store.getState()
  const executionResult = getExecutionResult(rootState)
  const finalContext = merge(cloneDeep(BUILDER_CALC_CONTEXT), executionResult)
  events.forEach((scriptObj) => {
    runEventHandler(scriptObj, finalContext)
  })
}

const fetchS3ClientResult = async (
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
  try {
    let result
    const { getObject, putObject } = s3ClientInitialMap.get(resourceId)
    const { commands } = actionContent
    switch (commands) {
      case S3ActionRequestType.READ_ONE:
        let commandArgs = actionContent.commandArgs
        const res = await getObject(commandArgs.objectKey)
        result = {
          ...res,
          Body: encodeToBase64(
            (await res?.Body?.transformToByteArray()) || new Uint8Array(),
          ),
        }
        break
      case S3ActionRequestType.DOWNLOAD_ONE:
        let downloadCommandArgs = actionContent.commandArgs
        const downloadRes = await getObject(downloadCommandArgs.objectKey)
        const value = encodeToBase64(
          (await downloadRes?.Body?.transformToByteArray()) || new Uint8Array(),
        )
        downloadActionResult(
          downloadRes.ContentType || "",
          downloadCommandArgs.objectKey,
          value || "",
        )
        break
      case S3ActionRequestType.UPLOAD:
        let uploadCommandArgs = actionContent.commandArgs
        const uploadRes = await putObject(
          uploadCommandArgs.objectKey,
          uploadCommandArgs.objectData,
          uploadCommandArgs.contentType,
        )
        result = uploadRes
        break
      case S3ActionRequestType.UPLOAD_MULTIPLE:
        const multipleCommandArgs = actionContent.commandArgs
        const { contentType, objectKeyList, objectDataList } =
          multipleCommandArgs
        let requests = []
        for (let i = 0, len = objectDataList.length; i < len; i++) {
          requests.push(
            putObject(objectKeyList[i], objectDataList[i], contentType),
          )
        }
        result = await Promise.all(requests)
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
    const realFailedEvent: any[] = isTrigger
      ? failedEvent || []
      : getRealEventHandler(failedEvent)
    runAllEventHandler(realFailedEvent)
  }
}

const fetchActionResult = (
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
  BuilderApi.teamRequest(
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
    (data: ActionRunResult) => {
      // @ts-ignore
      //TODO: @aruseito not use any
      const rawData = data.data.Rows
      calculateFetchResultDisplayName(
        actionType,
        displayName,
        isTrigger,
        rawData,
        transformer,
        resultCallback,
      )
      const realSuccessEvent: any[] = isTrigger
        ? successEvent || []
        : getRealEventHandler(successEvent)

      runAllEventHandler(realSuccessEvent)
    },
    (res) => {
      resultCallback?.(res.data, true)
      const realSuccessEvent: any[] = isTrigger
        ? failedEvent || []
        : getRealEventHandler(failedEvent)
      runAllEventHandler(realSuccessEvent)
    },
    (res) => {
      resultCallback?.(res, true)
      const realSuccessEvent: any[] = isTrigger
        ? failedEvent || []
        : getRealEventHandler(failedEvent)
      runAllEventHandler(realSuccessEvent)
      message.error({
        content: "not online",
      })
    },
    (loading) => {},
  )
}

function getRealEventHandler(eventHandler?: any[]) {
  const realEventHandler: any[] = []
  eventHandler?.map((item) => {
    const event: Record<string, any> = calcRealContent(item)
    realEventHandler.push(event)
  })
  return realEventHandler
}

const transformDataFormat = (
  actionType: string,
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
        modelID,
        params: {
          withDetailParams: otherParams.withDetailParams,
          inputs: newInputs,
          detailParams: realDetailParams,
        },
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
  if (actionType === "transformer") {
    runActionTransformer(action as ActionItem<TransformerAction>)
    return
  }
  const { successEvent, failedEvent, ...restContent } = content
  const realContent: Record<string, any> = isTrigger
    ? restContent
    : get(executionResult, `${displayName}.content`, restContent)
  const actionContent = transformDataFormat(
    actionType,
    realContent,
  ) as ActionContent

  switch (actionType) {
    case "s3":
      const isClientS3 = ClientS3.includes(
        (action.content as S3Action<S3ActionTypeContent>).commands,
      )
      if (isClientS3) {
        fetchS3ClientResult(
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
      } else {
        fetchActionResult(
          resourceId || "",
          actionType,
          displayName,
          appId,
          actionId,
          actionContent,
          successEvent,
          failedEvent,
          transformer,
          isTrigger,
          resultCallback,
        )
      }
      break
    default:
      fetchActionResult(
        resourceId || "",
        actionType,
        displayName,
        appId,
        actionId,
        actionContent,
        successEvent,
        failedEvent,
        transformer,
        isTrigger,
        resultCallback,
      )
  }
}
