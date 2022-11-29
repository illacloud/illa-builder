import { FC, useContext } from "react"
import { useTranslation } from "react-i18next"
import { DropList, globalColor, illaPrefix } from "@illa-design/react"
import { ActionMenuProps } from "@/page/App/components/PanelSetters/OptionListSetter/interface"
import { OptionListSetterContext } from "@/page/App/components/PanelSetters/OptionListSetter/context/optionListContext"

const { Item } = DropList

export const ActionMenu: FC<ActionMenuProps> = (props) => {
  const { index, handleCloseMode } = props
  const { handleCopyOptionItem, handleDeleteOptionItem } = useContext(
    OptionListSetterContext,
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
          handleCopyOptionItem(index)
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
          handleDeleteOptionItem(index)
          handleCloseMode()
        }}
      />
    </DropList>
  )
}

ActionMenu.displayName = "ActionMenu"
