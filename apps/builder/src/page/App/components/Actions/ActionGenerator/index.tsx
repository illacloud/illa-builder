import { FC, useState } from "react"
import { Modal } from "@illa-design/modal"
import { ActionGeneratorProps } from "./interface"
import { ActionTypeSelector } from "./ActionTypeSelector"
import { ActionResourceSelector } from "@/page/App/components/Actions/ActionGenerator/ActionResourceSelector"
import { ActionResourceCreator } from "@/page/App/components/Actions/ActionGenerator/ActionResourceCreator"
import i18n from "@/i18n/config"
import { ActionType } from "@/redux/currentApp/action/actionState"

export const ActionGenerator: FC<ActionGeneratorProps> = function (props) {
  const { visible, onClose } = props
  const [currentStep, setCurrentStep] = useState<
    "select" | "createAction" | "createResource"
  >("select")

  const [currentActionType, setCurrentActionType] = useState<ActionType | null>(
    null,
  )

  let title
  switch (currentStep) {
    case "select":
      title = i18n.t(
        "editor.action.action_list.action_generator.selector.title",
      )
      break
    case "createAction":
      title = i18n.t(
        "editor.action.action_list.action_generator.title.choose_resource",
      )
      break
    case "createResource":
      title = i18n.t(`editor.action.resource.${currentActionType}.name`)
      break
  }

  return (
    <Modal
      w="696px"
      visible={visible}
      footer={false}
      closable
      withoutLine
      withoutPadding
      title={title}
      onCancel={onClose}
    >
      {currentStep === "select" && (
        <ActionTypeSelector
          onSelect={(actionType) => {
            switch (actionType) {
              case "mysql":
              case "restapi":
              case "mongodb":
              case "redis":
              case "postgresql":
                setCurrentStep("createAction")
                setCurrentActionType(actionType)
                break
              case "transformer":
                break
            }
          }}
        />
      )}
      {currentStep === "createAction" && currentActionType && (
        <ActionResourceSelector
          actionType={currentActionType}
          onBack={() => {
            setCurrentStep("select")
          }}
          onCreateResource={(actionType) => {
            setCurrentActionType(actionType)
            setCurrentStep("createResource")
          }}
          onCreateAction={(actionType, resourceId) => {
            setCurrentStep("select")
            onClose()
          }}
        />
      )}
      {currentStep === "createResource" && (
        <ActionResourceCreator
          onBack={() => {
            setCurrentStep("createAction")
          }}
          onCreated={(resourceId) => {
            setCurrentStep("createAction")
          }}
        />
      )}
    </Modal>
  )
}

ActionGenerator.displayName = "ActionGenerator"
