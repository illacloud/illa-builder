import { FC, useEffect, useState } from "react"
import { Modal } from "@illa-design/modal"
import { ActionGeneratorProps } from "./interface"
import { ActionTypeSelector } from "./ActionTypeSelector"

export const ActionGenerator: FC<ActionGeneratorProps> = function (props) {
  const { visible, onClose, onAddAction } = props
  const [step, setStep] = useState<0 | 1 | 2>(0)
  const [resourceType, setResourceType] = useState<string>("")

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
      {step === 0 ? (
        <ActionTypeSelector
          onSelect={(info) => {
            const { category, actionType } = info

            switch (category) {
              case "jsTransformer": {
                onAddAction?.(info)
                break
              }
              case "apis":
              case "databases": {
                setResourceType(actionType)
                setStep(1)
                break
              }
            }
          }}
        />
      ) : step === 1 ? (
        "step 1"
      ) : (
        "step 2"
      )}
    </Modal>
  )
}

ActionGenerator.displayName = "ActionGenerator"
