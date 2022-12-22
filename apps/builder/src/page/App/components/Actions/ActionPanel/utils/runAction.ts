import { createMessage } from "@illa-design/react"
import { Api } from "@/api/base"
import { BUILDER_CALC_CONTEXT } from "@/page/App/context/globalDataProvider"
import {
  ActionContent,
  ActionItem,
  ActionRunResult,
  Events,
  Transformer,
} from "@/redux/currentApp/action/actionState"
import { MysqlLikeAction } from "@/redux/currentApp/action/mysqlLikeAction"
import {
  BodyContent,
  RestApiAction,
} from "@/redux/currentApp/action/restapiAction"
import { S3ActionRequestType } from "@/redux/currentApp/action/s3Action"
import { getAppId } from "@/redux/currentApp/appInfo/appInfoSelector"
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
  AuthActionTypeValue,
  FirestoreActionTypeValue,
  ServiceTypeValue,
} from "@/redux/currentApp/action/firebaseAction"

export const actionDisplayNameMapFetchResult: Record<string, any> = {}

const message = createMessage()

export const calcRealContent = (content: Record<string, any>) => {
  let realContent: Record<string, any> = {}
  if (Array.isArray(content)) {
    realContent = content.map((item) => {
      if (isDynamicString(item)) {
        try {
          return evaluateDynamicString("", item, BUILDER_CALC_CONTEXT)
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
          realContent[key] = evaluateDynamicString(
            "",
            value,
            BUILDER_CALC_CONTEXT,
          )
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

const downloadActionResult = (
  contentType: string,
  fileName: string,
  data: string,
) => {
  const a = document.createElement("a")
  a.download = fileName
  a.style.display = "none"
  a.href = `data:${contentType};base64,${data}`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

const fetchActionResult = (
  resourceId: string,
  actionType: string,
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
  Api.request(
    {
      method: "POST",
      url: `apps/${appId}/actions/${actionId}/run`,
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
      const extraData = data.data?.Extra
      if (extraData && extraData.Download) {
        const { ContentType, ObjectKey } = extraData
        downloadActionResult(ContentType, ObjectKey, rawData[0].objectData)
      }

      let calcResult = runTransformer(transformer, rawData)
      resultCallback?.(calcResult, false)
      actionDisplayNameMapFetchResult[displayName] = calcResult
      if (!isTrigger) {
        store.dispatch(executionActions.startExecutionReducer())
      }
      successEvent.forEach((scriptObj) => {
        runEventHandler(scriptObj, BUILDER_CALC_CONTEXT)
      })
    },
    (res) => {
      resultCallback?.(res.data, true)
      failedEvent.forEach((scriptObj) => {
        runEventHandler(scriptObj, BUILDER_CALC_CONTEXT)
      })
    },
    (res) => {
      resultCallback?.(res, true)
      failedEvent.forEach((scriptObj) => {
        runEventHandler(scriptObj, BUILDER_CALC_CONTEXT)
      })
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
  content: Record<string, any>,
) => {
  switch (actionType) {
    case "s3": {
      const { commands, commandArgs } = content
      if (commands === S3ActionRequestType.UPLOAD) {
        const { objectData } = commandArgs
        return {
          ...content,
          commandArgs: {
            ...content.commandArgs,
            objectData: btoa(encodeURIComponent(objectData)),
          },
        }
      }
      if (commands === S3ActionRequestType.UPLOAD_MULTIPLE) {
        const { objectDataList = [] } = commandArgs
        if (Array.isArray(objectDataList)) {
          return {
            ...content,
            commandArgs: {
              ...content.commandArgs,
              objectDataList: objectDataList.map((value: string) =>
                btoa(encodeURIComponent(value)),
              ),
            },
          }
        }
        return {
          ...content,
          commandArgs: {
            ...content.commandArgs,
            objectDataList: [btoa(encodeURIComponent(objectDataList) || "")],
          },
        }
      }
      return content
    }
    case "smtp": {
      const { attachment } = content
      if (Array.isArray(attachment)) {
        return {
          ...content,
          attachment: attachment.map((value) => ({
            ...value,
            data: btoa(encodeURIComponent(value.data || "")),
          })),
        }
      } else if (attachment) {
        return {
          ...content,
          attachment: [btoa(encodeURIComponent(attachment || ""))],
        }
      }
      return content
    }
    case "restapi": {
      if (content.bodyType === "raw" && content.body?.content) {
        return {
          ...content,
          body: {
            ...content.body,
            content: JSON.stringify(content.body.content),
          },
        }
      }
      return content
    }
    case "firebase":
      const { service, operation } = content
      if (
        service === ServiceTypeValue.AUTH &&
        operation === AuthActionTypeValue.LIST_USERS
      ) {
        const { number = "", ...others } = content.options
        return {
          ...content,
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
        const { limit = "", ...others } = content.options
        return {
          ...content,
          options: {
            ...others,
            ...(limit !== "" && { limit }),
          },
        }
      }
      return content
    case "graphql": {
      return {
        ...content,
        query: content.query.replace(/\n/g, ""),
      }
    }
    default:
      return content
  }
}

export const runAction = (
  action: ActionItem<ActionContent>,
  resultCallback?: (data: unknown, error: boolean) => void,
  isTrigger: boolean = false,
) => {
  const { content, actionId, resourceId, displayName, actionType } = action
  if (!content) return
  const rootState = store.getState()
  const appId = getAppId(rootState)
  if (actionType !== "transformer") {
    const { content, transformer } = action as ActionItem<
      MysqlLikeAction | RestApiAction<BodyContent>
    >
    const { successEvent, failedEvent, ...restContent } = content
    const realContent: Record<string, any> = isTrigger
      ? restContent
      : calcRealContent(restContent)
    const realSuccessEvent: any[] = isTrigger
      ? successEvent || []
      : getRealEventHandler(successEvent)
    const realFailedEvent: any[] = isTrigger
      ? failedEvent || []
      : getRealEventHandler(failedEvent)
    const actionContent = transformDataFormat(
      actionType,
      realContent,
    ) as ActionContent
    fetchActionResult(
      resourceId || "",
      actionType,
      displayName,
      appId,
      actionId,
      actionContent,
      realSuccessEvent,
      realFailedEvent,
      transformer,
      isTrigger,
      resultCallback,
    )
  }
}
