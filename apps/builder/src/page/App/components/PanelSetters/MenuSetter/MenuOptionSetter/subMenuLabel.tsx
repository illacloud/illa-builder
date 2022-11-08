import { FC, useCallback, useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  ReduceIcon,
  DragPointIcon,
  EyeOffIcon,
  EyeOnIcon,
} from "@illa-design/icon"
import { Trigger } from "@illa-design/trigger"
import {
  baseIconStyle,
  dragItemStyle,
  iconAreaStyle,
  labelNameAndIconStyle,
  labelNameWrapperStyle,
  movableIconWrapperStyle,
  subMenuItemStyle,
} from "./style"
import { DragIconAndLabelProps } from "./interface"
import { BaseModal } from "@/page/App/components/PanelSetters/PublicComponent/Modal"
import { ColumnListSetterContext } from "./context/columnListContext"

export const SubMenuLabel: FC<DragIconAndLabelProps> = (props) => {
  const { index, title } = props
  const [modalVisible, setModalVisible] = useState(false)
  const {
    widgetDisplayName,
    attrPath,
    childrenSetter,
    handleUpdateItemVisible,
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
          title={title ?? ""}
          handleCloseModal={handleCloseModal}
          attrPath={`${attrPath}.${index}.subMenu`}
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
        <div css={iconAreaStyle}>
          <span
            css={baseIconStyle}
            onClick={(event) => {
              handleDeleteColumnItem(index)
              event.stopPropagation()
            }}
          >
            <ReduceIcon />
          </span>
        </div>
      </div>
    </Trigger>
  )
}

SubMenuLabel.displayName = "SubMenuLabel"
