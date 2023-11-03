import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import i18n from "i18next"
import { cloneDeep, set } from "lodash"
import { createMessage } from "@illa-design/react"
import { onCopyActionItem } from "@/page/App/components/Actions/api"
import { DEFAULT_BODY_COLUMNS_NUMBER } from "@/page/App/components/DotPanel/constant/canvas"
import { illaSnapshot } from "@/page/App/components/DotPanel/constant/snapshotNew"
import { canCrossDifferenceColumnNumber } from "@/page/App/components/DotPanel/utils/getDragShadow"
import { getComponentNodeResultByRelativeCombineShape } from "@/page/App/components/DotPanel/utils/getDropResult"
import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"
import { searchDSLByDisplayName } from "@/redux/currentApp/components/componentsSelector"
import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import { ComponentNode } from "@/redux/currentApp/components/componentsState"
import { getExecutionWidgetLayoutInfo } from "@/redux/currentApp/executionTree/executionSelector"
import store from "@/store"
import { FocusManager } from "@/utils/focusManager"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
import { getActionMixedList } from "../redux/currentApp/action/actionSelector"
import { copyWidgetHelper } from "./changeDisplayNameHelper"
import { getCurrentSectionColumnNumberByChildDisplayName } from "./componentNode/search"
import { trackInEditor } from "./mixpanelHelper"

const message = createMessage()

const doPaste = (
  originCopyComponents: ComponentNode[],
  oldColumnNumber: number = DEFAULT_BODY_COLUMNS_NUMBER,
  newColumnNumber: number = DEFAULT_BODY_COLUMNS_NUMBER,
  sources: "keyboard" | "duplicate",
) => {
  if (
    newColumnNumber !== oldColumnNumber &&
    !canCrossDifferenceColumnNumber(originCopyComponents)
  ) {
    message.error({
      content: i18n.t("frame.message.session.error"),
    })
    return
  }

  const newComponents = getComponentNodeResultByRelativeCombineShape(
    originCopyComponents,
    newColumnNumber,
  )

  const types = newComponents.map((component) => component.type)

  trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.DUPLICATE, {
    element: "component",
    parameter1: types,
    parameter3: sources,
  })
  store.dispatch(componentsActions.addComponentReducer(newComponents))
}

export class CopyManager {
  static currentCopyComponentNodes: ComponentNode[] | null = null
  static copiedColumnNumber: number = DEFAULT_BODY_COLUMNS_NUMBER

  static currentCopyAction: ActionItem<ActionContent> | null = null

  static copyActionByActionID(actionID: string) {
    const actionList = getActionMixedList(store.getState())
    const targetAction = actionList.find((item) => {
      return item.actionID === actionID
    })
    if (targetAction) {
      this.currentCopyAction = targetAction
    } else {
      this.currentCopyAction = null
    }
  }

  static copyComponentNodeByDisplayName(displayNames: string[]) {
    if (displayNames.length > 0) {
      const widgetLayoutInfos = getExecutionWidgetLayoutInfo(store.getState())
      illaSnapshot.setSnapshot(widgetLayoutInfos)
      const copiedColumnNumber =
        getCurrentSectionColumnNumberByChildDisplayName(displayNames[0])
      this.currentCopyComponentNodes = displayNames.map((displayName) => {
        return searchDSLByDisplayName(displayName) as ComponentNode
      })
      this.copiedColumnNumber = copiedColumnNumber
    }
  }

  static paste(sources: "keyboard" | "duplicate") {
    const widgetLayoutInfos = getExecutionWidgetLayoutInfo(store.getState())
    illaSnapshot.setSnapshot(widgetLayoutInfos)
    switch (FocusManager.getFocus()) {
      case "data_action":
      case "action":
        if (this.currentCopyAction != null) {
          onCopyActionItem(this.currentCopyAction)
        }
        break
      case "data_component":
      case "canvas":
        if (this.currentCopyComponentNodes != null) {
          const clickPosition = FocusManager.getClickPosition()
          if (clickPosition) {
            switch (clickPosition.type) {
              case "component":
                const targetNode = searchDSLByDisplayName(
                  clickPosition.displayName,
                )
                if (targetNode?.type === "MODAL_WIDGET") {
                  const targetParentNode = searchDSLByDisplayName(
                    targetNode.childrenNode[1].displayName,
                  )
                  const columnNumber =
                    getCurrentSectionColumnNumberByChildDisplayName(
                      targetNode.displayName,
                    )
                  if (targetParentNode) {
                    const originCopyComponents =
                      this.currentCopyComponentNodes.map((node) => {
                        if (node.type === "MODAL_WIDGET") {
                          const targetNodeParentNode = searchDSLByDisplayName(
                            node.parentNode!,
                          )
                          return this.copyComponent(
                            node,
                            targetNodeParentNode!,
                            node.x,
                            node.y,
                          )
                        }
                        return this.copyComponent(node, targetParentNode, 0, 0)
                      })
                    doPaste(
                      originCopyComponents,
                      this.copiedColumnNumber,
                      columnNumber,
                      sources,
                    )
                  }

                  return
                }
                if (targetNode && targetNode.parentNode) {
                  const columnNumber =
                    getCurrentSectionColumnNumberByChildDisplayName(
                      targetNode.displayName,
                    )
                  const targetParentNode = searchDSLByDisplayName(
                    targetNode.parentNode,
                  )
                  if (targetParentNode) {
                    let leftTopX = Number.MAX_SAFE_INTEGER
                    let leftTopY = Number.MAX_SAFE_INTEGER
                    this.currentCopyComponentNodes.forEach((node) => {
                      leftTopX = Math.min(leftTopX, node.x)
                      leftTopY = Math.min(leftTopY, node.y)
                    })

                    const originCopyComponents =
                      this.currentCopyComponentNodes.map((node) => {
                        if (node.type === "MODAL_WIDGET") {
                          const targetNodeParentNode = searchDSLByDisplayName(
                            node.parentNode!,
                          )
                          return this.copyComponent(
                            node,
                            targetNodeParentNode!,
                            node.x,
                            node.y,
                          )
                        }
                        return this.copyComponent(
                          node,
                          targetParentNode,
                          targetNode.x + node.x - leftTopX,
                          targetNode.y + targetNode.h + node.y - leftTopY,
                        )
                      })

                    doPaste(
                      originCopyComponents,
                      this.copiedColumnNumber,
                      columnNumber,
                      sources,
                    )
                  }
                } else {
                  message.normal({
                    content: i18n.t("frame.paste_no_aimed"),
                  })
                }
                break
              case "inner_container":
                if (clickPosition.clickPosition.length !== 2) {
                  message.normal({
                    content: i18n.t("frame.paste_no_aimed"),
                  })
                  return
                }
                const containerNode = searchDSLByDisplayName(
                  clickPosition.displayName,
                )
                if (containerNode) {
                  const columnNumber =
                    getCurrentSectionColumnNumberByChildDisplayName(
                      containerNode.displayName,
                    )
                  let leftTopX = Number.MAX_SAFE_INTEGER
                  let leftTopY = Number.MAX_SAFE_INTEGER

                  this.currentCopyComponentNodes.forEach((node) => {
                    leftTopX = Math.min(leftTopX, node.x)
                    leftTopY = Math.min(leftTopY, node.y)
                  })

                  const originCopyComponents =
                    this.currentCopyComponentNodes.map((node) => {
                      if (node.type === "MODAL_WIDGET") {
                        const targetNodeParentNode = searchDSLByDisplayName(
                          node.parentNode!,
                        )
                        return this.copyComponent(
                          node,
                          targetNodeParentNode!,
                          node.x,
                          node.y,
                        )
                      }
                      return this.copyComponent(
                        node,
                        containerNode,
                        clickPosition.clickPosition[0] + node.x - leftTopX,
                        clickPosition.clickPosition[1] + node.y - leftTopY,
                      )
                    })

                  doPaste(
                    originCopyComponents,
                    this.copiedColumnNumber,
                    columnNumber,
                    sources,
                  )
                } else {
                  message.normal({
                    content: i18n.t("frame.paste_no_aimed"),
                  })
                }
                break
              case "group":
                const targetParentNode = searchDSLByDisplayName(
                  clickPosition.displayName,
                )
                if (targetParentNode) {
                  const columnNumber =
                    getCurrentSectionColumnNumberByChildDisplayName(
                      targetParentNode.displayName,
                    )
                  let leftTopX = Number.MAX_SAFE_INTEGER
                  let leftTopY = Number.MAX_SAFE_INTEGER
                  this.currentCopyComponentNodes.forEach((node) => {
                    leftTopX = Math.min(leftTopX, node.x)
                    leftTopY = Math.min(leftTopY, node.y)
                  })

                  const originCopyComponents =
                    this.currentCopyComponentNodes.map((node) => {
                      if (node.type === "MODAL_WIDGET") {
                        const targetNodeParentNode = searchDSLByDisplayName(
                          node.parentNode!,
                        )
                        return this.copyComponent(
                          node,
                          targetNodeParentNode!,
                          node.x,
                          node.y,
                        )
                      }
                      return this.copyComponent(
                        node,
                        targetParentNode,
                        clickPosition.clickPosition[0] + node.x - leftTopX,
                        clickPosition.clickPosition[1] +
                          clickPosition.clickPosition[3] +
                          node.y -
                          leftTopY,
                      )
                    })

                  doPaste(
                    originCopyComponents,
                    this.copiedColumnNumber,
                    columnNumber,
                    sources,
                  )
                }
            }
          }
        }
        break
      case "none":
        break
      case "components_config":
        break
      case "page_config":
        break
      case "data_page":
        break
      case "data_global_state":
        break
      case "widget_picker":
        break
    }
  }

  static copyComponent(
    node: ComponentNode,
    newParentNode: ComponentNode,
    rawX: number,
    rawY: number,
  ): ComponentNode {
    const newDisplayName = DisplayNameGenerator.generateDisplayName(
      node.type,
      node.showName,
    )

    const updatePathsMapValue = copyWidgetHelper(
      node.displayName,
      newDisplayName,
    )

    const newNode = cloneDeep({
      ...node,
      props: node.props ?? {},
      displayName: newDisplayName,
      x: rawX,
      y: rawY,
      w: node.w,
      h: node.h,
      parentNode: newParentNode.displayName,
    } as ComponentNode)

    Object.keys(updatePathsMapValue).forEach((key) => {
      set(newNode, `props.${key}`, updatePathsMapValue[key])
    })

    if (Array.isArray(node.childrenNode)) {
      newNode.childrenNode = node.childrenNode.map((n) =>
        this.copyComponent(n, newNode, n.x, n.y),
      )
    }
    return newNode
  }
}
