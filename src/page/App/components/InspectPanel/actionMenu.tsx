import { FC } from "react"
import { useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { DropList } from "@illa-design/dropdown"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { PanelHeaderActionProps } from "./interface"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { configActions } from "@/redux/config/configSlice"
import { widgetBuilder } from "@/widgetLibrary/widgetBuilder"

const { Item } = DropList

export const ActionMenu: FC<PanelHeaderActionProps> = (props) => {
  const {
    widgetDisplayName,
    componentType,
    widgetParentDisplayName,
    handleCloseMenu,
  } = props
  const { t } = useTranslation()

  const dispatch = useDispatch()

  return (
    <DropList width="184px">
      {/*  TODO: aruseito wait document*/}
      {/*<Item*/}
      {/*  key="duplicate"*/}
      {/*  title={t("editor.inspect.header.action_menu.view_documentation")}*/}
      {/*  onClick={() => {*/}
      {/*    //  TODO: wait for redux to find componentType map docs;*/}
      {/*    window.open("https://www.baidu.com")*/}
      {/*    handleCloseMenu()*/}
      {/*  }}*/}
      {/*/>*/}
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
          handleCloseMenu()
        }}
      />
      <Item
        key="delete"
        title={t("editor.inspect.header.action_menu.delete")}
        fontColor={globalColor(`--${illaPrefix}-red-03`)}
        onClick={() => {
          dispatch(
            componentsActions.deleteComponentNodeReducer({
              displayName: widgetDisplayName,
              parentDisplayName: widgetParentDisplayName,
            }),
          )
          dispatch(configActions.clearSelectedComponent())
          handleCloseMenu()
        }}
      />
    </DropList>
  )
}

ActionMenu.displayName = "ActionMenu"
