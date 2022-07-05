import { FC } from "react"
import { WarningCircleIcon } from "@illa-design/icon"
import { ActionResultErrorIndicatorProps } from "./interface"
import {
  actionResultErrorIndicatorIcon,
  actionResultErrorIndicatorMessage,
  actionResultErrorIndicatorWrapper,
} from "./style"

export const ActionResultErrorIndicator: FC<ActionResultErrorIndicatorProps> = (
  props,
) => {
  const { errorMessage } = props
  return (
    <div css={actionResultErrorIndicatorWrapper}>
      <WarningCircleIcon css={actionResultErrorIndicatorIcon} size="10px" />
      <span css={actionResultErrorIndicatorMessage}>{errorMessage}</span>
    </div>
  )
}

ActionResultErrorIndicator.displayName = "ActionResultErrorIndicator"
