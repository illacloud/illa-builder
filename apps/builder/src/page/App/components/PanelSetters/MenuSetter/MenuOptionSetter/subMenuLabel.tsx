import { FC, useCallback, useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { DragPointIcon } from "@illa-design/icon"
import { Trigger } from "@illa-design/trigger"
import {
  deleteButtonStyle,
  dragItemStyle,
  iconAreaStyle,
  labelNameAndIconStyle,
  labelNameWrapperStyle,
  movableIconWrapperStyle,
  subMenuItemStyle,
} from "./style"
import { SubMenuLabelProps } from "./interface"
import { BaseModal } from "@/page/App/components/PanelSetters/PublicComponent/Modal"
import { MenuListSetterContext } from "./context/menuListContext"
import { Button } from "@illa-design/button"

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
              Delete
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
