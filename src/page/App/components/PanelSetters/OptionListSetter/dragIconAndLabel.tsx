import { FC, useCallback, useState } from "react"
import { Modal } from "@/page/App/components/PanelSetters/OptionListSetter/modal"
import {
  labelNameAndIconCss,
  labelNameWrapper,
  movableIconWrapperCss,
} from "@/page/App/components/PanelSetters/OptionListSetter/style"
import { Trigger } from "@illa-design/trigger"
import { DragIconAndLabelProps } from "@/page/App/components/PanelSetters/OptionListSetter/interface"
import { DragPointIcon } from "@illa-design/icon"

export const DragIconAndLabel: FC<DragIconAndLabelProps> = (props) => {
  const { label, value, index, disabled, handleUpdateItem } = props
  const [modalVisible, setModalVisible] = useState(false)

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
          label={label}
          value={value}
          index={index}
          disabled={disabled}
          handleUpdateItem={handleUpdateItem}
          handleCloseModal={handleCloseModal}
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
        <span css={labelNameWrapper}>{label || value || "No label"}</span>
      </div>
    </Trigger>
  )
}

DragIconAndLabel.displayName = "DragIconAndLabel"
