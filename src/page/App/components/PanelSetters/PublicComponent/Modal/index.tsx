import { FC } from "react"
import { modalWrapperStyle } from "./style"
import { ModalHeader } from "./header"
import { ModalBody } from "./body"
import { ModalProps } from "./interface"

export const BaseModal: FC<ModalProps> = (props) => {
  const {
    title,
    handleCloseModal,
    childrenSetter,
    widgetDisplayName,
    attrPath,
  } = props
  return (
    <div css={modalWrapperStyle}>
      <ModalHeader title={title} handleCloseModal={handleCloseModal} />
      <ModalBody
        childrenSetter={childrenSetter}
        widgetDisplayName={widgetDisplayName}
        attrPath={attrPath}
      />
    </div>
  )
}
BaseModal.displayName = "BaseModal"
