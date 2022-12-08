import { FC, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Modal } from "@illa-design/react"
import { ActionResourceCreator } from "@/page/App/components/Actions/ActionGenerator/ActionResourceCreator"
import { ActionResourceSelector } from "@/page/App/components/Actions/ActionGenerator/ActionResourceSelector"
import { modalContentStyle } from "@/page/Dashboard/components/ResourceGenerator/style"
import { ActionType } from "@/redux/currentApp/action/actionState"
import { getAllResources } from "@/redux/resource/resourceSelector"
import {
  getResourceNameFromResourceType,
  getResourceTypeFromActionType,
} from "@/utils/actionResourceTransformer"
import { ActionTypeSelector } from "./ActionTypeSelector"
import { ActionCreatorPage, ActionGeneratorProps } from "./interface"

export const ActionGenerator: FC<ActionGeneratorProps> = function (props) {
  const { visible, onClose, onCreateAction } = props
  const [currentStep, setCurrentStep] = useState<ActionCreatorPage>("select")

  const [currentActionType, setCurrentActionType] = useState<ActionType | null>(
    null,
  )

  const { t } = useTranslation()

  const allResource = useSelector(getAllResources)

  let title
  switch (currentStep) {
    case "select":
      title = t("editor.action.action_list.action_generator.selector.title")
      break
    case "createAction":
    case "directCreateAction":
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

  useEffect(() => {
    if (
      currentStep === "createAction" &&
      allResource.filter((value) => {
        return value.resourceType === currentActionType
      }).length === 0
    ) {
      setCurrentStep("createResource")
    }
  }, [currentStep, currentActionType, allResource])

  return (
    <Modal
      w="696px"
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
        {(currentStep === "createAction" ||
          currentStep === "directCreateAction") &&
          currentActionType && (
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
                onCreateAction()
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
              setCurrentStep("directCreateAction")
            }}
          />
        )}
      </div>
    </Modal>
  )
}

ActionGenerator.displayName = "ActionGenerator"
