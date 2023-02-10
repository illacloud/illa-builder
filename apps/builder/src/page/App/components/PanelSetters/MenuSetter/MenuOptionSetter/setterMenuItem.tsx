import { FC, useState } from "react"
import { DragPointIcon, Trigger, getColor } from "@illa-design/react"
import { SetterMenuItemProps } from "@/page/App/components/PanelSetters/MenuSetter/MenuOptionSetter/interface"
import {
  setterMenuItemContainerStyle,
  setterSubMenuLabelStyle,
} from "@/page/App/components/PanelSetters/MenuSetter/MenuOptionSetter/style"
import { BaseModal } from "@/page/App/components/PanelSetters/PublicComponent/Modal"

export const SetterMenuItem: FC<SetterMenuItemProps> = (props) => {
  const {
    label,
    value,
    onClickItem,
    attrPath,
    childrenSetter,
    widgetDisplayName,
  } = props

  const [triggerVisible, setTriggerVisible] = useState(false)

  return (
    <div
      css={setterMenuItemContainerStyle}
      onClick={() => {
        onClickItem(value)
      }}
    >
      <DragPointIcon fs="16px" c={getColor("grayBlue", "04")} />
      <Trigger
        withoutPadding
        colorScheme="white"
        trigger="click"
        onVisibleChange={(visible) => {
          setTriggerVisible(visible)
        }}
        popupVisible={triggerVisible}
        content={
          <BaseModal
            title={label as string}
            attrPath={`${attrPath}`}
            widgetDisplayName={widgetDisplayName}
            childrenSetter={childrenSetter}
            handleCloseModal={() => {
              setTriggerVisible(false)
            }}
          />
        }
        showArrow={false}
        position="left"
        clickOutsideToClose
      >
        <span css={setterSubMenuLabelStyle}>{label}</span>
      </Trigger>
    </div>
  )
}

SetterMenuItem.displayName = "SetterMenuItem"
