import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { Button, DragPointIcon, Trigger, getColor } from "@illa-design/react"
import { SetterSubMenuProps } from "@/page/App/components/InspectPanel/PanelSetters/MenuSetter/MenuOptionSetter/interface"
import { NewButton } from "@/page/App/components/InspectPanel/PanelSetters/MenuSetter/MenuOptionSetter/newButton"
import {
  deleteButtonContainer,
  setterSubMenuAllContainerStyle,
  setterSubMenuContainerStyle,
  setterSubMenuLabelStyle,
} from "@/page/App/components/InspectPanel/PanelSetters/MenuSetter/MenuOptionSetter/style"
import { BaseModal } from "@/page/App/components/InspectPanel/PanelSetters/PublicComponent/Modal"

export const SetterSubMenu: FC<SetterSubMenuProps> = (props) => {
  const {
    id,
    label,
    value,
    onDelete,
    onClickAdd,
    children,
    attrPath,
    childrenSetter,
    widgetDisplayName,
    onClick,
  } = props

  const { t } = useTranslation()

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(
      transform
        ? {
            y: transform?.y ?? 0,
            x: transform?.x ?? 0,
            scaleX: 1,
            scaleY: 1,
          }
        : null,
    ),
    transition,
  }

  const [triggerVisible, setTriggerVisible] = useState(false)

  return (
    <div
      css={setterSubMenuAllContainerStyle}
      ref={setNodeRef}
      style={style}
      onClick={onClick}
      {...attributes}
    >
      <div css={setterSubMenuContainerStyle}>
        <DragPointIcon
          className="dragIcon"
          fs="16px"
          c={getColor("grayBlue", "04")}
          {...listeners}
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
        <NewButton
          title={t("editor.inspect.setter_content.menu_setter.sub")}
          onClick={() => {
            onClickAdd(value)
          }}
        />
      </div>
      {children}
    </div>
  )
}

SetterSubMenu.displayName = "SetterSubMenu"
