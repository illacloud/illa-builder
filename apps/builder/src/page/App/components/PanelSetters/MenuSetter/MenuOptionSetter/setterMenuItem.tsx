import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { Button, DragPointIcon, Trigger, getColor } from "@illa-design/react"
import { SetterMenuItemProps } from "@/page/App/components/PanelSetters/MenuSetter/MenuOptionSetter/interface"
import {
  deleteButtonContainer,
  setterMenuItemContainerStyle,
  setterSubMenuLabelStyle,
} from "@/page/App/components/PanelSetters/MenuSetter/MenuOptionSetter/style"
import { BaseModal } from "@/page/App/components/PanelSetters/PublicComponent/Modal"

export const SetterMenuItem: FC<SetterMenuItemProps> = (props) => {
  const {
    label,
    value,
    onClickItem,
    onDelete,
    attrPath,
    childrenSetter,
    widgetDisplayName,
  } = props

  const [triggerVisible, setTriggerVisible] = useState(false)

  const { t } = useTranslation()

  return (
    <div
      css={setterMenuItemContainerStyle}
      onClick={() => {
        onClickItem(value)
      }}
    >
      <DragPointIcon
        className="dragIcon"
        fs="16px"
        c={getColor("grayBlue", "04")}
      />
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
            extraElement={
              <div css={deleteButtonContainer}>
                <Button
                  w="100%"
                  variant="light"
                  colorScheme="red"
                  onClick={() => {
                    onDelete()
                  }}
                >
                  {t("editor.inspect.setter_content.menu_setter.delete")}
                </Button>
              </div>
            }
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
