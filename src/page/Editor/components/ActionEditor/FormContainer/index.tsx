import { Modal } from "@illa-design/modal"
import { FC, useState, useMemo, useLayoutEffect } from "react"
import { FormContainerProps, ActionType } from "./interface"
import {
  ApiType,
  DatabaseType,
} from "@/page/Editor/components/ActionEditor/interface"
import { modalCss, closeIconCss, titleCss } from "./style"
import { SelectResourceForm } from "../SelectResourceForm"
import { ConfigureResourceForm } from "../ConfigureResourceForm"
import { CloseIcon } from "@illa-design/icon"

export const FormContainer: FC<FormContainerProps> = (props) => {
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
          <SelectResourceForm
            onSelect={(type) => {
              setConfigureType(type)
              setActionType("configure")
            }}
          />
        )
      case "edit":
        return (
          <ConfigureResourceForm
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
          <ConfigureResourceForm
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
      _css={modalCss}
      visible={visible}
      footer={false}
      closable={true}
      withoutPadding
      closeElement={
        <div css={closeIconCss} onClick={handleClose}>
          <CloseIcon />
        </div>
      }
      onCancel={handleClose}
    >
      <div css={titleCss}>{title}</div>
      {renderForm}
    </Modal>
  )
}

FormContainer.displayName = "FormContainer"
