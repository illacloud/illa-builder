import { FC, useState, useCallback } from "react"
import { ActionMenu } from "@/page/App/components/PanelSetters/OptionListSetter/ActionMenu"
import { MoreIcon } from "@illa-design/icon"
import { Trigger } from "@illa-design/trigger"
import { MoreProps } from "@/page/App/components/PanelSetters/OptionListSetter/interface"

export const More: FC<MoreProps> = (props) => {
  const { index, handleCopyItem, handleDeleteItem } = props
  const [actionMenuVisible, setActionMenuVisible] = useState(false)
  const handleCloseActionMenu = useCallback(() => {
    setActionMenuVisible(false)
  }, [])
  return (
    <Trigger
      colorScheme="white"
      popupVisible={actionMenuVisible}
      content={
        <ActionMenu
          index={index}
          handleCopyItem={handleCopyItem}
          handleDeleteItem={handleDeleteItem}
          handleCloseMode={handleCloseActionMenu}
        />
      }
      trigger="click"
      showArrow={false}
      position="br"
      clickOutsideToClose
      onVisibleChange={(visible) => {
        setActionMenuVisible(visible)
      }}
    >
      <div>
        <MoreIcon />
      </div>
    </Trigger>
  )
}
