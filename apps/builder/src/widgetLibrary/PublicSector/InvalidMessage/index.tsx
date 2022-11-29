import { invalidateMessageCss } from "./style"
import { ValidateMessageNewProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"
import { WarningCircleIcon } from "@illa-design/react"
import { FC } from "react"

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
