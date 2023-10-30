import { FC, useContext } from "react"
import { useTranslation } from "react-i18next"
import { DropList, DropListItem } from "@illa-design/react"
import { BaseEventHandlerContext } from "@/page/App/components/InspectPanel/PanelSetters/EventHandlerSetter/context"
import { ActionMenuProps } from "./interface"

export const ActionMenu: FC<ActionMenuProps> = (props) => {
  const { index, handleCloseMode } = props
  const { handleCopyEventItem, handleDeleteEventItem } = useContext(
    BaseEventHandlerContext,
  )
  const { t } = useTranslation()

  return (
    <DropList w="184px">
      <DropListItem
        key="duplicate"
        value="duplicate"
        title={t(
          "editor.inspect.setter_content.option_list.action_menu.duplicate",
        )}
        onClick={() => {
          handleCopyEventItem(index)
          handleCloseMode()
        }}
      />
      <DropListItem
        key="delete"
        value="delete"
        title={t(
          "editor.inspect.setter_content.option_list.action_menu.delete",
        )}
        deleted
        onClick={() => {
          handleDeleteEventItem(index)
          handleCloseMode()
        }}
      />
    </DropList>
  )
}

ActionMenu.displayName = "ActionMenu"
