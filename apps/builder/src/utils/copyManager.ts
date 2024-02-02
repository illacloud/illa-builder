import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import {
  ActionContent,
  ComponentMapNode,
  ComponentTreeNode,
} from "@illa-public/public-types"
import { ActionItem } from "@illa-public/public-types"
import i18n from "i18next"
import { klona } from "klona"
import { set } from "lodash-es"
import { createMessage } from "@illa-design/react"
import { onCopyActionItem } from "@/page/App/components/Actions/api"
import { DEFAULT_BODY_COLUMNS_NUMBER } from "@/page/App/components/DotPanel/constant/canvas"
import { illaSnapshot } from "@/page/App/components/DotPanel/constant/snapshotNew"
import { canCrossDifferenceColumnNumber } from "@/page/App/components/DotPanel/utils/getDragShadow"
import { searchDSLByDisplayName } from "@/redux/currentApp/components/componentsSelector"
import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import { getExecution } from "@/redux/currentApp/executionTree/executionSelector"
import store from "@/store"
import { FocusManager } from "@/utils/focusManager"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
import { getActionMixedList } from "../redux/currentApp/action/actionSelector"
import { getClientWidgetLayoutInfo } from "../redux/currentApp/layoutInfo/layoutInfoSelector"
import { copyWidgetDisplayNameHelper } from "./changeDisplayNameHelper"
import { getComponentNodeResultByRelativeCombineShape } from "./componentNode/copyHelper"
import { buildTreeByMapNode } from "./componentNode/flatTree"
import { getCurrentSectionColumnNumberByChildDisplayName } from "./componentNode/search"
import { trackInEditor } from "./mixpanelHelper"

const message = createMessage()

const doPaste = (
  originCopyComponents: ComponentTreeNode[],
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
  static currentCopyComponentNodes: ComponentMapNode[] | null = null
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
      const widgetLayoutInfos = getClientWidgetLayoutInfo(store.getState())
      illaSnapshot.setSnapshot(widgetLayoutInfos)
      const copiedColumnNumber =
        getCurrentSectionColumnNumberByChildDisplayName(displayNames[0])
      this.currentCopyComponentNodes = displayNames.map((displayName) => {
        return searchDSLByDisplayName(displayName)
      })
      this.copiedColumnNumber = copiedColumnNumber
    }
  }

  static paste(sources: "keyboard" | "duplicate") {
    const widgetLayoutInfos = getClientWidgetLayoutInfo(store.getState())
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
          const needCopyModalComponents = this.currentCopyComponentNodes
            .filter((item) => item.type === "MODAL_WIDGET")
            .map((needCopyComponent) => {
              const targetNodeParentNode = searchDSLByDisplayName(
                needCopyComponent.parentNode!,
              )

              return this.copyComponent(
                buildTreeByMapNode(needCopyComponent.displayName),
                targetNodeParentNode.displayName,
                needCopyComponent.x,
                needCopyComponent.y,
              )
            })
          const needCopyOtherComponents = this.currentCopyComponentNodes
            .filter((item) => item.type !== "MODAL_WIDGET")
            .map((node) => {
              const layoutInfo = widgetLayoutInfos[node.displayName]
              return {
                ...node,
                x: layoutInfo.layoutInfo.x,
                y: layoutInfo.layoutInfo.y,
                w: layoutInfo.layoutInfo.w,
                h: layoutInfo.layoutInfo.h,
              }
            })
          const copyResult = [...needCopyModalComponents]
          if (clickPosition) {
            switch (clickPosition.type) {
              case "component":
                let targetNode = searchDSLByDisplayName(
                  clickPosition.displayName,
                )
                if (targetNode) {
                  const targetLayoutInfo =
                    widgetLayoutInfos[targetNode.displayName]
                  targetNode = {
                    ...targetNode,
                    x: targetLayoutInfo.layoutInfo.x,
                    y: targetLayoutInfo.layoutInfo.y,
                    w: targetLayoutInfo.layoutInfo.w,
                    h: targetLayoutInfo.layoutInfo.h,
                  }
                }
                if (targetNode && targetNode.parentNode) {
                  const columnNumber =
                    getCurrentSectionColumnNumberByChildDisplayName(
                      targetNode.displayName,
                    )
                  switch (targetNode.type) {
                    case "FORM_WIDGET":
                    case "MODAL_WIDGET": {
                      const targetParentNode = searchDSLByDisplayName(
                        targetNode.childrenNode[1],
                      )
                      if (targetParentNode) {
                        let prevY = 0
                        copyResult.push(
                          ...needCopyOtherComponents.map((node) => {
                            const newNode = this.copyComponent(
                              buildTreeByMapNode(node.displayName),
                              targetParentNode.displayName,
                              0,
                              prevY,
                            )
                            prevY += node.h
                            return newNode
                          }),
                        )
                      }
                      break
                    }
                    case "CONTAINER_WIDGET": {
                      const executionTree = getExecution(
                        store.getState(),
                      ).result
                      const { currentIndex } =
                        executionTree[targetNode.displayName]
                      const targetParentNode = searchDSLByDisplayName(
                        targetNode.childrenNode[currentIndex],
                      )
                      if (targetParentNode) {
                        let prevY = 0
                        copyResult.push(
                          ...needCopyOtherComponents.map((node) => {
                            const newNode = this.copyComponent(
                              buildTreeByMapNode(node.displayName),
                              targetParentNode.displayName,
                              0,
                              prevY,
                            )
                            prevY += node.h
                            return newNode
                          }),
                        )
                      }
                      break
                    }
                    case "LIST_WIDGET":
                    case "GRID_LIST_WIDGET": {
                      const targetParentNode = searchDSLByDisplayName(
                        targetNode.childrenNode[0],
                      )
                      if (targetParentNode) {
                        let prevY = 0
                        copyResult.push(
                          ...needCopyOtherComponents.map((node) => {
                            const newNode = this.copyComponent(
                              buildTreeByMapNode(node.displayName),
                              targetParentNode.displayName,
                              0,
                              prevY,
                            )
                            prevY += node.h
                            return newNode
                          }),
                        )
                      }
                      break
                    }
                    default: {
                      const targetParentNode = searchDSLByDisplayName(
                        targetNode.parentNode,
                      )
                      if (targetParentNode) {
                        let leftTopX = Number.MAX_SAFE_INTEGER
                        let leftTopY = Number.MAX_SAFE_INTEGER
                        needCopyOtherComponents.forEach((node) => {
                          leftTopX = Math.min(leftTopX, node.x)
                          leftTopY = Math.min(leftTopY, node.y)
                        })
                        copyResult.push(
                          ...needCopyOtherComponents.map((node) => {
                            return this.copyComponent(
                              buildTreeByMapNode(node.displayName),
                              targetParentNode.displayName,
                              targetNode!.x + node.x - leftTopX,
                              targetNode!.y + targetNode!.h + node.y - leftTopY,
                            )
                          }),
                        )
                      }
                    }
                  }
                  doPaste(
                    copyResult,
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
                      const layoutInfo = widgetLayoutInfos[node.displayName]
                      const needCopyComponent = {
                        ...node,
                        x: layoutInfo.layoutInfo.x,
                        y: layoutInfo.layoutInfo.y,
                        w: layoutInfo.layoutInfo.w,
                        h: layoutInfo.layoutInfo.h,
                      }
                      if (needCopyComponent.type === "MODAL_WIDGET") {
                        const targetNodeParentNode = searchDSLByDisplayName(
                          needCopyComponent.parentNode!,
                        )
                        return this.copyComponent(
                          buildTreeByMapNode(needCopyComponent.displayName),
                          targetNodeParentNode.displayName,
                          needCopyComponent.x,
                          needCopyComponent.y,
                        )
                      }
                      return this.copyComponent(
                        buildTreeByMapNode(needCopyComponent.displayName),
                        containerNode.displayName,
                        clickPosition.clickPosition[0] +
                          needCopyComponent.x -
                          leftTopX,
                        clickPosition.clickPosition[1] +
                          needCopyComponent.y -
                          leftTopY,
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
                      const layoutInfo = widgetLayoutInfos[node.displayName]
                      const needCopyComponent = {
                        ...node,
                        x: layoutInfo.layoutInfo.x,
                        y: layoutInfo.layoutInfo.y,
                        w: layoutInfo.layoutInfo.w,
                        h: layoutInfo.layoutInfo.h,
                      }
                      if (needCopyComponent.type === "MODAL_WIDGET") {
                        const targetNodeParentNode = searchDSLByDisplayName(
                          needCopyComponent.parentNode!,
                        )
                        return this.copyComponent(
                          buildTreeByMapNode(needCopyComponent.displayName),
                          targetNodeParentNode.displayName,
                          needCopyComponent.x,
                          needCopyComponent.y,
                        )
                      }
                      return this.copyComponent(
                        buildTreeByMapNode(needCopyComponent.displayName),
                        targetParentNode.displayName,
                        clickPosition.clickPosition[0] +
                          needCopyComponent.x -
                          leftTopX,
                        clickPosition.clickPosition[1] +
                          clickPosition.clickPosition[3] +
                          needCopyComponent.y -
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
    node: ComponentTreeNode,
    newParentNodeDisplayName: string,
    rawX: number,
    rawY: number,
  ): ComponentTreeNode {
    const newDisplayName = DisplayNameGenerator.generateDisplayName(
      node.type,
      node.showName,
    )

    const updatePathsMapValue = copyWidgetDisplayNameHelper(
      node.displayName,
      newDisplayName,
    )

    const newNode = klona({
      ...node,
      props: node.props ?? {},
      displayName: newDisplayName,
      x: rawX,
      y: rawY,
      w: node.w,
      h: node.h,
      parentNode: newParentNodeDisplayName,
    } as ComponentTreeNode)

    Object.keys(updatePathsMapValue).forEach((key) => {
      set(newNode, `props.${key}`, updatePathsMapValue[key])
    })

    if (Array.isArray(node.childrenNode)) {
      newNode.childrenNode = node.childrenNode.map((n) =>
        this.copyComponent(n, newNode.displayName, n.x, n.y),
      )
    }
    return newNode
  }
}
