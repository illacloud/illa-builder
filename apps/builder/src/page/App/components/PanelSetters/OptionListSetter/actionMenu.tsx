import { FC, useContext } from "react"
import { useTranslation } from "react-i18next"
import {
  DropList,
  DropListItem,
  globalColor,
  illaPrefix,
} from "@illa-design/react"
import { OptionListSetterContext } from "@/page/App/components/PanelSetters/OptionListSetter/context/optionListContext"
import { ActionMenuProps } from "@/page/App/components/PanelSetters/OptionListSetter/interface"

export const ActionMenu: FC<ActionMenuProps> = (props) => {
  const { index, handleCloseMode } = props
  const { handleCopyOptionItem, handleDeleteOptionItem } = useContext(
    OptionListSetterContext,
  )
  const { t } = useTranslation()

  return (
    <DropList w="184px">
      <DropListItem
        value="duplicate"
        title={t(
          "editor.inspect.setter_content.option_list.action_menu.duplicate",
        )}
        onClick={() => {
          handleCopyOptionItem(index)
          handleCloseMode()
        }}
      />
      <DropListItem
        value="delete"
        title={t(
          "editor.inspect.setter_content.option_list.action_menu.delete",
        )}
        deleted
        onClick={() => {
          handleDeleteOptionItem(index)
          handleCloseMode()
        }}
      />
    </DropList>
  )
}

ActionMenu.displayName = "ActionMenu"
