import { FC, useCallback, useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { DragPointIcon, AddIcon } from "@illa-design/icon"
import { Trigger } from "@illa-design/trigger"
import {
  addIconStyle,
  deleteButtonStyle,
  dragItemStyle,
  iconAreaStyle,
  labelNameAndIconStyle,
  labelNameWrapperStyle,
  movableIconWrapperStyle,
} from "./style"
import { DragIconAndLabelProps } from "./interface"
import { BaseModal } from "@/page/App/components/PanelSetters/PublicComponent/Modal"
import { ColumnListSetterContext } from "./context/columnListContext"
import { Button } from "@illa-design/button"

export const DragIconAndLabel: FC<DragIconAndLabelProps> = (props) => {
  const { index, title } = props
  const [modalVisible, setModalVisible] = useState(false)
  const {
    widgetDisplayName,
    attrPath,
    childrenSetter,
    handleUpdateItemVisible,
    handleAddSubMenuItem,
    handleDeleteMenuItem,
  } = useContext(ColumnListSetterContext)

  console.log(childrenSetter, "childrenSetter")

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
