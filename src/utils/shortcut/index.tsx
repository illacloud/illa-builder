import { FC, useState } from "react"
import { ShortCutContext } from "@/utils/shortcut/shortcutProvider"
import hotkeys from "hotkeys-js"
import store from "@/store"
import { Modal } from "@illa-design/modal"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { Message } from "@illa-design/message"
import { configActions } from "@/redux/config/configSlice"
import { useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { useHotkeys } from "react-hotkeys-hook"

export const Shortcut: FC = ({ children }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  useHotkeys(
    "command+s,ctrl+s",
    (event, handler) => {
      event.preventDefault()
      Message.success(t("dont_need_save"))
    },
    [],
  )

  // shortcut
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false)

  useHotkeys(
    "Backspace",
    (event, handler) => {
      if (!showDeleteDialog) {
        setShowDeleteDialog(true)
        event.preventDefault()
        const textList = store
          .getState()
          .config.selectedComponents.map((item) => {
            return item.displayName
          })
          .join(", ")
          .toString()
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
            colorScheme: "techPurple",
          },
          closable: true,
          onCancel: () => {
            setShowDeleteDialog(false)
          },
          onOk: () => {
            setShowDeleteDialog(false)
            dispatch(
              componentsActions.deleteComponentNodeReducer({
                displayName: store
                  .getState()
                  .config.selectedComponents.map((item) => {
                    return item.displayName
                  }),
              }),
            )
          },
        })
      }
    },
    [showDeleteDialog],
  )

  useHotkeys(
    "*",
    (keyboardEvent, handler) => {
      if (hotkeys.ctrl || hotkeys.command) {
        if (keyboardEvent.type === "keydown") {
          dispatch(configActions.updateShowDot(true))
        } else if (keyboardEvent.type === "keyup") {
          dispatch(configActions.updateShowDot(false))
        }
      }
    },
    { keydown: true, keyup: true },
    [showDeleteDialog],
  )

  return (
    <ShortCutContext.Provider value={{}}>{children}</ShortCutContext.Provider>
  )
}
