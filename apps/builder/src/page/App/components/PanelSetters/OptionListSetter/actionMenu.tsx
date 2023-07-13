import { FC, useCallback, useContext } from "react"
import { useTranslation } from "react-i18next"
import { DropList, DropListItem, useModal } from "@illa-design/react"
import { OptionListSetterContext } from "@/page/App/components/PanelSetters/OptionListSetter/context/optionListContext"
import { ActionMenuProps } from "@/page/App/components/PanelSetters/OptionListSetter/interface"

export const ActionMenu: FC<ActionMenuProps> = (props) => {
  const { index, label, handleCloseMode } = props
  const { handleCopyOptionItem, handleDeleteOptionItem } = useContext(
    OptionListSetterContext,
  )
  const { t } = useTranslation()
  const modal = useModal()
  const handleDeleteClick = useCallback(() => {
    modal.show({
      id: "deleteOptionItem",
      title: t("editor.component.delete_title", {
        displayName: label,
      }),
      children: t("editor.component.delete_content"),
      cancelText: t("editor.component.cancel"),
      okText: t("editor.component.delete"),
      okButtonProps: {
        colorScheme: "red",
      },
      onOk: () => {
        handleDeleteOptionItem(index)
        handleCloseMode()
      },
    })
  }, [handleCloseMode, handleDeleteOptionItem, index, label, modal, t])

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
        onClick={handleDeleteClick}
      />
    </DropList>
  )
}

ActionMenu.displayName = "ActionMenu"
