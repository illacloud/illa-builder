import { FC } from "react"
import { Menu } from "@illa-design/menu"
import { ACTION_TYPE, PanelHeaderActionProps } from "./interface"
import { useDispatch } from "react-redux"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { configActions } from "@/redux/config/configSlice"

const Item = Menu.Item

export const ActionMenu: FC<PanelHeaderActionProps> = (props) => {
  const { widgetDisplayName, componentType, widgetParentDisplayName } = props
  const dispatch = useDispatch()
  const handleClickMenuItem = (key: string) => {
    switch (key) {
      case ACTION_TYPE.VIEW_DOCUMENT: {
        //  TODO: wait for redux to find componentType map docs;
        // getComponentDoc(componentType)
        window.open("https://www.baidu.com")
        break
      }
      case ACTION_TYPE.SWITCH_COMPONENT: {
        //  TODO: wait to do smt
        console.log("SwitchComponent")
        break
      }
      case ACTION_TYPE.RESET_STATE: {
        //  TODO: wait for componentDSL to change redux DSL
        console.log("ResetState")
        break
      }
      case ACTION_TYPE.DELETE: {
        //  TODO: wait for redux to delete node
        dispatch(
          componentsActions.deleteComponentNodeReducer({
            displayName: widgetDisplayName,
            parentDisplayName: widgetParentDisplayName,
          }),
        )
        dispatch(configActions.clearSelectedComponent(null))
        break
      }
    }
  }

  // TODO: wait for design to change style
  return (
    <Menu style={{ width: "200px" }} onClickMenuItem={handleClickMenuItem}>
      <Item title="View documentation" key={ACTION_TYPE.VIEW_DOCUMENT} />
      <Item title="Switch component" key={ACTION_TYPE.SWITCH_COMPONENT} />
      <Item title="Reset state" key={ACTION_TYPE.RESET_STATE} />
      <Item title="delete" key={ACTION_TYPE.DELETE} />
    </Menu>
  )
}

ActionMenu.displayName = "ActionMenu"
