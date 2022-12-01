import { FC } from "react"
import { Divider } from "@illa-design/react"
import { PanelDividerProps } from "./interface"
import { applyPanelDividerCss } from "./style"

export const PanelDivider: FC<PanelDividerProps> = (props) => {
  const { hasMargin = true } = props
  return (
    <div css={applyPanelDividerCss(hasMargin)}>
      <Divider />
    </div>
  )
}
