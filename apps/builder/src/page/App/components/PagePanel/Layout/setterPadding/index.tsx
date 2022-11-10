import { FC } from "react"
import { SetterPaddingLayout } from "./interface"
import { setterPaddingStyle } from "./style"

export const SetterPadding: FC<SetterPaddingLayout> = (props) => {
  const { children } = props
  return <div css={setterPaddingStyle}>{children}</div>
}
