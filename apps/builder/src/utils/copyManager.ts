import i18n from "i18next"
import { createMessage } from "@illa-design/react"
import { onCopyActionItem } from "@/page/App/components/Actions/api"
import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"
import { searchDSLByDisplayName } from "@/redux/currentApp/editor/components/componentsSelector"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import store from "@/store"
import { FocusManager } from "@/utils/focusManager"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"

const message = createMessage()

export class CopyManager {
  static currentCopyComponentNodes: ComponentNode[] | null = null

  static currentCopyAction: ActionItem<ActionContent> | null = null

  static copyAction(action: ActionItem<ActionContent>) {
    this.currentCopyAction = action
  }

  static copyComponentNodeByDisplayName(displayNames: string[]) {
    this.currentCopyComponentNodes = displayNames.map((displayName) => {
      return searchDSLByDisplayName(displayName) as ComponentNode
    })
  }

  static copyComponentNode(node: ComponentNode[]) {
    this.currentCopyComponentNodes = node
  }

  static paste(sources: "keyboard" | "duplicate") {
    switch (FocusManager.getFocus()) {
      case "data_action":
      case "action":
        if (this.currentCopyAction != null) {
          onCopyActionItem(this.currentCopyAction)
        }
        break
      case "data_component":
        if (this.currentCopyComponentNodes != null) {
          store.dispatch(
            componentsActions.copyComponentReducer({
              copyComponents: this.currentCopyComponentNodes
                .filter((node) => {
                  return (
                    node.parentNode && searchDSLByDisplayName(node.parentNode)
                  )
                })
                .map((node) => {
                  const parentNode = searchDSLByDisplayName(node.parentNode!!)!!
                  return {
                    newComponentNode: this.copyComponent(
                      node,
                      parentNode,
                      node.x,
                      node.y + node.h,
                    ),
                    originComponentNode: node,
                  }
                }),
              sources: sources,
            }),
          )
        }
        break
      case "canvas":
        if (
          this.currentCopyComponentNodes?.some(
            (node) => node.type === "MODAL_WIDGET",
          )
        ) {
          return
        }
        if (this.currentCopyComponentNodes != null) {
          const clickPosition = FocusManager.getClickPosition()
          if (clickPosition) {
            switch (clickPosition.type) {
              case "component":
                const targetNode = searchDSLByDisplayName(
                  clickPosition.displayName,
                )
                if (targetNode && targetNode.parentNode) {
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

                    store.dispatch(
                      componentsActions.copyComponentReducer({
                        copyComponents: this.currentCopyComponentNodes.map(
                          (node) => {
                            return {
                              newComponentNode: this.copyComponent(
                                node,
                                targetParentNode,
                                targetNode.x + node.x - leftTopX,
                                targetNode.y + targetNode.h + node.y - leftTopY,
                              ),
                              originComponentNode: node,
                            }
                          },
                        ),
                        sources: sources,
                      }),
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
                  let leftTopX = Number.MAX_SAFE_INTEGER
                  let leftTopY = Number.MAX_SAFE_INTEGER

                  this.currentCopyComponentNodes.forEach((node) => {
                    leftTopX = Math.min(leftTopX, node.x)
                    leftTopY = Math.min(leftTopY, node.y)
                  })

                  store.dispatch(
                    componentsActions.copyComponentReducer({
                      copyComponents: this.currentCopyComponentNodes.map(
                        (node) => {
                          return {
                            newComponentNode: this.copyComponent(
                              node,
                              containerNode,
                              clickPosition.clickPosition[0] +
                                node.x -
                                leftTopX,
                              clickPosition.clickPosition[1] +
                                node.y -
                                leftTopY,
                            ),
                            originComponentNode: node,
                          }
                        },
                      ),
                      sources: sources,
                    }),
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
                  let leftTopX = Number.MAX_SAFE_INTEGER
                  let leftTopY = Number.MAX_SAFE_INTEGER

                  this.currentCopyComponentNodes.forEach((node) => {
                    leftTopX = Math.min(leftTopX, node.x)
                    leftTopY = Math.min(leftTopY, node.y)
                  })
                  store.dispatch(
                    componentsActions.copyComponentReducer({
                      copyComponents: this.currentCopyComponentNodes.map(
                        (node) => {
                          return {
                            newComponentNode: this.copyComponent(
                              node,
                              targetParentNode,
                              clickPosition.clickPosition[0] +
                                node.x -
                                leftTopX,
                              clickPosition.clickPosition[1] +
                                clickPosition.clickPosition[3] +
                                node.y -
                                leftTopY,
                            ),
                            originComponentNode: node,
                          }
                        },
                      ),
                      sources: sources,
                    }),
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
    const newNode = {
      ...node,
      displayName: DisplayNameGenerator.generateDisplayName(
        node.type,
        node.showName,
      ),
      x: rawX,
      y: rawY,
      w: node.w,
      h: node.h,
      parentNode: newParentNode.displayName,
    } as ComponentNode
    if (Array.isArray(node.childrenNode)) {
      newNode.childrenNode = node.childrenNode.map((n) =>
        this.copyComponent(n, newNode, n.x, n.y),
      )
    }
    return newNode
  }
}
