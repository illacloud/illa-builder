import { FC, useEffect, useState } from "react"
import { Modal } from "@illa-design/modal"
import { ActionType } from "@/redux/currentApp/action/actionState"
import { css } from "@emotion/react"
import { ActionGeneratorProps } from "@/page/App/components/Actions/ActionGenerator/interface"
import { ActionTypeCategory } from "@/page/App/components/Actions/ActionGenerator/ActionTypeSelector/interface"
import { ActionTypeSelector } from "@/page/App/components/Actions/ActionGenerator/ActionTypeSelector"
import { ActionResourceCreator } from "@/page/App/components/Actions/ActionGenerator/ActionResourceCreator"

export type ActionEditorSteps =
  | "select-type"
  | "resource-create"
  | "resource-edit"

export const ResourceEditor: FC<ActionGeneratorProps> = function (props) {
  const { edit, resourceId, visible, onClose } = props
  const [step, setStep] = useState<ActionEditorSteps>("select-type")
  const [actionType, setResourceType] = useState<ActionType>()
  const [category, setCategory] = useState<ActionTypeCategory>()

  useEffect(() => {
    if (edit) {
      setStep("resource-edit")
    } else {
      setStep("select-type")
    }
  }, [visible])

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
      {step === "select-type" ? (
        <ActionTypeSelector
          onSelect={(info) => {
            const { category, actionType } = info

            setCategory(category)
            switch (category) {
              case "apis":
              case "databases": {
                setResourceType(actionType)
                setStep("resource-create")
                break
              }
            }
          }}
        />
      ) : step === "resource-edit" ? (
        <ActionResourceCreator
          resourceId={resourceId}
          category={category}
          onCreated={onClose}
        />
      ) : (
        <ActionResourceCreator
          category={category}
          resourceType={actionType}
          onBack={() => {
            setStep("select-type")
          }}
          onCreated={onClose}
        />
      )}
    </Modal>
  )
}

ResourceEditor.displayName = "ResourceEditor"
