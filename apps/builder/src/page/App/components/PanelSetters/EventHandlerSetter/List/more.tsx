import { FC, useCallback, useState } from "react"
import { Dropdown, MoreIcon } from "@illa-design/react"
import { ActionMenu } from "./actionMenu"
import { MoreProps } from "./interface"
import { moreIconWrapperStyle } from "./style"

export const More: FC<MoreProps> = (props) => {
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
      onVisibleChange={(visible) => {
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
