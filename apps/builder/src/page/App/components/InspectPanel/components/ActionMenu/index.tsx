import { FC, useCallback, useContext } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { DropList, DropListItem } from "@illa-design/react"
import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import { ShortCutContext } from "@/utils/shortcut/shortcutProvider"
import { widgetBuilder } from "@/widgetLibrary/widgetBuilder"
import { PanelHeaderActionProps } from "./interface"

export const ActionMenu: FC<PanelHeaderActionProps> = (props) => {
  const { widgetDisplayName, componentType } = props
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const shortcut = useContext(ShortCutContext)

  const handleClickDropListItem = useCallback(() => {
    const defaults = widgetBuilder(componentType)?.config?.defaults
    if (!widgetDisplayName) return
    let defaultProps: unknown = defaults
    if (typeof defaults === "function") {
      defaultProps = defaults()
    }
    if (typeof defaultProps !== "object") return

    dispatch(
      componentsActions.updateComponentPropsReducer({
        displayName: widgetDisplayName,
        updateSlice: (defaultProps as Record<string, unknown>) || {},
      }),
    )
  }, [componentType, dispatch, widgetDisplayName])

  return (
    <DropList w="184px">
      <DropListItem
        value="reset"
        key="reset"
        title={t("editor.inspect.header.action_menu.reset_state")}
        onClick={handleClickDropListItem}
      />
      <DropListItem
        key="delete"
        value="delete"
        title={t("editor.inspect.header.action_menu.delete")}
        deleted
        onClick={() => {
          shortcut.showDeleteDialog([widgetDisplayName], "widget", {
            source: "left_delete",
          })
        }}
      />
    </DropList>
  )
}

ActionMenu.displayName = "ActionMenu"
