import { FC, useState } from "react"
import { Modal } from "@illa-design/modal"
import { ActionCreatorPage, ActionGeneratorProps } from "./interface"
import { ActionTypeSelector } from "./ActionTypeSelector"
import { ActionResourceSelector } from "@/page/App/components/Actions/ActionGenerator/ActionResourceSelector"
import { ActionType } from "@/redux/currentApp/action/actionState"
import { ActionResourceCreator } from "@/page/App/components/Actions/ActionGenerator/ActionResourceCreator"
import { useTranslation } from "react-i18next"
import {
  getResourceNameFromResourceType,
  getResourceTypeFromActionType,
} from "@/utils/actionResourceTransformer"
import { modalContentStyle } from "@/page/Dashboard/components/ResourceGenerator/style"

export const ActionGenerator: FC<ActionGeneratorProps> = function(props) {
  const { visible, onClose } = props
  const [currentStep, setCurrentStep] = useState<ActionCreatorPage>("select")

  const [currentActionType, setCurrentActionType] = useState<ActionType | null>(
    null,
  )

  const { t } = useTranslation()

  let title
  switch (currentStep) {
    case "select":
      title = t("editor.action.action_list.action_generator.selector.title")
      break
    case "createAction":
      title = t(
        "editor.action.action_list.action_generator.title.choose_resource",
      )
      break
    case "createResource":
      if (currentActionType != null) {
        const resourceType = getResourceTypeFromActionType(currentActionType)
        if (resourceType != null) {
          title = t("editor.action.form.title.configure", {
            name: getResourceNameFromResourceType(resourceType),
          })
        }
      }
      break
  }

  const transformResource = currentActionType
    ? getResourceTypeFromActionType(currentActionType)
    : null

  return (
    <Modal
      w="696px"
      maxH="70%"
      h="100%"
      visible={visible}
      footer={false}
      closable
      withoutLine
      withoutPadding
      title={title}
      onCancel={() => {
        onClose()
        setCurrentStep("select")
        setCurrentActionType(null)
      }}
    >
      <div css={modalContentStyle}>
        {currentStep === "select" && (
          <ActionTypeSelector
            onSelect={(actionType) => {
              if (actionType == "transformer") {
                onClose()
              } else {
                setCurrentStep("createAction")
                setCurrentActionType(actionType)
              }
            }}
          />
        )}
        {currentStep === "createAction" && currentActionType && (
          <ActionResourceSelector
            actionType={currentActionType}
            onBack={(page) => {
              setCurrentStep(page)
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
        {currentStep === "createResource" && transformResource && (
          <ActionResourceCreator
            resourceType={transformResource}
            onBack={(page) => {
              setCurrentStep(page)
            }}
            onFinished={(resourceId) => {
              setCurrentStep("createAction")
            }}
          />
        )}
      </div>
    </Modal>
  )
}

ActionGenerator.displayName = "ActionGenerator"
