import { FC } from "react"
import { Menu } from "@illa-design/menu"
import { ActionMenuProps } from "@/page/Editor/components/PanelSetters/OptionListSetter/interface"

const Item = Menu.Item

export const ActionMenu: FC<ActionMenuProps> = (props) => {
  const { index, handleCopyItem, handleCloseMode, handleDeleteItem } = props
  const handleClickMenuItem = (key: string) => {
    switch (key) {
      case "Duplicate": {
        handleCopyItem(index)
        break
      }
      case "Delete": {
        //  TODO: wait to do smt
        handleDeleteItem(index)
        break
      }
    }
    handleCloseMode()
  }

  // TODO: wait for design to change style
  return (
    <Menu style={{ width: "200px" }} onClickMenuItem={handleClickMenuItem}>
      <Item title="Duplicate" key="Duplicate" />
      <Item title="Delete" key="Delete" />
    </Menu>
  )
}

ActionMenu.displayName = "ActionMenu"
