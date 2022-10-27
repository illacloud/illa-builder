import { FC } from "react"
import { invalidateMessageCss } from "./style"
import { WarningCircleIcon } from "@illa-design/icon"
import { ValidateMessageNewProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"

export const InvalidMessage: FC<ValidateMessageNewProps> = (props) => {
  const { validateMessage } = props

  return (
    <>
      {typeof validateMessage === "string" && validateMessage.length > 0 && (
        <span css={invalidateMessageCss}>
          <WarningCircleIcon />
          {validateMessage}
        </span>
      )}
    </>
  )
}
