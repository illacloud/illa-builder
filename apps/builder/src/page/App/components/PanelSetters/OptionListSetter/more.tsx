import { FC, useCallback, useState } from "react"
import { Dropdown, MoreIcon } from "@illa-design/react"
import { ActionMenu } from "@/page/App/components/PanelSetters/OptionListSetter/actionMenu"
import { MoreProps } from "@/page/App/components/PanelSetters/OptionListSetter/interface"

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
      <div>
        <MoreIcon />
      </div>
    </Dropdown>
  )
}

More.displayName = "OptionListSetterMore"
