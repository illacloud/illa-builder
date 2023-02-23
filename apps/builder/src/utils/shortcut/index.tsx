import { FC, ReactNode, useCallback, useEffect, useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { createModal, useMessage } from "@illa-design/react"
import {
  getFreezeState,
  getIsILLAEditMode,
  getSelectedAction,
  getSelectedComponents,
  isShowDot,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import {
  clearComponentAttachedUsersHandler,
  updateSelectedComponentUsersHandler,
} from "@/redux/currentApp/collaborators/collaboratorsHandlers"
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
import { ShortCutContext } from "@/utils/shortcut/shortcutProvider"

export const Shortcut: FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const isEditMode = useSelector(getIsILLAEditMode)
  const message = useMessage()

  const currentSelectedComponent = useSelector(getSelectedComponents)
  const currentSelectedComponentNode = useSelector<RootState, ComponentNode[]>(
    (rootState) => {
      const result = currentSelectedComponent.map((displayName) => {
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
    "command+s,ctrl+s",
    (event) => {
      event.preventDefault()
      message.success({
        content: t("dont_need_save"),
      })
    },
    {
      enabled: isEditMode,
    },
    [],
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
            dispatch(
              componentsActions.deletePageNodeReducer({
                displayName: displayName[0],
                originPageSortedKey: options?.originPageSortedKey || [],
              }),
            )
            return
          }
          dispatch(
            componentsActions.deleteComponentNodeReducer({
              displayNames: displayName,
            }),
          )
          dispatch(configActions.clearSelectedComponent())
          clearComponentAttachedUsersHandler(displayName)
        },
      })
    }
  }

  useHotkeys(
    "Backspace",
    (event) => {
      event.preventDefault()
      showDeleteDialog(
        currentSelectedComponent.map((displayName) => {
          return displayName
        }),
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
        dispatch(configActions.updateFreezeStateReducer(true))
      } else if (keyboardEvent.type === "keyup" && freezeState === true) {
        dispatch(configActions.updateFreezeStateReducer(false))
      }
    },
    { keydown: true, keyup: true, enabled: isEditMode },
    [dispatch, freezeState],
  )

  useHotkeys(
    "command+a,ctrl+a",
    (keyboardEvent) => {
      keyboardEvent.preventDefault()
      switch (FocusManager.getFocus()) {
        case "none":
          break
        case "canvas": {
          if (canvasRootNode) {
            const childNodeDisplayNames: string[] = []
            const rootNode = executionResult.root
            if (!rootNode) return
            const currentPageDisplayName =
              rootNode.pageSortedKey[rootNode.currentPageIndex]
            const pageNode = searchDsl(canvasRootNode, currentPageDisplayName)
            if (!pageNode) return
            const sectionContainerNodeDisplayName: string[] = []
            pageNode.childrenNode.forEach((sectionNode) => {
              const displayName = sectionNode.displayName
              const currentSectionProps = executionResult[displayName]
              if (
                currentSectionProps &&
                currentSectionProps.viewSortedKey &&
                currentSectionProps.currentViewIndex >= 0
              ) {
                const { currentViewIndex, viewSortedKey } = currentSectionProps
                const currentDisplayName = viewSortedKey[currentViewIndex]
                sectionContainerNodeDisplayName.push(currentDisplayName)
              }
            })
            const componentNodesMap = flattenAllComponentNodeToMap(pageNode)
            const allChildrenNodes: ComponentNode[] = []
            sectionContainerNodeDisplayName.forEach((displayName) => {
              if (componentNodesMap[displayName]) {
                const childrenNode = Array.isArray(
                  componentNodesMap[displayName].childrenNode,
                )
                  ? componentNodesMap[displayName].childrenNode
                  : []
                allChildrenNodes.push(...childrenNode)
              }
            })

            allChildrenNodes.forEach((node) => {
              childNodeDisplayNames.push(node.displayName)
            })

            dispatch(
              configActions.updateSelectedComponent(childNodeDisplayNames),
            )
            updateSelectedComponentUsersHandler(childNodeDisplayNames)
          }
        }
      }
    },
    [canvasRootNode, executionResult],
  )

  useHotkeys(
    "command+c,command+v,ctrl+c,ctrl+v,command+d,ctrl+d",
    (keyboardEvent, hotkeysEvent) => {
      switch (hotkeysEvent.shortcut) {
        case "ctrl+c":
        case "command+c":
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
          break
        case "command+v":
        case "ctrl+v":
          CopyManager.paste()
          break
        case "command+d":
        case "ctrl+d":
          keyboardEvent.preventDefault()
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
          CopyManager.paste()
          break
      }
    },
    [currentSelectedComponent, currentSelectedAction],
  )

  useHotkeys(
    "*",
    (keyboardEvent) => {
      if (keyboardEvent.key === "Meta" || keyboardEvent.key === "Ctrl") {
        if (keyboardEvent.type === "keydown") {
          dispatch(configActions.updateShowDot(true))
        } else if (keyboardEvent.type === "keyup") {
          dispatch(configActions.updateShowDot(false))
        }
      }
    },
    { keydown: true, keyup: true, enabled: isEditMode },
    [dispatch],
  )

  const changeShadowHidden = useCallback(() => {
    if (showShadows) {
      dispatch(configActions.updateShowDot(false))
    }
  }, [dispatch, showShadows])

  // cancel show dot
  useEffect(() => {
    if (isEditMode) {
      document.addEventListener("visibilitychange", changeShadowHidden)
      window.addEventListener("blur", changeShadowHidden)
    }

    return () => {
      if (isEditMode) {
        document.removeEventListener("visibilitychange", changeShadowHidden)
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
