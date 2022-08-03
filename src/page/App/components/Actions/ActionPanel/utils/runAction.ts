import {
  ActionContent,
  ActionItem,
  Transformer,
} from "@/redux/currentApp/action/actionState"
import store from "@/store"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"
import {
  isDynamicString,
  wrapFunctionCode,
} from "@/utils/evaluateDynamicString/utils"
import { Api } from "@/api/base"
import { getAppId } from "@/redux/currentApp/appInfo/appInfoSelector"
import { runEventHandler } from "@/utils/eventHandlerHelper"
import { BUILDER_CALC_CONTEXT } from "@/page/App/context/globalDataProvider"
import { MysqlAction } from "@/redux/currentApp/action/mysqlAction"
import { Message } from "@illa-design/message"
import {
  BodyContent,
  RestApiAction,
} from "@/redux/currentApp/action/restapiAction"
import { isObject } from "@/utils/typeHelper"
import { dependenciesActions } from "@/redux/currentApp/executionTree/dependencies/dependenciesSlice"

export const actionDisplayNameMapFetchResult: Record<string, any> = {}

function calcRealContent(content: Record<string, any>) {
  let realContent: Record<string, any> = {}
  for (let key in content) {
    // @ts-ignore
    const value = content[key]
    if (Array.isArray(value)) {
      realContent[key] = value.map((item) => {
        return calcRealContent(item)
      })
    }
    if (isObject(value)) {
      realContent[key] = calcRealContent(value)
    }
    if (isDynamicString(value)) {
      try {
        realContent[key] = evaluateDynamicString(
          "",
          value,
          BUILDER_CALC_CONTEXT,
        )
      } catch (e) {
        Message.error(`maybe run error`)
      }
    } else {
      realContent[key] = value
    }
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

const fetchActionResult = (
  resourceId: string,
  actionType: string,
  displayName: string,
  appId: string,
  actionId: string,
  actionContent: MysqlAction | RestApiAction<BodyContent>,
  successEvent: any[] = [],
  failedEvent: any[] = [],
  transformer: Transformer,
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
    (data) => {
      // @ts-ignore
      //TODO: @aruseito not use any
      const rawData = data.data.Rows
      let calcResult = runTransformer(transformer, rawData)
      resultCallback?.(calcResult, false)
      actionDisplayNameMapFetchResult[displayName] = calcResult
      store.dispatch(dependenciesActions.startCalcReducer())
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
      Message.error("not online")
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

export const runAction = (
  action: ActionItem<ActionContent>,
  resultCallback?: (data: unknown, error: boolean) => void,
) => {
  const { content, actionId, resourceId, displayName, actionType } = action
  if (!content) return
  const rootState = store.getState()
  const appId = getAppId(rootState)
  if (actionType === "mysql" || actionType === "restapi") {
    const { content, transformer } = action as ActionItem<
      MysqlAction | RestApiAction<BodyContent>
    >
    const { successEvent, failedEvent, ...restContent } = content
    const realContent: Record<string, any> = calcRealContent(restContent)
    const realSuccessEvent: any[] = getRealEventHandler(successEvent)
    const realFailedEvent: any[] = getRealEventHandler(failedEvent)
    fetchActionResult(
      resourceId || "",
      actionType,
      displayName,
      appId,
      actionId,
      realContent as MysqlAction | RestApiAction<BodyContent>,
      realSuccessEvent,
      realFailedEvent,
      transformer,
      resultCallback,
    )
  }
}
