import { FC } from "react"
import { VerticalLayoutProps } from "./interface"
import { verticalCss } from "./style"

export const VerticalLayout: FC<VerticalLayoutProps> = (props) => {
  const { children } = props
  return <div css={verticalCss}>{children}</div>
}
