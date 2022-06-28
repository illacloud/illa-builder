import { FC } from "react"
import { Menu } from "@illa-design/menu"
import { ActionMenuProps } from "@/page/App/components/PanelSetters/OptionListSetter/interface"

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
        handleDeleteItem(index)
        break
      }
    }
    handleCloseMode()
  }

  return (
    <Menu onClickMenuItem={handleClickMenuItem}>
      <Item title="Duplicate" key="Duplicate" />
      <Item title="Delete" key="Delete" />
    </Menu>
  )
}

ActionMenu.displayName = "ActionMenu"
