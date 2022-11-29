import { FC, useCallback, useContext } from "react"
import { useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { DropList, globalColor, illaPrefix } from "@illa-design/react"
import { PanelHeaderActionProps } from "./interface"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { widgetBuilder } from "@/widgetLibrary/widgetBuilder"
import { ShortCutContext } from "@/utils/shortcut/shortcutProvider"
import { searchDSLByDisplayName } from "@/redux/currentApp/editor/components/componentsSelector"
import { getNewWidgetPropsByUpdateSlice } from "@/utils/componentNode"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

const { Item } = DropList

export const ActionMenu: FC<PanelHeaderActionProps> = (props) => {
  const { widgetDisplayName, componentType } = props
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const shortcut = useContext(ShortCutContext)

  const handleClickDropListItem = useCallback(() => {
    const defaultProps = widgetBuilder(componentType).config.defaults
    if (!widgetDisplayName) return
    const targetNode = searchDSLByDisplayName(
      widgetDisplayName,
    ) as ComponentNode
    const newComponentNode: ComponentNode = {
      ...targetNode,
      props: {
        ...defaultProps,
      },
    }
    newComponentNode.props = getNewWidgetPropsByUpdateSlice(
      newComponentNode.displayName as string,
      newComponentNode.props || {},
      newComponentNode.props || {},
    )
    dispatch(componentsActions.resetComponentPropsReducer(newComponentNode))
  }, [componentType, dispatch, widgetDisplayName])

  return (
    <DropList width="184px">
      <Item
        key="reset"
        title={t("editor.inspect.header.action_menu.reset_state")}
        onClick={handleClickDropListItem}
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
