import { css } from "@emotion/react"
import { FC, Suspense, useMemo } from "react"
import { ModalBody } from "./body"
import { ModalHeader } from "./header"
import { ModalProps } from "./interface"
import { modalWrapperStyle } from "./style"

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
    extraElement,
    docLink,
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
    <div css={css(modalWrapperStyle, _css)}>
      {header ?? (
        <ModalHeader
          title={title}
          handleCloseModal={handleCloseModal}
          docLink={docLink}
        />
      )}
      <Suspense>{renderBody}</Suspense>
      {extraElement}
    </div>
  )
}
BaseModal.displayName = "BaseModal"
