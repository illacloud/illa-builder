import { FC, useCallback, useContext, useRef, useState } from "react"
import {
  actionWrapperStyle,
  copyIconStyle,
  iconStyle,
  listItemTriggerWrapperStyle,
} from "./style"
import { ViewItemShape } from "./interface"
import { CopyIcon, ReduceIcon } from "@illa-design/icon"
import { DragIconAndLabel } from "./dragIconAndLabel"
import { TabListSetterContext } from "./context/tabListContext"
import { BaseModal } from "@/page/App/components/PanelSetters/PublicComponent/Modal"
import { Trigger } from "@illa-design/trigger"
import { useTranslation } from "react-i18next"

interface ListItemProps {
  value: ViewItemShape
  index: number
}

export const ListItem: FC<ListItemProps> = (props) => {
  const { value, index } = props
  const [modalVisible, setModalVisible] = useState(false)
  const {
    handleDeleteOptionItem,
    handleCopyOptionItem,
    attrPath,
    widgetDisplayName,
    childrenSetter,
  } = useContext(TabListSetterContext)
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
          title={t("editor.inspect.setter_content.option_list.model_title")}
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
      <span css={listItemTriggerWrapperStyle}>
        <DragIconAndLabel index={index} />
        <span css={actionWrapperStyle}>
          <CopyIcon
            css={copyIconStyle}
            id="copyIcon"
            onClick={(e) => {
              e.stopPropagation()
              handleCopyOptionItem(index)
            }}
          />
          <ReduceIcon
            css={iconStyle}
            onClick={(e) => {
              e.stopPropagation()
              handleDeleteOptionItem(index)
            }}
          />
        </span>
      </span>
    </Trigger>
  )
}
