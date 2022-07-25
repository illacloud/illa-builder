import { FC, useEffect, useState } from "react"
import { Modal } from "@illa-design/modal"
import { ActionGeneratorProps } from "./interface"

export const ActionGenerator: FC<ActionGeneratorProps> = function (props) {
  const { visible, onClose } = props
  const [step, setStep] = useState<0 | 1 | 2>(0)

  useEffect(() => {
    setStep(0)
    console.log({visible})
  }, [visible])

  return (
    <Modal
      visible={visible}
      footer={false}
      closable
      withoutPadding
      onCancel={onClose}
    >
      resource
    </Modal>
  )
}

ActionGenerator.displayName = "ActionGenerator"
