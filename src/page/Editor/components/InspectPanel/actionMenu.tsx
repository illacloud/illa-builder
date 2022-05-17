import { FC } from "react"
import { Menu } from "@illa-design/menu"
import { ACTION_TYPE, PanelHeaderActionProps } from "./interface"

const Item = Menu.Item

const ActionMenu: FC<PanelHeaderActionProps> = (props) => {
  const { componentId, componentType } = props
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
        console.log("Delete")
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

export default ActionMenu
