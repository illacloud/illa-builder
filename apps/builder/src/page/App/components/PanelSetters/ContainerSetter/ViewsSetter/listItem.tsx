import { FC, useCallback, useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { CopyIcon, ReduceIcon, Trigger } from "@illa-design/react"
import { SelectedProvider } from "@/page/App/components/InspectPanel/context/selectedContext"
import { ViewListSetterContext } from "@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter/context/viewsListContext"
import { DragIconAndLabel } from "@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter/dragIconAndLabel"
import { ViewItemShape } from "@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter/interface"
import {
  actionWrapperStyle,
  copyIconStyle,
  iconStyle,
  listItemTriggerWrapperStyle,
} from "@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter/style"
import { BaseModal } from "@/page/App/components/PanelSetters/PublicComponent/Modal"
import { getComponentNodeBySingleSelected } from "@/redux/currentApp/editor/components/componentsSelector"

interface ListItemProps {
  value: ViewItemShape
  index: number
  label?: string
  isSelected: boolean
}

export const ListItem: FC<ListItemProps> = (props) => {
  const { value, label, index, isSelected } = props
  const [modalVisible, setModalVisible] = useState(false)
  const {
    handleDeleteOptionItem,
    handleCopyOptionItem,
    attrPath,
    widgetDisplayName,
    childrenSetter,
    handleUpdateDsl,
    handleUpdateMultiAttrDSL,
    handleUpdateOtherMultiAttrDSL,
  } = useContext(ViewListSetterContext)
  const { t } = useTranslation()

  const handleCloseModal = useCallback(() => {
    setModalVisible(false)
  }, [])

  const singleSelectedComponentNode = useSelector(
    getComponentNodeBySingleSelected,
  )

  const widgetType = singleSelectedComponentNode?.type || ""
  const widgetParentDisplayName = singleSelectedComponentNode?.parentNode || ""
  const widgetProps = singleSelectedComponentNode?.props || {}

  return (
    <Trigger
      withoutPadding
      colorScheme="white"
      popupVisible={modalVisible}
      content={
        <SelectedProvider
          widgetType={widgetType}
          widgetDisplayName={widgetDisplayName}
          widgetParentDisplayName={widgetParentDisplayName}
          widgetProps={widgetProps}
          handleUpdateDsl={handleUpdateDsl}
          handleUpdateMultiAttrDSL={(updateSlice) => {
            handleUpdateMultiAttrDSL?.(updateSlice)
          }}
          handleUpdateOtherMultiAttrDSL={(displayName, updateSlice) => {
            handleUpdateOtherMultiAttrDSL?.(displayName, updateSlice)
          }}
          widgetOrAction="WIDGET"
        >
          <BaseModal
            title={t("editor.inspect.setter_content.option_list.model_title")}
            handleCloseModal={handleCloseModal}
            attrPath={`${attrPath}.${index}`}
            widgetDisplayName={widgetDisplayName}
            childrenSetter={childrenSetter}
          />
        </SelectedProvider>
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
        <DragIconAndLabel index={index} label={label} isSelected={isSelected} />
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
