import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { useUpgradeModal } from "@illa-public/upgrade-modal"
import { getCurrentTeamInfo, getPlanUtils } from "@illa-public/user-data"
import { canUseUpgradeFeature } from "@illa-public/user-role-utils"
import { FC, ReactNode, useCallback, useEffect, useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Key } from "ts-key-enum"
import { createModal, useMessage } from "@illa-design/react"
import { onDeleteActionItem } from "@/page/App/components/Actions/api"
import {
  getIsILLAEditMode,
  getSelectedAction,
  getSelectedComponentDisplayNames,
  isShowDot,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { getActionItemByDisplayName } from "@/redux/currentApp/action/actionSelector"
import {
  flattenAllComponentNodeToMap,
  getCanvas,
  getSelectedComponentNode,
  searchDsl,
} from "@/redux/currentApp/editor/components/componentsSelector"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { takeSnapShot } from "@/services/history"
import store from "@/store"
import { CopyManager } from "@/utils/copyManager"
import { FocusManager } from "@/utils/focusManager"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { ShortCutContext } from "@/utils/shortcut/shortcutProvider"
import { isILLAAPiError } from "@/utils/typeHelper"
import IllaUndoRedoManager from "@/utils/undoRedo/undo"
import { isMAC } from "@/utils/userAgent"

export const Shortcut: FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const message = useMessage()

  const { appId } = useParams()

  const isEditMode = useSelector(getIsILLAEditMode)
  const currentSelectedComponent = useSelector(getSelectedComponentDisplayNames)
  const currentSelectedComponentNode = useSelector(getSelectedComponentNode)
  const currentSelectedAction = useSelector(getSelectedAction)
  const canvasRootNode = useSelector(getCanvas)
  const executionResult = useSelector(getExecutionResult)
  const showShadows = useSelector(isShowDot)
  const teamInfo = useSelector(getCurrentTeamInfo)
  const upgradeModal = useUpgradeModal()

  // shortcut
  const [alreadyShowDeleteDialog, setAlreadyShowDeleteDialog] =
    useState<boolean>(false)
  const [saveLoading, setSaveLoading] = useState<boolean>(false)

  const canUseBillingFeature = canUseUpgradeFeature(
    teamInfo?.myRole,
    getPlanUtils(teamInfo),
    teamInfo?.totalTeamLicense?.teamLicensePurchased,
    teamInfo?.totalTeamLicense?.teamLicenseAllPaid,
  )

  const showDeleteDialog = (
    displayName: string[],
    type?: "widget" | "page" | "action" | "subpage" | "pageView",
    options?: Record<string, any>,
  ) => {
    const modal = createModal()
    if (!alreadyShowDeleteDialog && displayName.length > 0) {
      const textList = displayName.join(", ").toString()
      setAlreadyShowDeleteDialog(true)
      const id = modal.show({
        blockOkHide: true,
        blockCancelHide: true,
        title: t("editor.component.delete_title", {
          displayName: textList,
        }),
        children: t("editor.component.delete_content", {
          displayName: textList,
        }),
        cancelText: t("editor.component.cancel"),
        okText: t("editor.component.delete"),
        okButtonProps: {
          colorScheme: "red",
        },
        closable: false,
        onCancel: () => {
          setAlreadyShowDeleteDialog(false)
          modal.update(id, { visible: false })
        },
        onOk: () => {
          switch (type) {
            case "page": {
              trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
                element: "delete_page_modal_delete",
              })
              dispatch(
                componentsActions.deletePageNodeReducer({
                  displayName: displayName[0],
                  originPageSortedKey: options?.originPageSortedKey || [],
                }),
              )
              break
            }
            case "widget": {
              trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
                element: "component_delete_modal_delete",
                parameter3: options?.source || "left_delete",
              })
              dispatch(
                componentsActions.deleteComponentNodeReducer({
                  displayNames: displayName,
                  source: options?.source || "left_delete",
                }),
              )
              dispatch(configActions.clearSelectedComponent())
              break
            }
            case "action": {
              setAlreadyShowDeleteDialog(false)
              modal.update(id, { okLoading: true })
              for (let i = 0; i < displayName.length; i++) {
                const action = getActionItemByDisplayName(
                  store.getState(),
                  displayName[i],
                )
                if (action) {
                  // fail to await @chenlongbo
                  onDeleteActionItem(action)
                }
              }
              trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
                element: "action_delete_modal_delete",
              })
              modal.update(id, { okLoading: false })
              modal.update(id, { visible: false })
              return
            }
            case "subpage": {
              dispatch(
                componentsActions.deleteSubPageViewNodeReducer({
                  pageName: options!.parentPageName,
                  subPagePath: displayName[0],
                }),
              )
              break
            }
            case "pageView": {
              dispatch(
                componentsActions.deleteSectionViewReducer({
                  viewDisplayName: options!.viewDisplayName,
                  parentNodeName: options!.parentNodeName,
                  originPageSortedKey: options!.originPageSortedKey,
                }),
              )
              break
            }
          }
          setAlreadyShowDeleteDialog(false)
          modal.update(id, { visible: false })
        },
        afterOpen: () => {
          if (type === "page") {
            trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.SHOW, {
              element: "delete_page_modal",
            })
          }
          if (type === "widget") {
            trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.SHOW, {
              element: "component_delete_modal",
              parameter3: options?.source || "",
            })
          }
          if (type === "action") {
            trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.SHOW, {
              element: "action_delete_modal",
            })
          }
        },
      })
    }
  }

  const selectAllBodyComponentsHandler = useCallback(() => {
    switch (FocusManager.getFocus()) {
      case "none":
        break
      case "data_component":
        break
      case "data_action":
        break
      case "data_page":
        break
      case "data_global_state":
        break
      case "action":
        break
      case "widget_picker":
        break
      case "components_config":
        break
      case "page_config":
        break
      case "canvas": {
        if (canvasRootNode) {
          const rootNode = executionResult.root
          if (!rootNode) return
          const currentPageDisplayName =
            rootNode.pageSortedKey[rootNode.currentPageIndex]
          const pageNode = searchDsl(canvasRootNode, currentPageDisplayName)
          if (!pageNode) return
          let bodySectionDisplayName: string = ""
          pageNode.childrenNode.find((sectionNode) => {
            const displayName = sectionNode.displayName
            const currentSectionProps = executionResult[displayName]
            if (
              currentSectionProps &&
              currentSectionProps.viewSortedKey &&
              currentSectionProps.currentViewIndex >= 0 &&
              sectionNode.showName === "bodySection"
            ) {
              const { currentViewIndex, viewSortedKey } = currentSectionProps
              bodySectionDisplayName = viewSortedKey[currentViewIndex]
            }
          })
          if (!bodySectionDisplayName) return
          const componentNodesMap = flattenAllComponentNodeToMap(pageNode)
          const allChildrenNodes = Array.isArray(
            componentNodesMap[bodySectionDisplayName].childrenNode,
          )
            ? componentNodesMap[bodySectionDisplayName].childrenNode
            : []

          const childNodeDisplayNames = allChildrenNodes.map(
            (node) => node.displayName,
          )

          trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.SELECT, {
            element: "component",
            parameter1: "keyboard",
          })
          dispatch(configActions.updateSelectedComponent(childNodeDisplayNames))
        }
      }
    }
  }, [canvasRootNode, dispatch, executionResult])

  const copySomethingHandler = useCallback(() => {
    switch (FocusManager.getFocus()) {
      case "data_page":
        break
      case "data_global_state":
        break
      case "none":
        break
      case "canvas":
      case "data_component":
        if (
          currentSelectedComponent != null &&
          currentSelectedComponentNode.length > 0
        ) {
          CopyManager.copyComponentNode(currentSelectedComponentNode)
        }
        break
      case "data_action":
      case "action":
        if (currentSelectedAction != null) {
          CopyManager.copyAction(currentSelectedAction)
        }
        break
      case "widget_picker":
        break
      case "components_config":
        break
      case "page_config":
        break
    }
  }, [
    currentSelectedAction,
    currentSelectedComponent,
    currentSelectedComponentNode,
  ])

  const copyAndPasteHandler = useCallback(() => {
    switch (FocusManager.getFocus()) {
      case "data_page":
        break
      case "data_global_state":
        break
      case "none":
        break
      case "canvas":
      case "data_component":
        if (
          currentSelectedComponent != null &&
          currentSelectedComponentNode.length > 0
        ) {
          CopyManager.copyComponentNode(currentSelectedComponentNode)
        }
        break
      case "data_action":
      case "action":
        if (currentSelectedAction != null) {
          CopyManager.copyAction(currentSelectedAction)
        }
        break
      case "widget_picker":
        break
      case "components_config":
        break
      case "page_config":
        break
    }
    CopyManager.paste("keyboard")
  }, [
    currentSelectedAction,
    currentSelectedComponent,
    currentSelectedComponentNode,
  ])

  const showDotHandler = useCallback(
    (keyboardEventType: string) => {
      if (keyboardEventType === "keydown") {
        dispatch(configActions.updateShowDot(true))
      } else if (keyboardEventType === "keyup") {
        dispatch(configActions.updateShowDot(false))
      }
    },
    [dispatch],
  )

  const changeShadowHidden = useCallback(() => {
    if (showShadows) {
      dispatch(configActions.updateShowDot(false))
    }
  }, [dispatch, showShadows])

  const handleSaveToHistory = useCallback(async () => {
    if (!canUseBillingFeature) {
      upgradeModal({
        modalType: "upgrade",
      })
    } else if (appId) {
      if (saveLoading) return
      setSaveLoading(true)
      try {
        await takeSnapShot(appId)
        message.success({ content: t("editor.history.message.suc.save") })
      } catch (error) {
        if (isILLAAPiError(error)) {
          message.error({ content: t("editor.history.message.fail.save") })
        } else {
          message.error({ content: t("network_error") })
        }
      } finally {
        setSaveLoading(false)
      }
    }
  }, [appId, canUseBillingFeature, message, saveLoading, t, upgradeModal])

  useHotkeys(
    `${isMAC() ? Key.Meta : Key.Control}+s`,
    (keyboardEvent) => {
      if (keyboardEvent.repeat) return

      handleSaveToHistory()
    },
    {
      enableOnFormTags: true,
      enableOnContentEditable: true,
      preventDefault: true,
      enabled: isEditMode,
    },
    [handleSaveToHistory],
  )

  useHotkeys(
    Key.Backspace,
    (keyboardEvent) => {
      if (keyboardEvent.repeat) return
      switch (FocusManager.getFocus()) {
        case "data_page":
          break
        case "data_global_state":
          break
        case "none":
          break
        case "canvas":
        case "data_component":
          showDeleteDialog(
            currentSelectedComponent.map((displayName) => {
              return displayName
            }),
            "widget",
            { source: "keyboard" },
          )
          break
        case "data_action":
        case "action":
          if (currentSelectedAction?.displayName) {
            showDeleteDialog([currentSelectedAction.displayName], "action", {
              source: "keyboard",
            })
          }
          break
        case "widget_picker":
          break
        case "components_config":
          break
        case "page_config":
          break
      }
    },
    {
      enabled: isEditMode,
    },
    [showDeleteDialog, currentSelectedComponent, currentSelectedAction],
  )

  useHotkeys(
    `${isMAC() ? Key.Meta : Key.Control}+a`,
    (keyboardEvent) => {
      if (keyboardEvent.repeat) return
      selectAllBodyComponentsHandler()
    },
    {
      preventDefault: true,
      enabled: isEditMode,
    },
    [selectAllBodyComponentsHandler],
  )
  useHotkeys(
    `${isMAC() ? Key.Meta : Key.Control}+c`,
    (keyboardEvent) => {
      if (keyboardEvent.repeat) return
      copySomethingHandler()
    },
    {
      preventDefault: false,
      enabled: isEditMode,
    },
    [copySomethingHandler],
  )

  useHotkeys(
    `${isMAC() ? Key.Meta : Key.Control}+v`,
    (keyboardEvent) => {
      if (keyboardEvent.repeat) return
      CopyManager.paste("keyboard")
    },
    {
      preventDefault: false,
      enabled: isEditMode,
    },
    [copySomethingHandler],
  )

  useHotkeys(
    `${isMAC() ? Key.Meta : Key.Control}+d`,
    (keyboardEvent) => {
      if (keyboardEvent.repeat) return
      copyAndPasteHandler()
    },
    {
      preventDefault: true,
      enabled: isEditMode,
    },
    [copyAndPasteHandler],
  )

  useHotkeys(
    `${isMAC() ? Key.Meta : Key.Control}`,
    (keyboardEvent) => {
      if (keyboardEvent.repeat) return

      showDotHandler(keyboardEvent.type)
    },
    {
      keydown: true,
      keyup: true,
      preventDefault: false,
      enabled: isEditMode,
    },
    [showDotHandler],
  )

  useHotkeys(
    `${isMAC() ? Key.Meta : Key.Control}+z`,
    (keyboardEvent) => {
      if (keyboardEvent.repeat) return

      IllaUndoRedoManager.popFromUndoStack()
    },
    {
      enabled: isEditMode,
    },
    [isEditMode],
  )

  useHotkeys(
    `${isMAC() ? Key.Meta : Key.Control}+${Key.Shift}+z`,
    (keyboardEvent) => {
      if (keyboardEvent.repeat) return
      IllaUndoRedoManager.popFromRedoStack()
    },
    {
      enabled: isEditMode,
    },
    [isEditMode],
  )

  // cancel show dot
  useEffect(() => {
    if (isEditMode) {
      window.addEventListener("blur", changeShadowHidden)
    }

    return () => {
      if (isEditMode) {
        window.removeEventListener("blur", changeShadowHidden)
      }
    }
  }, [changeShadowHidden, dispatch, isEditMode])

  return (
    <ShortCutContext.Provider value={{ showDeleteDialog }}>
      {children}
    </ShortCutContext.Provider>
  )
}
