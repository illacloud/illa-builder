import { FC, useCallback, useContext, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { DragPointIcon } from "@illa-design/icon"
import { Trigger } from "@illa-design/trigger"
import { get } from "lodash"
import { Modal } from "@/page/App/components/PanelSetters/OptionListSetter/modal"
import {
  labelNameAndIconCss,
  labelNameWrapper,
  movableIconWrapperCss,
} from "@/page/App/components/PanelSetters/OptionListSetter/style"
import { DragIconAndLabelProps } from "@/page/App/components/PanelSetters/OptionListSetter/interface"
import { OptionListSetterContext } from "@/page/App/components/PanelSetters/OptionListSetter/context/optionListContext"
import { getExecutionResult } from "@/redux/currentApp/executionTree/execution/executionSelector"

export const DragIconAndLabel: FC<DragIconAndLabelProps> = (props) => {
  const { index } = props
  const [modalVisible, setModalVisible] = useState(false)
  const { widgetDisplayName, attrPath } = useContext(OptionListSetterContext)
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
      colorScheme="white"
      popupVisible={modalVisible}
      content={
        <Modal
          title="Edit Options"
          handleCloseModal={handleCloseModal}
          index={index}
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
      <div css={labelNameAndIconCss}>
        <span css={movableIconWrapperCss} className="movableIconWrapper">
          <DragPointIcon />
        </span>
        <span css={labelNameWrapper}>{labelName || "No label"}</span>
      </div>
    </Trigger>
  )
}

DragIconAndLabel.displayName = "DragIconAndLabel"
