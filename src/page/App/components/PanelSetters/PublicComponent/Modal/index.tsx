import { FC, useMemo } from "react"
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
    children,
  } = props
  const renderBody = useMemo(() => {
    if (!childrenSetter || !widgetDisplayName || !attrPath) {
      return children
    }
    return (
      <ModalBody
        childrenSetter={childrenSetter}
        widgetDisplayName={widgetDisplayName}
        attrPath={attrPath}
      />
    )
  }, [childrenSetter, widgetDisplayName, attrPath, children])
  return (
    <div css={modalWrapperStyle}>
      <ModalHeader title={title} handleCloseModal={handleCloseModal} />
      {renderBody}
    </div>
  )
}
BaseModal.displayName = "BaseModal"
