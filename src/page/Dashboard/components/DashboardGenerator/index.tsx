import { FC, useEffect, useState } from "react"
import { Modal } from "@illa-design/modal"
import { CloseIcon } from "@illa-design/icon"
import { ActionTypeSelector } from "@/page/App/components/ActionEditor/ActionGenerator/ActionTypeSelector"
import { ActionTypeInfo } from "@/page/App/components/ActionEditor/ActionGenerator/ActionTypeSelector/interface"
import { ResourceFormEditor } from "@/page/App/components/ActionEditor/ResourceForm/Editor"
import { dashboardCloseIconStyle } from "@/page/Dashboard/style"
import {
  DashboardGeneratorProps,
  DashboardGeneratorSteps,
  ActionType,
} from "./interface"
import { modalStyle } from "./style"

function onSelectActionType(
  info: ActionTypeInfo,
  setStep: (step: DashboardGeneratorSteps) => void,
  setResourceType: (resourceType: string) => void,
) {
  const { category, actionType } = info

  switch (category) {
    case "apis":
    case "databases": {
      // check if has resource, to create if not, to list if has
      setResourceType(actionType)
      setStep("resource-create")
      break
    }
    default:
      break
  }
}

function renderStep(
  step: DashboardGeneratorSteps,
  resourceType: string,
  resourceId: string,
  setStep: (step: DashboardGeneratorSteps) => void,
  setResourceType: (resourceType: string) => void,
  onSuccess: (type: ActionType) => void,
) {
  switch (step) {
    case "type":
      return (
        <ActionTypeSelector
          onSelect={(info) => {
            onSelectActionType(info, setStep, setResourceType)
          }}
          resourceOnly
        />
      )
    case "resource-create":
      return (
        <ResourceFormEditor
          actionType="configure"
          resourceType={resourceType}
          back={() => {
            setStep("type")
          }}
          onSubmit={() => {
            onSuccess("new")
          }}
        />
      )
    case "edit":
      return (
        <ResourceFormEditor
          key="edit"
          actionType="edit"
          resourceId={resourceId}
          onSubmit={() => {
            onSuccess("edit")
          }}
        />
      )
  }
}

export const DashboardGenerator: FC<DashboardGeneratorProps> = function (
  props,
) {
  const { visible, resourceId = "", actionType, onClose, onSuccess } = props
  const [step, setStep] = useState<DashboardGeneratorSteps>("type")
  const [resourceType, setResourceType] = useState<string>("")

  useEffect(() => {
    switch (actionType) {
      case "new":
        setStep("type")
        break
      case "edit":
        setStep("edit")
        break
    }
  }, [visible])

  return (
    <Modal
      _css={modalStyle}
      visible={visible}
      footer={false}
      closable
      maskClosable={false}
      withoutPadding
      closeElement={
        <div css={dashboardCloseIconStyle}>
          <CloseIcon />
        </div>
      }
      onCancel={onClose}
    >
      {renderStep(
        step,
        resourceType,
        resourceId,
        setStep,
        setResourceType,
        onSuccess,
      )}
    </Modal>
  )
}

DashboardGenerator.displayName = "DashboardGenerator"
