import { FC, useEffect, useState } from "react"
import { ShortCutContext } from "@/utils/shortcut/shortcutProvider"
import hotkeys from "hotkeys-js"
import { Modal } from "@illa-design/modal"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { Message } from "@illa-design/message"
import { configActions } from "@/redux/config/configSlice"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { useHotkeys } from "react-hotkeys-hook"
import {
  getIllaMode,
  getSelectedAction,
  getSelectedComponents,
} from "@/redux/config/configSelector"
import { CopyManager } from "@/utils/copyManager"
import { FocusManager } from "@/utils/focusManager"
import { RootState } from "@/store"
import {
  getCanvas,
  searchDSLByDisplayName,
} from "@/redux/currentApp/editor/components/componentsSelector"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

export const Shortcut: FC = ({ children }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const mode = useSelector(getIllaMode)

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

  useHotkeys(
    "command+s,ctrl+s",
    (event) => {
      event.preventDefault()
      Message.success(t("dont_need_save"))
    },
    {
      enabled: mode === "edit",
    },
    [],
  )

  // shortcut
  const [alreadyShowDeleteDialog, setAlreadyShowDeleteDialog] =
    useState<boolean>(false)

  const showDeleteDialog = (displayName: string[]) => {
    if (!alreadyShowDeleteDialog && displayName.length > 0) {
      const textList = displayName.join(", ").toString()
      setAlreadyShowDeleteDialog(true)
      Modal.confirm({
        title: t("editor.component.delete_title", {
          displayName: textList,
        }),
        content: t("editor.component.delete_content", {
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
        },
        onOk: () => {
          setAlreadyShowDeleteDialog(false)
          dispatch(
            componentsActions.deleteComponentNodeReducer({
              displayNames: displayName,
            }),
          )
          dispatch(configActions.clearSelectedComponent())
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
      enabled: mode === "edit",
    },
    [showDeleteDialog, currentSelectedComponent],
  )

  useHotkeys(
    "command+a,ctrl+a",
    (keyboardEvent, hotkeysEvent) => {
      keyboardEvent.preventDefault()
      console.log("FocusManager.getFocus()", FocusManager.getFocus())
      switch (FocusManager.getFocus()) {
        case "none":
          break
        case "canvas": {
          if (canvasRootNode) {
            const childNode = canvasRootNode.childrenNode
            const childNodeDisplayNames = childNode.map((node) => {
              return node.displayName
            })
            dispatch(
              configActions.updateSelectedComponent(childNodeDisplayNames),
            )
          }
        }
      }
    },
    [canvasRootNode],
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
      if (hotkeys.ctrl || hotkeys.command) {
        if (keyboardEvent.type === "keydown") {
          dispatch(configActions.updateShowDot(true))
        } else if (keyboardEvent.type === "keyup") {
          dispatch(configActions.updateShowDot(false))
        }
      }
    },
    { keydown: true, keyup: true, enabled: mode === "edit" },
    [dispatch],
  )

  // cancel show dot
  useEffect(() => {
    const listener = () => {
      dispatch(configActions.updateShowDot(false))
    }
    document.addEventListener("visibilitychange", listener)
    window.addEventListener("blur", listener)
    return () => {
      document.removeEventListener("visibilitychange", listener)
      window.removeEventListener("blur", listener)
    }
  }, [dispatch])

  return (
    <ShortCutContext.Provider value={{ showDeleteDialog }}>
      {children}
    </ShortCutContext.Provider>
  )
}
