import { FC, useCallback, useContext, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { DragPointIcon } from "@illa-design/icon"
import { Trigger } from "@illa-design/trigger"
import { get } from "lodash"
import {
  labelNameAndIconStyle,
  labelNameWrapperStyle,
  movableIconWrapperStyle,
} from "@/page/App/components/PanelSetters/OptionListSetter/style"
import { DragIconAndLabelProps } from "@/page/App/components/PanelSetters/OptionListSetter/interface"
import { OptionListSetterContext } from "@/page/App/components/PanelSetters/OptionListSetter/context/optionListContext"
import { getExecutionResult } from "@/redux/currentApp/executionTree/execution/executionSelector"
import { BaseModal } from "@/page/App/components/PanelSetters/PublicComponent/Modal"

export const DragIconAndLabel: FC<DragIconAndLabelProps> = (props) => {
  const { index } = props
  const [modalVisible, setModalVisible] = useState(false)
  const { widgetDisplayName, attrPath, childrenSetter } = useContext(
    OptionListSetterContext,
  )

  const { t } = useTranslation()
  const executionResult = useSelector(getExecutionResult)

  const labelName = useMemo(() => {
    return get(
      executionResult,
      `${widgetDisplayName}.${attrPath}.${index}.label`,
    )
  }, [executionResult, widgetDisplayName, attrPath, index])

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
          title="Edit Options"
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
          {labelName ||
            t("editor.inspect.setter_content.option_list.list_no_label")}
        </span>
      </div>
    </Trigger>
  )
}

DragIconAndLabel.displayName = "DragIconAndLabel"
