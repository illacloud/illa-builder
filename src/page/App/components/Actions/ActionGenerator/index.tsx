import { FC, useEffect, useState } from "react"
import { Modal } from "@illa-design/modal"
import { ActionGeneratorProps, ActionInfo } from "./interface"
import { ActionTypeSelector } from "./ActionTypeSelector"
import { ActionResourceSelector } from "@/page/App/components/Actions/ActionGenerator/ActionResourceSelector"
import { ActionResourceCreator } from "@/page/App/components/Actions/ActionGenerator/ActionResourceCreator"
import { ActionType } from "@/redux/currentApp/action/actionState"
import { css } from "@emotion/react"

export const ActionGenerator: FC<ActionGeneratorProps> = function (props) {
  const { visible, onClose } = props
  const [step, setStep] = useState<0 | 1 | 2>(0)
  const [actionType, setResourceType] = useState<ActionType>()
  const [defaultSelectedResourceId, setDefaultSelectedResourceId] = useState("")

  useEffect(() => {
    setStep(0)
  }, [visible])

  const onAddAction = (info: ActionInfo) => {}

  return (
    <Modal
      _css={css`
        width: 696px;
      `}
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
                onAddAction(info)
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
            setResourceType(undefined)
          }}
          onCreateResource={(actionType) => {
            setResourceType(actionType)
            setStep(2)
          }}
          onCreateAction={(actionType, resourceId) => {
            actionType && onAddAction({ actionType, resourceId })
          }}
          defaultSelected={defaultSelectedResourceId}
        />
      ) : (
        <ActionResourceCreator
          resourceType={actionType}
          onBack={() => {
            setStep(0)
            setResourceType(undefined)
          }}
        />
      )}
    </Modal>
  )
}

ActionGenerator.displayName = "ActionGenerator"
