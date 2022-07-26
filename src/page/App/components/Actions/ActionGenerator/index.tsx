import { FC, useEffect, useState } from "react"
import { Modal } from "@illa-design/modal"
import { ActionGeneratorProps } from "./interface"
import { ActionTypeSelector } from "./ActionTypeSelector"
import { ActionResourceSelector } from "@/page/App/components/Actions/ActionGenerator/ActionResourceSelector"

export const ActionGenerator: FC<ActionGeneratorProps> = function (props) {
  const { visible, onClose, onAddAction } = props
  const [step, setStep] = useState<0 | 1 | 2>(0)
  const [actionType, setResourceType] = useState<string>("")
  const [defaultSelectedResourceId, setDefaultSelectedResourceId] = useState("")

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
        <ActionResourceSelector
          actionType={actionType}
          onBack={() => {
            setStep(0)
            setResourceType("")
          }}
          onCreateResource={(actionType) => {
            setResourceType(actionType)
            setStep(2)
          }}
          onCreateAction={(actionType, resourceId) => {
            onAddAction?.({ actionType, resourceId })
          }}
          defaultSelected={defaultSelectedResourceId}
        />
      ) : (
        "step 2"
      )}
    </Modal>
  )
}

ActionGenerator.displayName = "ActionGenerator"
