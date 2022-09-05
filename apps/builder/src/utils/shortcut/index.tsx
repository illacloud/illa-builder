import { FC, useCallback, useEffect, useState } from "react"
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
  getSelectedComponents,
} from "@/redux/config/configSelector"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import copy from "copy-to-clipboard"

export const Shortcut: FC = ({ children }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const mode = useSelector(getIllaMode)

  const currentSelectedComponent = useSelector(getSelectedComponents)

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

  const copyComponentFromObject = useCallback(
    (
      componentNodeList: ComponentNode[],
      offsetX?: number,
      offsetY?: number,
    ) => {
      dispatch(
        componentsActions.copyComponentNodeReducer({
          componentNodeList: componentNodeList,
          offsetX: offsetX ?? 0,
          offsetY: offsetY ?? 0,
        }),
      )
    },
    [dispatch],
  )

  useHotkeys(
    "Backspace",
    (event) => {
      event.preventDefault()
      showDeleteDialog(
        currentSelectedComponent.map((item) => {
          return item.displayName
        }),
      )
    },
    {
      enabled: mode === "edit",
    },
    [showDeleteDialog, currentSelectedComponent],
  )

  useHotkeys(
    "command+c,command+v,ctrl+c,ctrl+v",
    (keyboardEvent, hotkeysEvent) => {
      switch (hotkeysEvent.shortcut) {
        case "ctrl+c":
        case "command+c":
          if (currentSelectedComponent.length > 0) {
            copy(
              JSON.stringify(
                currentSelectedComponent.map((item) => {
                  return item.displayName
                }),
              ),
            )
          }
          break
        case "command+v":
        case "ctrl+v":
          navigator.clipboard.readText().then((text) => {
            if (text.length > 0) {
              try {
                const displayNameList = JSON.parse(text) as string[]
                if (displayNameList != null && displayNameList.length > 0) {
                  dispatch(
                    componentsActions.copyComponentNodeFromDisplayNamesReducer({
                      displayNameList: displayNameList,
                      offsetX: 0,
                      offsetY: 0,
                    }),
                  )
                }
              } catch (ignore) {}
            }
          })
          break
      }
    },
    [currentSelectedComponent],
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
    <ShortCutContext.Provider
      value={{ showDeleteDialog, copyComponentFromObject }}
    >
      {children}
    </ShortCutContext.Provider>
  )
}
