import { FC, ReactNode } from "react"
import { CloseIcon, RightIcon, WarningCircleIcon } from "@illa-design/icon"
import { ActionResultType } from "./interface"
import {
  errorIconStyle,
  errorResultWrapperStyle,
  resCloseIconStyle,
  resultContainerStyle,
  successIconStyle,
  successResultWrapperStyle,
} from "./style"
import { AxiosError } from "axios"

interface ActionResultProps {
  result?: ActionResultType
}

export const ActionResult: FC<ActionResultProps> = (props) => {
  const { result } = props
  const onClose = () => {}

  return result ? (
    <div css={resultContainerStyle}>
      {result?.error ? (
        <div css={errorResultWrapperStyle}>
          <WarningCircleIcon css={errorIconStyle} size="10px" />
          <span>{(result?.result as AxiosError)?.message?.toString()}</span>
        </div>
      ) : (
        <div>
          <div css={successResultWrapperStyle}>
            <RightIcon css={successIconStyle} size="10px" />
            <span>{"title"}</span>
            <CloseIcon css={resCloseIconStyle} onClick={onClose} />
          </div>
          {(result?.result as any)?.toString()}
        </div>
      )}
    </div>
  ) : (
    <div></div>
  )
}

ActionResult.displayName = "ActionResult"
