import { FC, useCallback, useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { DragPointIcon, Trigger } from "@illa-design/react"
import { OptionListSetterContext } from "@/page/App/components/PanelSetters/OptionListSetter/context/optionListContext"
import { DragIconAndLabelProps } from "@/page/App/components/PanelSetters/OptionListSetter/interface"
import {
  labelNameAndIconStyle,
  labelNameWrapperStyle,
  movableIconWrapperStyle,
} from "@/page/App/components/PanelSetters/OptionListSetter/style"
import { BaseModal } from "@/page/App/components/PanelSetters/PublicComponent/Modal"

export const DragIconAndLabel: FC<DragIconAndLabelProps> = (props) => {
  const { index, label } = props
  const [modalVisible, setModalVisible] = useState(false)
  const { widgetDisplayName, attrPath, childrenSetter } = useContext(
    OptionListSetterContext,
  )

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
      <div css={labelNameAndIconStyle}>
        <span css={movableIconWrapperStyle} className="movableIconWrapper">
          <DragPointIcon />
        </span>
        <span css={labelNameWrapperStyle}>
          {label ||
            t("editor.inspect.setter_content.option_list.list_no_label")}
        </span>
      </div>
    </Trigger>
  )
}

DragIconAndLabel.displayName = "DragIconAndLabel"
