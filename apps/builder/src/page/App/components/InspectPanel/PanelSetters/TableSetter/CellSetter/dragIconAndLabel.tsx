import { FC, useCallback, useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { DragPointIcon, ReduceIcon, Trigger } from "@illa-design/react"
import { BaseModal } from "@/page/App/components/InspectPanel/PanelSetters/PublicComponent/Modal"
import { ColumnListSetterContext } from "./context/columnListContext"
import { DragIconAndLabelProps } from "./interface"
import {
  baseIconStyle,
  dragItemStyle,
  iconAreaStyle,
  labelNameAndIconStyle,
  labelNameWrapperStyle,
  movableIconWrapperStyle,
} from "./style"

export const DragIconAndLabel: FC<DragIconAndLabelProps> = (props) => {
  const { index, label } = props
  const [modalVisible, setModalVisible] = useState(false)
  const {
    columnItems,
    widgetDisplayName,
    attrPath,
    childrenSetter,
    handleDeleteColumnItem,
  } = useContext(ColumnListSetterContext)

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
          title={label ?? ""}
          handleCloseModal={handleCloseModal}
          attrPath={`${attrPath}.${index}`}
          widgetDisplayName={widgetDisplayName}
          childrenSetter={childrenSetter}
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
            {label ||
              t("editor.inspect.setter_content.option_list.list_no_label")}
          </span>
        </div>
        <div css={iconAreaStyle}>
          {columnItems?.length > 1 ? (
            <span
              css={baseIconStyle}
              onClick={(event) => {
                handleDeleteColumnItem(index)
                event.stopPropagation()
              }}
            >
              <ReduceIcon />
            </span>
          ) : null}
        </div>
      </div>
    </Trigger>
  )
}

DragIconAndLabel.displayName = "DragIconAndLabel"
