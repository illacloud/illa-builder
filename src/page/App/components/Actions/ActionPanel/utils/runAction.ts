import {
  ActionContent,
  ActionItem,
  Transformer,
} from "@/redux/currentApp/action/actionState"
import store from "@/store"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"
import { isDynamicString, wrapCode } from "@/utils/evaluateDynamicString/utils"
import { Api } from "@/api/base"
import { getAppId } from "@/redux/currentApp/appInfo/appInfoSelector"
import { transformEvents } from "@/widgetLibrary/PublicSector/utils/transformEvents"
import { BUILDER_CALC_CONTEXT } from "@/page/App/context/globalDataProvider"
import { MysqlAction } from "@/redux/currentApp/action/mysqlAction"

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
      if (transformer?.enable) {
        const evaluateTransform = `(function (){
          ${transformer.rawData}
        })`
        const canEvalString = `{{${evaluateTransform}()}}`
        const calcContext = data.data.Rows
        try {
          const res = evaluateDynamicString("events", canEvalString, {
            ...BUILDER_CALC_CONTEXT,
            data: calcContext,
          })
        } catch (e) {
          console.log(e)
        }
      }
      successEvent.forEach((scriptObj) => {
        const eventObj = transformEvents(scriptObj)
        if (!eventObj) return
        const { script, enabled } = eventObj
        if (enabled || enabled == undefined) {
          evaluateDynamicString("events", script, BUILDER_CALC_CONTEXT)
          return
        }
      })
    },
    (res) => {
      failedEvent.forEach((scriptObj) => {
        const eventObj = transformEvents(scriptObj)
        if (!eventObj) return
        const { script, enabled } = eventObj
        if (enabled || enabled == undefined) {
          evaluateDynamicString("events", script, BUILDER_CALC_CONTEXT)
          return
        }
      })
    },
    () => {
      console.log("crash")
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
    case "mysql":
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
}
