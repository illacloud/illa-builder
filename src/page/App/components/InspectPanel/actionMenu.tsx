import { FC, useContext } from "react"
import { useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { DropList } from "@illa-design/dropdown"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { PanelHeaderActionProps } from "./interface"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { widgetBuilder } from "@/widgetLibrary/widgetBuilder"
import { ShortCutContext } from "@/utils/shortcut/shortcutProvider"

const { Item } = DropList

export const ActionMenu: FC<PanelHeaderActionProps> = (props) => {
  const { widgetDisplayName, componentType } = props
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const shortcut = useContext(ShortCutContext)

  return (
    <DropList width="184px">
      <Item
        key="reset"
        title={t("editor.inspect.header.action_menu.reset_state")}
        onClick={() => {
          const defaultProps = widgetBuilder(componentType).config.defaults
          dispatch(
            componentsActions.updateComponentPropsReducer({
              displayName: widgetDisplayName,
              updateSlice: defaultProps ?? {},
            }),
          )
        }}
      />
      <Item
        key="delete"
        title={t("editor.inspect.header.action_menu.delete")}
        fontColor={globalColor(`--${illaPrefix}-red-03`)}
        onClick={() => {
          shortcut.showDeleteDialog([widgetDisplayName])
        }}
      />
    </DropList>
  )
}

ActionMenu.displayName = "ActionMenu"
