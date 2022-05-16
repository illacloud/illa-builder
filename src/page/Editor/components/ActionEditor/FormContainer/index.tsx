import { Modal } from "@illa-design/modal"
import { FC, useState, useMemo, useLayoutEffect } from "react"
import {
  FormContainerProps,
  ApiType,
  DatabaseType,
  ActionType,
} from "./interface"
import { ModalCSS, CloseIconCSS, TitleCSS } from "./style"
import { SelectResourceForm } from "../SelectResourceForm"
import { ConfigureResourceForm } from "../ConfigureResourceForm"
import { CloseIcon } from "@illa-design/icon"

export const FormContainer: FC<FormContainerProps> = (props) => {
  const {
    actionType: propActionType,
    resourceType,
    databaseType,
    apiType,
    visible,
    onCancel,
  } = props
  const [configureType, setConfigureType] = useState<ApiType | DatabaseType>(
    databaseType ?? apiType ?? "MySQL",
  )
  const [actionType, setActionType] = useState<ActionType>(propActionType)
  useLayoutEffect(() => {
    setActionType(propActionType)
  }, [propActionType])
  const title =
    actionType === "select"
      ? "Select Resource Type"
      : `Configure ${configureType}`

  const renderForm = useMemo(() => {
    if (actionType === "select") {
      return (
        <SelectResourceForm
          onSelect={(type) => {
            setConfigureType(type)
            setActionType("configure")
          }}
        />
      )
    }
    if (actionType === "edit" || actionType === "configure") {
      return (
        <ConfigureResourceForm
          actionType={actionType}
          onCancel={onCancel}
          back={() => {
            setActionType("select")
          }}
        />
      )
    }
  }, [actionType])

  const handleClose = () => {
    onCancel && onCancel()
    setActionType(propActionType)
  }

  return (
    <Modal
      _css={ModalCSS}
      visible={visible}
      footer={false}
      closable={true}
      withoutPadding
      closeElement={
        <div css={CloseIconCSS} onClick={handleClose}>
          <CloseIcon />
        </div>
      }
      onCancel={handleClose}
    >
      <div css={TitleCSS}>{title}</div>
      {renderForm}
    </Modal>
  )
}

FormContainer.displayName = "FormContainer"
