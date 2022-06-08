import { FC } from "react"
import { Modal } from "@illa-design/modal"
import { ActionTypeSelector } from "@/page/App/components/ActionEditor/ActionGenerator/ActionTypeSelector"
import { ActionTypeInfo } from "@/page/App/components/ActionEditor/ActionGenerator/ActionTypeSelector/interface"
import { modalStyle } from "./style"
import { ActionGeneratorProps } from "./interface"

function onSelectActionType(info: ActionTypeInfo, props: ActionGeneratorProps) {
  const { category } = info
  const { onAddAction } = props

  switch (category) {
    case "jsTransformer": {
      onAddAction?.(info)
      break
    }
    case "apis":
    case "databases": {
      break
    }
    default:
      break
  }
}

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
      <ActionTypeSelector
        onSelect={(info) => {
          onSelectActionType(info, props)
        }}
      />
    </Modal>
  )
}

ActionGenerator.displayName = "ActionGenerator"
