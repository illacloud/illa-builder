import { FC } from "react"
import { WarningCircleIcon } from "@illa-design/react"
import { errorMsgStyle } from "./style"

interface ErrorTextProps {
  errorMessage: string
}

export const ErrorText: FC<ErrorTextProps> = ({ errorMessage }) => {
  if (!errorMessage) return null
  return (
    <div css={errorMsgStyle}>
      <WarningCircleIcon size="16px" mt="4px" />
      {errorMessage}
    </div>
  )
}
