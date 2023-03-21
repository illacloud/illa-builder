import { FC, HTMLAttributes } from "react"
import { Button } from "@illa-design/react"
import {
  actionStyle,
  decsStyle,
  titleStyle,
} from "@/components/Guide/GuidePopover/style"

export interface GuidePopoverProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
}

export const GuidePopover: FC<GuidePopoverProps> = (props) => {
  const { title, description, ...rest } = props
  return (
    <div {...rest}>
      <div css={titleStyle}>{title}</div>
      <div css={decsStyle}>{description}</div>
      <div css={actionStyle}>
        <Button>Skip</Button>
        <Button>Do it for me</Button>
      </div>
    </div>
  )
}

GuidePopover.displayName = "GuidePopover"
