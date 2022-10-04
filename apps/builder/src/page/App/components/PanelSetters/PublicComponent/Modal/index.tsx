import { FC, useMemo } from "react"
import { modalWrapperStyle } from "./style"
import { ModalHeader } from "./header"
import { ModalBody } from "./body"
import { ModalProps } from "./interface"
import { css } from "@emotion/react"

export const BaseModal: FC<ModalProps> = (props) => {
  const {
    title,
    handleCloseModal,
    childrenSetter,
    widgetDisplayName,
    attrPath,
    children,
    _css,
    header,
  } = props

  const _header = useMemo(() => {
    return (
      header ?? (
        <ModalHeader title={title} handleCloseModal={handleCloseModal} />
      )
    )
  }, [header, title, handleCloseModal])

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
    <div css={css(modalWrapperStyle, _css)}>
      {_header}
      {renderBody}
    </div>
  )
}
BaseModal.displayName = "BaseModal"
