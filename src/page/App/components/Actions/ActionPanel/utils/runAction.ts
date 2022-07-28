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
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import {
  BodyContent,
  RestApiAction,
} from "@/redux/currentApp/action/restapiAction"

export const runMysql = (
  resourceId: string,
  actionType: string,
  displayName: string,
  appId: string,
  actionId: string,
  actionContent: MysqlAction,
  successEvent: any[] = [],
  failedEvent: any[] = [],
  transformer: Transformer,
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
      let calcResult = rawData
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
      store.dispatch(
        actionActions.updateActionItemResultReducer({
          displayName,
          data: calcResult,
        }),
      )
      successEvent.forEach((scriptObj) => {
        runEventHandler(scriptObj, BUILDER_CALC_CONTEXT)
      })
    },
    (res) => {
      failedEvent.forEach((scriptObj) => {
        runEventHandler(scriptObj, BUILDER_CALC_CONTEXT)
      })
    },
    () => {
      Message.error("not online")
    },
    (loading) => {},
  )
}

export const runAction = (action: ActionItem<ActionContent>) => {
  const { content, actionId, resourceId, displayName, actionType } = action
  if (!content) return
  const rootState = store.getState()
  const appId = getAppId(rootState)

  switch (actionType) {
    case "mysql": {
      const { content, transformer } = action as ActionItem<MysqlAction>
      const { successEvent, failedEvent, ...restContent } = content
      const realContent: Record<string, any> = {}
      for (let key in restContent) {
        // @ts-ignore
        const value = restContent[key]
        if (isDynamicString(value)) {
          const calcResult = evaluateDynamicString(
            "",
            value,
            BUILDER_CALC_CONTEXT,
          )
          realContent[key] = calcResult
        } else {
          realContent[key] = value
        }
      }

      const realSuccessEvent: any[] = []

      successEvent?.map((item) => {
        const event: Record<string, any> = {}
        for (let key in item) {
          // @ts-ignore
          const value = item[key]
          if (isDynamicString(value)) {
            const calcResult = evaluateDynamicString(
              "",
              value,
              BUILDER_CALC_CONTEXT,
            )
            event[key] = calcResult
          } else {
            event[key] = value
          }
        }
        realSuccessEvent.push(event)
      })

      const realFailedEvent: any[] = []
      failedEvent?.map((item) => {
        const event: Record<string, any> = {}
        for (let key in item) {
          // @ts-ignore
          const value = item[key]
          if (isDynamicString(value)) {
            const calcResult = evaluateDynamicString(
              "",
              value,
              BUILDER_CALC_CONTEXT,
            )
            event[key] = calcResult
          } else {
            event[key] = value
          }
        }
        realFailedEvent.push(event)
      })

      runMysql(
        resourceId || "",
        actionType,
        displayName,
        appId,
        actionId,
        realContent as MysqlAction,
        realSuccessEvent,
        realFailedEvent,
        transformer,
      )
      break
    }
    case "restapi": {
      const { content, transformer } = action as ActionItem<
        RestApiAction<BodyContent>
      >
      const { successEvent, failedEvent, ...restContent } = content
      const realContent: Record<string, any> = {}
      for (let key in restContent) {
        // @ts-ignore
        const value = restContent[key]
        if (isDynamicString(value)) {
          const calcResult = evaluateDynamicString(
            "",
            value,
            BUILDER_CALC_CONTEXT,
          )
          realContent[key] = calcResult
        } else {
          realContent[key] = value
        }
      }

      const realSuccessEvent: any[] = []

      successEvent?.map((item) => {
        const event: Record<string, any> = {}
        for (let key in item) {
          // @ts-ignore
          const value = item[key]
          if (isDynamicString(value)) {
            const calcResult = evaluateDynamicString(
              "",
              value,
              BUILDER_CALC_CONTEXT,
            )
            event[key] = calcResult
          } else {
            event[key] = value
          }
        }
        realSuccessEvent.push(event)
      })

      const realFailedEvent: any[] = []
      failedEvent?.map((item) => {
        const event: Record<string, any> = {}
        for (let key in item) {
          // @ts-ignore
          const value = item[key]
          if (isDynamicString(value)) {
            const calcResult = evaluateDynamicString(
              "",
              value,
              BUILDER_CALC_CONTEXT,
            )
            event[key] = calcResult
          } else {
            event[key] = value
          }
        }
        realFailedEvent.push(event)
      })

      runMysql(
        resourceId || "",
        actionType,
        displayName,
        appId,
        actionId,
        realContent as MysqlAction,
        realSuccessEvent,
        realFailedEvent,
        transformer,
      )
      break
    }
  }
}
