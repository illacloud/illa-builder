import { FC } from "react"
import { BaseBodyProps } from "./interface"
import { listWrapperStyle } from "./style"

export const BaseModalBody: FC<BaseBodyProps> = (props) => {
  const { children } = props

  return <div css={listWrapperStyle}>{children}</div>
}

BaseModalBody.displayName = "ModalBody"
