import { FC } from "react"
import { invalidateMessageCss } from "./style"
import { WarningCircleIcon } from "@illa-design/icon"
import { handleValidateCheck } from "./utils"
import { ValidateMessageProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"

export const InvalidMessage: FC<ValidateMessageProps> = (props) => {
  const { hideValidationMessage } = props

  const message = handleValidateCheck(props)
  const showMessage = !hideValidationMessage && message && message.length > 0

  return (
    <>
      {showMessage && (
        <span css={invalidateMessageCss}>
          <WarningCircleIcon />
          {message}
        </span>
      )}
    </>
  )
}
