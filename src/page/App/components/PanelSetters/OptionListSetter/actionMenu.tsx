import { FC, SyntheticEvent } from "react"
import { css } from "@emotion/react"
import { useTranslation } from "react-i18next"
import {
  ActionMenuProps,
  ActionType,
} from "@/page/App/components/PanelSetters/OptionListSetter/interface"
import {
  actionMenuContainerStyle,
  baseActionMenuItemStyle,
  deleteActionMenuItemStyle,
} from "@/page/App/components/InspectPanel/style"

export const ActionMenu: FC<ActionMenuProps> = (props) => {
  const { index, handleCopyItem, handleCloseMode, handleDeleteItem } = props
  const { t } = useTranslation()

  const handleClickMenuItem = (e: SyntheticEvent<EventTarget>) => {
    if (!(e.target instanceof HTMLDivElement)) {
      return
    }
    const key = e.target.dataset["key"]
    switch (key) {
      case ActionType.DUPLICATE: {
        handleCopyItem(index)
        break
      }
      case ActionType.DELETE: {
        handleDeleteItem(index)
        break
      }
    }
    handleCloseMode()
  }

  return (
    <div css={actionMenuContainerStyle} onClick={handleClickMenuItem}>
      <div css={baseActionMenuItemStyle} data-key={ActionType.DUPLICATE}>
        {t("editor.inspect.setter_content.option_list.action_menu.duplicate")}
      </div>
      <div
        css={css(baseActionMenuItemStyle, deleteActionMenuItemStyle)}
        data-key={ActionType.DELETE}
      >
        {t("editor.inspect.setter_content.option_list.action_menu.delete")}
      </div>
    </div>
  )
}

ActionMenu.displayName = "ActionMenu"
