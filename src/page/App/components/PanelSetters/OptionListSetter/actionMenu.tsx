import { FC, SyntheticEvent } from "react"
import { css } from "@emotion/react"
import { ActionMenuProps } from "@/page/App/components/PanelSetters/OptionListSetter/interface"
import {
  actionMenuContaninterStyle,
  baseActionMenuItemStyle,
  deleteActionMenuItemStyle,
} from "@/page/App/components/InspectPanel/style"

export const ActionMenu: FC<ActionMenuProps> = (props) => {
  const { index, handleCopyItem, handleCloseMode, handleDeleteItem } = props
  const handleClickMenuItem = (e: SyntheticEvent<EventTarget>) => {
    if (!(e.target instanceof HTMLDivElement)) {
      return
    }
    const key = e.target.dataset["key"]
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
    <div css={actionMenuContaninterStyle} onClick={handleClickMenuItem}>
      <div css={baseActionMenuItemStyle} data-key="Duplicate">
        Duplicate
      </div>
      <div
        css={css(baseActionMenuItemStyle, deleteActionMenuItemStyle)}
        data-key="Delete"
      >
        Delete
      </div>
    </div>
  )
}

ActionMenu.displayName = "ActionMenu"
