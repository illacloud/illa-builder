import { FC, useCallback, useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { DragPointIcon, AddIcon, Trigger, Button } from "@illa-design/react"
import {
  addIconStyle,
  deleteButtonStyle,
  dragItemStyle,
  iconAreaStyle,
  labelNameAndIconStyle,
  labelNameWrapperStyle,
  modalStyle,
  movableIconWrapperStyle,
} from "./style"
import { DragIconAndLabelProps } from "./interface"
import { BaseModal } from "@/page/App/components/PanelSetters/PublicComponent/Modal"
import { MenuListSetterContext } from "./context/menuListContext"

export const DragIconAndLabel: FC<DragIconAndLabelProps> = (props) => {
  const { index, title } = props
  const [modalVisible, setModalVisible] = useState(false)
  const {
    widgetDisplayName,
    attrPath,
    childrenSetter,
    handleAddSubMenuItem,
    handleDeleteMenuItem,
  } = useContext(MenuListSetterContext)

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
          attrPath={`${attrPath}.${index}`}
          widgetDisplayName={widgetDisplayName}
          childrenSetter={childrenSetter}
          extraElement={
            <Button
              css={deleteButtonStyle}
              colorScheme="red"
              variant="light"
              onClick={() => {
                handleDeleteMenuItem(index)
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
      <div css={dragItemStyle}>
        <div css={labelNameAndIconStyle}>
          <span css={movableIconWrapperStyle} className="movableIconWrapper">
            <DragPointIcon />
          </span>
          <span css={labelNameWrapperStyle}>
            {title ||
              t("editor.inspect.setter_content.option_list.list_no_label")}
          </span>
        </div>
        <div
          css={iconAreaStyle}
          onClick={(event) => {
            handleAddSubMenuItem(index)
            event.stopPropagation()
          }}
        >
          <AddIcon _css={addIconStyle} />
          <span>{t("editor.inspect.setter_content.menu_setter.sub")}</span>
        </div>
      </div>
    </Trigger>
  )
}

DragIconAndLabel.displayName = "DragIconAndLabel"
