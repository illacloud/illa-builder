import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { DragPointIcon, Trigger, getColor } from "@illa-design/react"
import { SetterSubMenuProps } from "@/page/App/components/PanelSetters/MenuSetter/MenuOptionSetter/interface"
import { NewButton } from "@/page/App/components/PanelSetters/MenuSetter/MenuOptionSetter/newButton"
import {
  setterDivStyle,
  setterSubMenuContainerStyle,
  setterSubMenuLabelStyle,
} from "@/page/App/components/PanelSetters/MenuSetter/MenuOptionSetter/style"
import { BaseModal } from "@/page/App/components/PanelSetters/PublicComponent/Modal"

export const SetterSubMenu: FC<SetterSubMenuProps> = (props) => {
  const {
    label,
    value,
    onClickAdd,
    children,
    attrPath,
    childrenSetter,
    widgetDisplayName,
    onClick,
  } = props

  const { t } = useTranslation()

  const [triggerVisible, setTriggerVisible] = useState(false)

  return (
    <>
      <div css={setterSubMenuContainerStyle} onClick={onClick}>
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
        <div css={setterDivStyle} />
        <NewButton
          title={t("editor.inspect.setter_content.menu_setter.sub")}
          onClick={() => {
            onClickAdd(value)
          }}
        />
      </div>
      {children}
    </>
  )
}

SetterSubMenu.displayName = "SetterSubMenu"
