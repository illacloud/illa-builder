import { FC, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Modal } from "@illa-design/modal"
import { selectAllResource } from "@/redux/currentApp/resource/resourceSelector"
import { ActionTypeSelector } from "@/page/App/components/ActionEditor/ActionGenerator/ActionTypeSelector"
import { ActionResourceSelector } from "@/page/App/components/ActionEditor/ActionGenerator/ActionResourceSelector"
import { ActionTypeInfo } from "@/page/App/components/ActionEditor/ActionGenerator/ActionTypeSelector/interface"
import { ResourceFormEditor } from "@/page/App/components/ActionEditor/ResourceForm/Editor"
import { Resource } from "@/redux/currentApp/resource/resourceState"
import { ActionGeneratorProps, ActionGeneratorSteps } from "./interface"
import { modalStyle } from "./style"

function onSelectActionType(
  info: ActionTypeInfo,
  props: ActionGeneratorProps,
  setStep: (step: ActionGeneratorSteps) => void,
  setResourceType: (resourceType: string) => void,
) {
  const { category, actionType } = info
  const { onAddAction } = props

  switch (category) {
    case "jsTransformer": {
      onAddAction?.(info)
      break
    }
    case "apis":
    case "databases": {
      // check if has resource, to create if not, to list if has
      setResourceType(actionType)
      setStep("resource")
      break
    }
    default:
      break
  }
}

function renderStep(
  step: ActionGeneratorSteps,
  resourceType: string,
  props: ActionGeneratorProps,
  setStep: (step: ActionGeneratorSteps) => void,
  setResourceType: (resourceType: string) => void,
  resourceList: Resource[],
) {
  const { onAddAction } = props
  const [defaultSelectedResourceId, setDefaultSelectedResourceId] = useState("")

  switch (step) {
    case "type":
      return (
        <ActionTypeSelector
          onSelect={(info) => {
            onSelectActionType(info, props, setStep, setResourceType)
          }}
        />
      )
    case "resource":
      return (
        <ActionResourceSelector
          resourceType={resourceType}
          onBack={() => {
            setStep("type")
            setResourceType("")
          }}
          onCreateResource={(resourceType) => {
            setResourceType(resourceType)
            setStep("resource-create")
          }}
          onCreateAction={(resourceType, resourceId) => {
            onAddAction?.({ actionType: resourceType, resourceId })
          }}
          defaultSelectedResourceId={defaultSelectedResourceId}
        />
      )
    case "resource-create":
      return (
        <ResourceFormEditor
          actionType="configure"
          resourceType={resourceType}
          back={() => {
            setStep(resourceList.length > 0 ? "resource" : "type")
          }}
          onSubmit={(resourceId) => {
            setStep("resource")
            setDefaultSelectedResourceId(resourceId)
          }}
        />
      )
  }
}

export const ActionGenerator: FC<ActionGeneratorProps> = function(props) {
  const { visible, onClose } = props
  const [step, setStep] = useState<ActionGeneratorSteps>("type")
  const [resourceType, setResourceType] = useState<string>("")
  const resourceList = useSelector(selectAllResource).filter(
    (r) => r.resourceType === resourceType,
  )

  useEffect(() => {
    setStep("type")
  }, [visible])

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
      {renderStep(
        step,
        resourceType,
        props,
        setStep,
        setResourceType,
        resourceList,
      )}
    </Modal>
  )
}

ActionGenerator.displayName = "ActionGenerator"
