import copy from "copy-to-clipboard"
import { get } from "lodash"
import { createMessage } from "@illa-design/react"
import i18n from "@/i18n/config"
import { runAction } from "@/page/App/components/Actions/ActionPanel/utils/runAction"
import {
  goToURL,
  showNotification,
} from "@/page/App/context/globalDataProvider"
import { getIsILLAProductMode } from "@/redux/config/configSelector"
import { getActionItemByDisplayName } from "@/redux/currentApp/action/actionSelector"
import {
  getCanvas,
  searchDsl,
} from "@/redux/currentApp/editor/components/componentsSelector"
import { SectionViewShape } from "@/redux/currentApp/editor/components/componentsState"
import { getRootNodeExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { UpdateExecutionByDisplayNamePayload } from "@/redux/currentApp/executionTree/executionState"
import { ILLARoute } from "@/router"
import store from "@/store"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"
import { isDynamicString } from "@/utils/evaluateDynamicString/utils"

const message = createMessage()

export const transformEvents = (
  event: any,
  globalData: Record<string, any>,
) => {
  if (!event) return
  const { actionType } = event
  if (actionType === "openUrl") {
    const { newTab, url, enabled } = event
    const params = { url, newTab }
    return {
      script: () => {
        goToURL(params)
      },
      enabled,
    }
  }
  if (actionType === "showNotification") {
    const { title, description, notificationType, duration, enabled } = event
    const params = {
      type: notificationType,
      title,
      description,
      duration,
    }
    return {
      script: () => {
        showNotification(params)
      },
      enabled,
    }
  }

  if (actionType === "copyToClipboard") {
    const { copiedValue, enabled } = event
    return {
      script: () => {
        message.success({
          content: i18n.t("copied"),
        })
        if (copiedValue === undefined || copiedValue === null) {
          copy("")
          return
        }
        if (
          typeof copiedValue === "string" ||
          typeof copiedValue === "number"
        ) {
          copy(String(copiedValue))
          return
        }
        copy(JSON.stringify(copiedValue))
      },
      enabled,
    }
  }

  if (actionType === "setRouter") {
    const { pagePath, viewPath, enabled } = event
    let finalPath = `/${pagePath}`
    finalPath = viewPath ? finalPath + `/${viewPath}` : finalPath
    return {
      script: () => {
        const originPath = window.location.pathname
        const originPathArray = originPath.split("/")
        const isProductionMode = getIsILLAProductMode(store.getState())
        const rootNodeProps = getRootNodeExecutionResult(store.getState())
        const { pageSortedKey } = rootNodeProps
        const index = pageSortedKey.findIndex(
          (path: string) => path === pagePath,
        )
        if (index === -1) return
        if (isProductionMode && originPathArray.length >= 5) {
          ILLARoute.navigate(
            originPathArray.slice(0, 5).join("/") + finalPath,
            { replace: true },
          )
        }
        const updateSlice: UpdateExecutionByDisplayNamePayload[] = [
          {
            displayName: "root",
            value: {
              currentPageIndex: index,
            },
          },
        ]
        if (viewPath) {
          const canvas = getCanvas(store.getState())
          if (!canvas) return
          const pageNode = searchDsl(canvas, pagePath)
          if (!pageNode) return
          pageNode.childrenNode.forEach((node) => {
            const sectionViewConfigs = node.props?.sectionViewConfigs || []
            const viewSortedKey = node.props?.viewSortedKey || []
            const findConfig = sectionViewConfigs.find(
              (config: SectionViewShape) => {
                return config.path === viewPath
              },
            )
            if (findConfig) {
              const viewDisplayName = findConfig.viewDisplayName
              const indexOfViewKey = viewSortedKey.findIndex(
                (key: string) => key === viewDisplayName,
              )
              if (indexOfViewKey !== -1) {
                updateSlice.push({
                  displayName: node.displayName,
                  value: {
                    currentViewIndex: indexOfViewKey,
                  },
                })
              }
            }
          })
        }
        store.dispatch(
          executionActions.updateExecutionByMultiDisplayNameReducer(
            updateSlice,
          ),
        )
      },
      enabled,
    }
  }
  if (actionType === "widget") {
    const { widgetID, widgetMethod, enabled } = event
    if (
      [
        "setValue",
        "setVolume",
        "setVideoUrl",
        "setImageUrl",
        "setFileUrl",
        "setStartValue",
        "setPrimaryValue",
        "setEndValue",
        "setDisabled",
        "setSpeed",
        "setLoop",
        "seekTo",
        "showControls",
        "mute",
      ].includes(widgetMethod)
    ) {
      const { widgetTargetValue } = event
      return {
        script: () => {
          const method = get(globalData, `${widgetID}.${widgetMethod}`, null)
          if (method) {
            method(widgetTargetValue)
          }
        },
        enabled,
      }
    }
    if (
      widgetMethod === "play" ||
      widgetMethod === "pause" ||
      widgetMethod === "clearValue" ||
      widgetMethod === "clearValidation" ||
      widgetMethod === "toggle" ||
      widgetMethod === "focus" ||
      widgetMethod === "reset" ||
      widgetMethod === "rowSelect" ||
      widgetMethod === "resetPrimaryValue" ||
      widgetMethod === "slickNext" ||
      widgetMethod === "slickPrevious"
    ) {
      return {
        script: `{{${widgetID}.${widgetMethod}()}}`,
        enabled,
      }
    }
    if (widgetMethod === "setCurrentViewKey") {
      const { key } = event
      return {
        script: `{{${widgetID}.${widgetMethod}("${key}")}}`,
        enabled,
      }
    }
    if (widgetMethod === "setCurrentViewIndex") {
      const { index } = event
      return {
        script: `{{${widgetID}.${widgetMethod}("${index}")}}`,
        enabled,
      }
    }
    if (widgetMethod === "showNextView") {
      const { showNextViewLoopBack } = event
      return {
        script: `{{${widgetID}.${widgetMethod}(${!!showNextViewLoopBack})}}`,
        enabled,
      }
    }
    if (widgetMethod === "showPreviousView") {
      const { showPreviousViewLoopBack } = event
      return {
        script: `{{${widgetID}.${widgetMethod}(${!!showPreviousViewLoopBack})}}`,
        enabled,
      }
    }

    if (widgetMethod === "showNextVisibleView") {
      const { showNextVisibleViewLoopBack } = event
      return {
        script: `{{${widgetID}.${widgetMethod}(${!!showNextVisibleViewLoopBack})}}`,
        enabled,
      }
    }

    if (widgetMethod === "showPreviousVisibleView") {
      const { showPreviousVisibleViewLoopBack } = event
      return {
        script: `{{${widgetID}.${widgetMethod}(${!!showPreviousVisibleViewLoopBack})}}`,
        enabled,
      }
    }
    if (widgetMethod === "submit") {
      return {
        script: `{{${widgetID}.${widgetMethod}()}}`,
        enabled,
      }
    }
    if (widgetMethod === "validate") {
      return {
        script: `{{${widgetID}.${widgetMethod}()}}`,
        enabled,
      }
    }

    if (widgetMethod === "openModal" || widgetMethod === "closeModal") {
      return {
        script: () => {
          store.dispatch(
            executionActions.updateModalDisplayReducer({
              display: widgetMethod === "openModal",
              displayName: widgetID,
            }),
          )
        },
        enabled,
      }
    }
  }
  if (actionType === "datasource") {
    const rootState = store.getState()
    const { queryID, enabled } = event
    const actionItem = getActionItemByDisplayName(rootState, queryID)
    if (!actionItem)
      return {
        script: `{{}}`,
        enabled,
      }
    return {
      script: () => {
        runAction(actionItem)
      },
      enabled,
    }
  }
  return {
    script: `{{}}`,
    enabled: "{{false}}",
  }
}

export const runEventHandler = (
  scriptObj: any,
  globalData: Record<string, any>,
) => {
  const eventObj = transformEvents(scriptObj, globalData)
  if (!eventObj) return
  const { script, enabled } = eventObj
  if (enabled || enabled == undefined) {
    if (typeof script === "string" && isDynamicString(script)) {
      try {
        evaluateDynamicString("events", script, globalData)
      } catch (e) {
        message.error({
          content: "eventHandler run error",
        })
      }
      return
    }
    if (typeof script === "function") {
      script()
    }
  }
}
