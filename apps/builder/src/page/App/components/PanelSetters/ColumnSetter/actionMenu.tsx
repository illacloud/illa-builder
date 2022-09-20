import { FC, useContext } from "react"
import { useTranslation } from "react-i18next"
import { DropList } from "@illa-design/dropdown"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { ActionMenuProps } from "./interface"
import { ColumnListSetterContext } from "./context/columnListContext"

const { Item } = DropList

export const ActionMenu: FC<ActionMenuProps> = (props) => {
  const { index, handleCloseMode } = props
  const { handleCopyColumnItem, handleDeleteColumnItem } = useContext(
    ColumnListSetterContext
  )
  const { t } = useTranslation()

  return (
    <DropList width="184px">
      <Item
        key="duplicate"
        title={t(
          "editor.inspect.setter_content.option_list.action_menu.duplicate",
        )}
        onClick={() => {
          handleCopyColumnItem(index)
          handleCloseMode()
        }}
      />
      <Item
        key="delete"
        title={t(
          "editor.inspect.setter_content.option_list.action_menu.delete",
        )}
        fontColor={globalColor(`--${illaPrefix}-red-03`)}
        onClick={() => {
          handleDeleteColumnItem(index)
          handleCloseMode()
        }}
      />
    </DropList>
  )
}

ActionMenu.displayName = "ActionMenu"
