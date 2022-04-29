import { Modal } from "@illa-design/modal"
import { FC, useState } from "react"
import { FormContainerProps, ApiType, DatabaseType } from "./interface"
import { ModalCSS, CloseIconCSS, TitleCSS } from "./style"
import { SelectResourceForm } from "../SelectResourceForm"
import { ConfigureResourceForm } from "../ConfigureResourceForm"
import { CloseIcon } from "@illa-design/icon"

export const FormContainer: FC<FormContainerProps> = (props) => {
  const { actionType, resourceType, databaseType, apiType, visible, onCancel } =
    props
  const [configureType, setConfigureType] = useState<ApiType | DatabaseType>(
    databaseType ?? apiType ?? "MySQL",
  )

  const title =
    actionType === "select"
      ? "Select Resource Type"
      : `Configure ${configureType}`

  const renderForm = () => {
    if (actionType === "select") {
      return (
        <SelectResourceForm
          onSelect={(type) => {
            setConfigureType(type)
          }}
        />
      )
    }
    if (actionType === "edit" || actionType === "configure") {
      return (
        <ConfigureResourceForm actionType={actionType} onCancel={onCancel} />
      )
    }
  }
  return (
    <Modal
      _css={ModalCSS}
      visible={visible}
      footer={false}
      closable={true}
      closeElement={
        <div css={CloseIconCSS} onClick={onCancel}>
          <CloseIcon />
        </div>
      }
      onCancel={onCancel}
    >
      <div css={TitleCSS}>{title}</div>
      {renderForm()}
    </Modal>
  )
}

FormContainer.displayName = "FormContainer"
