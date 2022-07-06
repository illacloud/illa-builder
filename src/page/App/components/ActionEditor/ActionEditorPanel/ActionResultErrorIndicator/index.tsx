import { FC } from "react"
import { WarningCircleIcon } from "@illa-design/icon"
import { ActionResultErrorIndicatorProps } from "./interface"
import {
  actionResultErrorIndicatorIconStyle,
  actionResultErrorIndicatorMessageStyle,
  actionResultErrorIndicatorWrapperStyle,
} from "./style"

export const ActionResultErrorIndicator: FC<ActionResultErrorIndicatorProps> = (
  props,
) => {
  const { errorMessage } = props
  return (
    <div css={actionResultErrorIndicatorWrapperStyle}>
      <WarningCircleIcon
        css={actionResultErrorIndicatorIconStyle}
        size="10px"
      />
      <span css={actionResultErrorIndicatorMessageStyle}>{errorMessage}</span>
    </div>
  )
}

ActionResultErrorIndicator.displayName = "ActionResultErrorIndicator"
