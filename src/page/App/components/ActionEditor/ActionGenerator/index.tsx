import { FC } from "react"
import { Modal } from "@illa-design/modal"
import { ActionTypeSelector } from "./ActionTypeSelector"
import { modalStyle } from "./style"
import { ActionGeneratorProps } from "./interface"

export const ActionGenerator: FC<ActionGeneratorProps> = function(props) {
  const { visible, onClose } = props

  return (
    <Modal
      _css={modalStyle}
      visible={visible}
      footer={false}
      closable
      maskClosable={false}
      withoutPadding
      onCancel={onClose}
    >
      <ActionTypeSelector />
    </Modal>
  )
}

ActionGenerator.displayName = "ActionGenerator"
