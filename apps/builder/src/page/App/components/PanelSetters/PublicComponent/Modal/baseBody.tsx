import { FC } from "react"
import { listWrapperStyle } from "./style"
import { BaseBodyProps } from "./interface"

export const BaseModalBody: FC<BaseBodyProps> = (props) => {
  const { children } = props

  return <div css={listWrapperStyle}>{children}</div>
}

BaseModalBody.displayName = "ModalBody"
