import { FC, HTMLAttributes } from "react"
import { useDispatch } from "react-redux"
import { Button } from "@illa-design/react"
import {
  actionStyle,
  decsStyle,
  guidePopoverStyle,
  titleStyle,
} from "@/components/Guide/GuidePopover/style"
import { guideActions } from "@/redux/guide/guideSlice"

export interface GuidePopoverProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
}

export const GuidePopover: FC<GuidePopoverProps> = (props) => {
  const { title, description, ...rest } = props
  const dispatch = useDispatch()

  return (
    <div css={guidePopoverStyle} {...rest}>
      <div css={titleStyle}>{title}</div>
      <div css={decsStyle}>{description}</div>
      <div css={actionStyle}>
        <Button variant={"fill"} colorScheme={"techPurple"}>
          Skip
        </Button>
        <Button
          variant={"fill"}
          colorScheme={"techPurple"}
          onClick={() => {
            dispatch(guideActions.updateNextStepReducer())
          }}
        >
          Do it for me
        </Button>
      </div>
    </div>
  )
}

GuidePopover.displayName = "GuidePopover"
