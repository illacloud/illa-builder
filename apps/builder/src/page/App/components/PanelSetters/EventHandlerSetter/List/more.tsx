import { FC, useState, useCallback } from "react"
import { Dropdown } from "@illa-design/dropdown"
import { MoreIcon } from "@illa-design/icon"
import { moreIconWrapperStyle } from "./style"
import { ActionMenu } from "./actionMenu"
import { MoreProps } from "./interface"

export const More: FC<MoreProps> = props => {
  const { index } = props

  const [actionMenuVisible, setActionMenuVisible] = useState(false)
  const handleCloseActionMenu = useCallback(() => {
    setActionMenuVisible(false)
  }, [])
  return (
    <Dropdown
      popupVisible={actionMenuVisible}
      dropList={
        <ActionMenu index={index} handleCloseMode={handleCloseActionMenu} />
      }
      trigger="click"
      position="bottom-end"
      onVisibleChange={visible => {
        setActionMenuVisible(visible)
      }}
    >
      <div css={moreIconWrapperStyle}>
        <MoreIcon />
      </div>
    </Dropdown>
  )
}

More.displayName = "OptionListSetterMore"
