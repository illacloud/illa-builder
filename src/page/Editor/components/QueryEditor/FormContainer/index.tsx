import { Modal } from "@illa-design/modal"
import { FC } from "react"
import { FormContainerProps } from "./interface"
import { ModalCSS } from "./style"
import { SelectResourceForm } from "../SelectResourceForm"

export const FormContainer: FC<FormContainerProps> = (props) => {
  const { actionType, resourceType, databaseType, apiType, visible } = props
  return (
    <Modal _css={ModalCSS} visible={visible} footer={false} closable={false}>
      <SelectResourceForm onSelect={() => {}} />
    </Modal>
  )
}
