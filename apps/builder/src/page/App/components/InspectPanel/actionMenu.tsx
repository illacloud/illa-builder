import { FC, useCallback, useContext } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import {
  DropList,
  DropListItem,
  globalColor,
  illaPrefix,
} from "@illa-design/react"
import { searchDSLByDisplayName } from "@/redux/currentApp/editor/components/componentsSelector"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { getNewWidgetPropsByUpdateSlice } from "@/utils/componentNode"
import { ShortCutContext } from "@/utils/shortcut/shortcutProvider"
import { widgetBuilder } from "@/widgetLibrary/widgetBuilder"
import { PanelHeaderActionProps } from "./interface"

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
          shortcut.showDeleteDialog([widgetDisplayName])
        }}
      />
    </DropList>
  )
}

ActionMenu.displayName = "ActionMenu"
