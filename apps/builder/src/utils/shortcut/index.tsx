import { FC, ReactNode, useCallback, useEffect, useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Key } from "ts-key-enum"
import { createModal, useMessage } from "@illa-design/react"
import { ILLA_MIXPANEL_EVENT_TYPE } from "@/illa-public-component/MixpanelUtils/interface"
import {
  getFreezeState,
  getIsILLAEditMode,
  getSelectedAction,
  getSelectedComponents,
  isShowDot,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import {
  flattenAllComponentNodeToMap,
  getCanvas,
  searchDSLByDisplayName,
  searchDsl,
} from "@/redux/currentApp/editor/components/componentsSelector"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { RootState } from "@/store"
import { CopyManager } from "@/utils/copyManager"
import { FocusManager } from "@/utils/focusManager"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { ShortCutContext } from "@/utils/shortcut/shortcutProvider"
import { isMAC } from "@/utils/userAgent"

export const Shortcut: FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const isEditMode = useSelector(getIsILLAEditMode)
  const message = useMessage()

  const currentSelectedComponent = useSelector(getSelectedComponents)
  const currentSelectedComponentNode = useSelector<RootState, ComponentNode[]>(
    (rootState) => {
      const currentSelectedComponentDisplayName =
        getSelectedComponents(rootState)
      const result = currentSelectedComponentDisplayName.map((displayName) => {
        return searchDSLByDisplayName(displayName)
      })
      return result.filter((node) => node) as ComponentNode[]
    },
  )

  const currentSelectedAction = useSelector(getSelectedAction)

  const canvasRootNode = useSelector(getCanvas)
  const executionResult = useSelector(getExecutionResult)
  const freezeState = useSelector(getFreezeState)

  const showShadows = useSelector(isShowDot)

  useHotkeys(
    `${Key.Meta}+s`,
    () => {
      message.success({
        content: t("dont_need_save"),
      })
    },
    {
      enableOnFormTags: true,
      enableOnContentEditable: true,
      preventDefault: true,
      enabled: isEditMode && isMAC(),
    },
    [],
  )

  useHotkeys(
    `${Key.Control}+s`,
    () => {
      message.success({
        content: t("dont_need_save"),
      })
    },
    {
      enableOnFormTags: true,
      enableOnContentEditable: true,
      preventDefault: true,
      enabled: isEditMode && !isMAC(),
    },
  )

  // shortcut
  const [alreadyShowDeleteDialog, setAlreadyShowDeleteDialog] =
    useState<boolean>(false)

  const showDeleteDialog = (
    displayName: string[],
    type?: "widget" | "page",
    options?: Record<string, any>,
  ) => {
    const modal = createModal()
    if (!alreadyShowDeleteDialog && displayName.length > 0) {
      const textList = displayName.join(", ").toString()
      setAlreadyShowDeleteDialog(true)
      const id = modal.show({
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
          setAlreadyShowDeleteDialog(false)
          modal.update(id, { visible: false })
          if (type === "page") {
            trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
              element: "delete_page_modal_delete",
            })
            dispatch(
              componentsActions.deletePageNodeReducer({
                displayName: displayName[0],
                originPageSortedKey: options?.originPageSortedKey || [],
              }),
            )
            return
          }
          trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
            element: "component_delete_modal_delete",
          })
          dispatch(
            componentsActions.deleteComponentNodeReducer({
              displayNames: displayName,
              source: options?.source || "left_delete",
            }),
          )
          dispatch(configActions.clearSelectedComponent())
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
        },
      })
    }
  }

  useHotkeys(
    Key.Backspace,
    () => {
      showDeleteDialog(
        currentSelectedComponent.map((displayName) => {
          return displayName
        }),
        "widget",
        { source: "keyboard" },
      )
    },
    {
      enabled: isEditMode,
    },
    [showDeleteDialog, currentSelectedComponent],
  )

  useHotkeys(
    "d,k",
    (keyboardEvent) => {
      if (keyboardEvent.type === "keydown" && freezeState === false) {
        trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.KEYDOWN, {
          element: "lock_icon",
          parameter2: "lock",
        })
        dispatch(configActions.updateFreezeStateReducer(true))
      } else if (keyboardEvent.type === "keyup" && freezeState === true) {
        trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.KEYUP, {
          element: "lock_icon",
          parameter2: "unlock",
        })
        dispatch(configActions.updateFreezeStateReducer(false))
      }
    },
    { keydown: true, keyup: true, enabled: isEditMode },
    [dispatch, freezeState],
  )

  const selectAllBodyComponentsHandler = useCallback(() => {
    switch (FocusManager.getFocus()) {
      case "none":
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
              const currentDisplayName = viewSortedKey[currentViewIndex]
              bodySectionDisplayName = currentDisplayName
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

  useHotkeys(
    `${Key.Control}+a`,
    (e) => {
      e.preventDefault()
      selectAllBodyComponentsHandler()
    },
    {
      preventDefault: true,
      enabled: isEditMode && !isMAC(),
    },
    [selectAllBodyComponentsHandler],
  )

  useHotkeys(
    `${Key.Meta}+a`,
    (e) => {
      e.preventDefault()
      selectAllBodyComponentsHandler()
    },
    {
      preventDefault: true,
      enabled: isEditMode && isMAC(),
    },
    [selectAllBodyComponentsHandler],
  )

  const copySomethingHandler = useCallback(() => {
    switch (FocusManager.getFocus()) {
      case "none":
        break
      case "canvas":
      case "dataWorkspace_component":
        if (
          currentSelectedComponent != null &&
          currentSelectedComponentNode.length > 0
        ) {
          CopyManager.copyComponentNode(currentSelectedComponentNode)
        }
        break
      case "dataWorkspace_action":
      case "action":
        if (currentSelectedAction != null) {
          CopyManager.copyAction(currentSelectedAction)
        }
        break
      case "widget_picker":
        break
      case "components":
        break
    }
  }, [
    currentSelectedAction,
    currentSelectedComponent,
    currentSelectedComponentNode,
  ])

  useHotkeys(
    `${Key.Meta}+c`,
    () => {
      copySomethingHandler()
    },
    {
      preventDefault: true,
      enabled: isEditMode && isMAC(),
    },
    [copySomethingHandler],
  )

  useHotkeys(
    `${Key.Control}+c`,
    () => {
      copySomethingHandler()
    },
    { preventDefault: true, enabled: isEditMode && !isMAC() },
    [copySomethingHandler],
  )

  useHotkeys(
    `${Key.Meta}+v`,
    () => {
      CopyManager.paste("keyboard")
    },
    {
      preventDefault: true,
      enabled: isEditMode && isMAC(),
    },
    [copySomethingHandler],
  )

  useHotkeys(
    `${Key.Control}+v`,
    () => {
      CopyManager.paste("keyboard")
    },
    { preventDefault: true, enabled: isEditMode && !isMAC() },
    [copySomethingHandler],
  )

  const copyAndPasteHandler = useCallback(() => {
    switch (FocusManager.getFocus()) {
      case "none":
        break
      case "canvas":
      case "dataWorkspace_component":
        if (
          currentSelectedComponent != null &&
          currentSelectedComponentNode.length > 0
        ) {
          CopyManager.copyComponentNode(currentSelectedComponentNode)
        }
        break
      case "dataWorkspace_action":
      case "action":
        if (currentSelectedAction != null) {
          CopyManager.copyAction(currentSelectedAction)
        }
        break
      case "widget_picker":
        break
      case "components":
        break
    }
    CopyManager.paste("keyboard")
  }, [
    currentSelectedAction,
    currentSelectedComponent,
    currentSelectedComponentNode,
  ])

  useHotkeys(
    `${Key.Meta}+d`,
    () => {
      copyAndPasteHandler()
    },
    {
      preventDefault: true,
      enabled: isEditMode && isMAC(),
    },
    [copyAndPasteHandler],
  )

  useHotkeys(
    `${Key.Control}+d`,
    () => {
      copyAndPasteHandler()
    },
    { preventDefault: true, enabled: isEditMode && !isMAC() },
    [copyAndPasteHandler],
  )

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

  useHotkeys(
    Key.Meta,
    (keyboardEvent) => {
      showDotHandler(keyboardEvent.type)
    },
    {
      keydown: true,
      keyup: true,
      preventDefault: true,
      enabled: isEditMode && isMAC(),
    },
    [showDotHandler],
  )

  useHotkeys(
    Key.Control,
    (keyboardEvent) => {
      showDotHandler(keyboardEvent.type)
    },
    {
      keydown: true,
      keyup: true,
      preventDefault: true,
      enabled: isEditMode && !isMAC(),
    },
    [showDotHandler],
  )

  const changeShadowHidden = useCallback(() => {
    if (showShadows) {
      dispatch(configActions.updateShowDot(false))
    }
  }, [dispatch, showShadows])

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
