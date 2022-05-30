import { FC, useState, useMemo, useLayoutEffect } from "react"
import { CloseIcon } from "@illa-design/icon"
import { Modal } from "@illa-design/modal"
import {
  ApiType,
  DatabaseType,
} from "@/page/Editor/components/ActionEditor/interface"
import { ResourceFormSelector } from "./Selector"
import { ResourceFormEditor } from "./Editor"
import { ResourceFormProps, ActionType } from "./interface"
import { modalStyle, closeIconStyle, titleStyle } from "./style"

export const ResourceForm: FC<ResourceFormProps> = (props) => {
  const { actionType: propActionType, visible, onCancel, resourceId } = props
  const [configureType, setConfigureType] = useState<ApiType | DatabaseType>()
  const [actionType, setActionType] = useState<ActionType>(propActionType)

  useLayoutEffect(() => {
    setActionType(propActionType)
  }, [propActionType])

  const title =
    actionType === "select"
      ? "Select Resource Type"
      : `Configure ${configureType}`

  const handleClose = () => {
    onCancel && onCancel()
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
      closeElement={
        <div css={closeIconStyle} onClick={handleClose}>
          <CloseIcon />
        </div>
      }
      onCancel={handleClose}
    >
      <div css={titleStyle}>{title}</div>
      {renderForm}
    </Modal>
  )
}

ResourceForm.displayName = "ResourceForm"
