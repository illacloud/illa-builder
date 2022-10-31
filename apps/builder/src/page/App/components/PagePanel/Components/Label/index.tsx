import { FC } from "react"
import { labelStyle } from "./style"
import { Trigger } from "@illa-design/react"
import { PageLabelProps } from "./interface"

export const PageLabel: FC<PageLabelProps> = (props) => {
  const { tooltip, labelName, size } = props
  return (
    <Trigger
      trigger="hover"
      position="left"
      content={tooltip}
      disabled={!tooltip}
    >
      <span css={labelStyle(size, !tooltip)}>{labelName}</span>
    </Trigger>
  )
}

PageLabel.displayName = "PageLabel"
