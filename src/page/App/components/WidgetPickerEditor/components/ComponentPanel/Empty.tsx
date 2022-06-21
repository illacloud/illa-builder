import { FC } from "react"
import { EmptyStateIcon } from "@illa-design/icon"
import { emptyStyle, emptyTipStyle } from "./style"

export const Empty: FC = () => {
  return (
    <div css={emptyStyle}>
      <EmptyStateIcon size="48px" />
      <span css={emptyTipStyle}>Sorry, No search result</span>
    </div>
  )
}

Empty.displayName = "Empty"
