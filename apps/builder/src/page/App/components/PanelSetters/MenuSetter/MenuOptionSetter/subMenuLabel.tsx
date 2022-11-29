import { MenuListSetterContext } from "./context/menuListContext"
import { SubMenuLabelProps } from "./interface"
import {
  deleteButtonStyle,
  dragItemStyle,
  iconAreaStyle,
  labelNameAndIconStyle,
  labelNameWrapperStyle,
  modalStyle,
  movableIconWrapperStyle,
  subMenuItemStyle,
} from "./style"
import { BaseModal } from "@/page/App/components/PanelSetters/PublicComponent/Modal"
import { DragPointIcon, Trigger, Button } from "@illa-design/react"
import { FC, useCallback, useContext, useState } from "react"
import { useTranslation } from "react-i18next"

export const SubMenuLabel: FC<SubMenuLabelProps> = (props) => {
  const { index, subIndex, title, attrPath } = props
  const [modalVisible, setModalVisible] = useState(false)
  const { widgetDisplayName, childrenSetter, handleDeleteSubMenuItem } =
    useContext(MenuListSetterContext)

  const { t } = useTranslation()

  const handleCloseModal = useCallback(() => {
    setModalVisible(false)
  }, [])

  return (
    <Trigger
      withoutPadding
      colorScheme="white"
      popupVisible={modalVisible}
      content={
        <BaseModal
          _css={modalStyle}
          title={title ?? ""}
          handleCloseModal={handleCloseModal}
          attrPath={attrPath}
          widgetDisplayName={widgetDisplayName}
          childrenSetter={childrenSetter}
          extraElement={
            <Button
              css={deleteButtonStyle}
              colorScheme="red"
              variant="light"
              onClick={() => {
                handleDeleteSubMenuItem(index, subIndex)
              }}
            >
              {t("editor.inspect.setter_content.menu_setter.delete")}
            </Button>
          }
        />
      }
      trigger="click"
      showArrow={false}
      position="left"
      clickOutsideToClose
      onVisibleChange={(visible) => {
        setModalVisible(visible)
      }}
    >
      <div css={[dragItemStyle, subMenuItemStyle]}>
        <div css={labelNameAndIconStyle}>
          <span css={movableIconWrapperStyle} className="movableIconWrapper">
            <DragPointIcon />
          </span>
          <span css={labelNameWrapperStyle}>
            {title ||
              t("editor.inspect.setter_content.option_list.list_no_label")}
          </span>
        </div>
        <div css={iconAreaStyle}></div>
      </div>
    </Trigger>
  )
}

SubMenuLabel.displayName = "SubMenuLabel"
