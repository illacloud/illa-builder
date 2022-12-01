import { FC } from "react"
import { WarningCircleIcon } from "@illa-design/react"
import { ValidateMessageNewProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"
import { invalidateMessageCss } from "./style"

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
