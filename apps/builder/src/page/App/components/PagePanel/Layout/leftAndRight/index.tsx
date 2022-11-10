import { FC } from "react"
import { LeftAndRightLayoutProps } from "./interface"
import { leftAndRightCss } from "./style"

export const LeftAndRightLayout: FC<LeftAndRightLayoutProps> = (props) => {
  const { children } = props
  return <div css={leftAndRightCss}>{children}</div>
}
