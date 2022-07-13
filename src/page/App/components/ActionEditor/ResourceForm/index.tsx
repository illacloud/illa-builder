import { FC, useState, useMemo, useLayoutEffect } from "react"
import { Modal } from "@illa-design/modal"
import { ResourceFormSelector } from "./Selector"
import { ResourceFormEditor } from "./Editor"
import { ResourceFormProps, ActionType } from "./interface"
import { modalStyle } from "./style"

export const ResourceForm: FC<ResourceFormProps> = (props) => {
  const { actionType: propActionType, visible, onCancel, resourceId } = props
  const [configureType, setConfigureType] = useState<string>()
  const [actionType, setActionType] = useState<ActionType>(propActionType)

  useLayoutEffect(() => {
    setActionType(propActionType)
  }, [propActionType])

  const handleClose = () => {
    onCancel?.()
    setActionType(propActionType)
  }

  const renderForm = useMemo(() => {
    switch (actionType) {
      case "select":
        return (
          <ResourceFormSelector
            onSelect={(type) => {
              setConfigureType(type)
              setActionType("configure")
            }}
          />
        )
      case "edit":
        return (
          <ResourceFormEditor
            key="edit"
            actionType="edit"
            resourceId={resourceId}
            onSubmit={handleClose}
            back={() => {
              setActionType("select")
            }}
          />
        )
      case "configure":
        return (
          <ResourceFormEditor
            key="configure"
            actionType="configure"
            resourceType={configureType}
            onSubmit={handleClose}
            back={() => {
              setActionType("select")
            }}
          />
        )
      default:
        return null
    }
  }, [actionType, resourceId])

  return (
    <Modal
      _css={modalStyle}
      visible={visible}
      footer={false}
      closable={true}
      withoutPadding
      onCancel={handleClose}
    >
      {renderForm}
    </Modal>
  )
}

ResourceForm.displayName = "ResourceForm"
