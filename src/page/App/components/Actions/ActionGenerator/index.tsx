import { FC, useEffect, useState } from "react"
import { Modal } from "@illa-design/modal"
import { ActionGeneratorProps } from "./interface"
import { ActionTypeSelector } from "./ActionTypeSelector"

export const ActionGenerator: FC<ActionGeneratorProps> = function (props) {
  const { visible, onClose } = props
  const [step, setStep] = useState<0 | 1 | 2>(0)

  useEffect(() => {
    setStep(0)
  }, [visible])

  return (
    <Modal
      visible={visible}
      footer={false}
      closable
      withoutPadding
      onCancel={onClose}
    >
      {step === 0 ? <ActionTypeSelector /> : step === 1 ? "step 1" : "step 2"}
    </Modal>
  )
}

ActionGenerator.displayName = "ActionGenerator"
