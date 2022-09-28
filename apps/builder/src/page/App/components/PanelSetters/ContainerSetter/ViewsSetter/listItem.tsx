import { FC, useCallback, useContext, useState } from "react"
import {
  actionWrapperStyle,
  copyIconStyle,
  iconStyle,
  listItemTriggerWrapperStyle,
} from "@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter/style"
import { Reorder, useDragControls } from "framer-motion"
import { ViewItemShape } from "@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter/interface"
import { CopyIcon, ReduceIcon } from "@illa-design/icon"
import { DragIconAndLabel } from "@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter/dragIconAndLabel"
import { ViewListSetterContext } from "@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter/context/viewsListContext"
import { BaseModal } from "@/page/App/components/PanelSetters/PublicComponent/Modal"
import { Trigger } from "@illa-design/trigger"
import { useTranslation } from "react-i18next"

interface ListItemProps {
  value: ViewItemShape
  index: number
}

export const ListItem: FC<ListItemProps> = props => {
  const { value, index } = props
  const [modalVisible, setModalVisible] = useState(false)
  const dragControls = useDragControls()
  const {
    handleDeleteOptionItem,
    handleCopyOptionItem,
    attrPath,
    widgetDisplayName,
    childrenSetter,
  } = useContext(ViewListSetterContext)
  const { t } = useTranslation()

  const handleCloseModal = useCallback(() => {
    setModalVisible(false)
  }, [])

  return (
    <Reorder.Item
      value={value}
      id={value.id}
      initial={false}
      dragListener={false}
      dragControls={dragControls}
    >
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
        onVisibleChange={visible => {
          setModalVisible(visible)
        }}
      >
        <span css={listItemTriggerWrapperStyle}>
          <DragIconAndLabel index={index} dragControls={dragControls} />
          <span css={actionWrapperStyle}>
            <CopyIcon
              css={copyIconStyle}
              id="copyIcon"
              onClick={e => {
                e.stopPropagation()
                handleCopyOptionItem(index)
              }}
            />
            <ReduceIcon
              css={iconStyle}
              onClick={e => {
                e.stopPropagation()
                handleDeleteOptionItem(index)
              }}
            />
          </span>
        </span>
      </Trigger>
    </Reorder.Item>
  )
}
