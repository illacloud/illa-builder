import { FC } from "react"
import { EmptyStateIcon } from "@illa-design/icon"
import { emptyCss, emptyTipCss } from "./style"

export const Empty: FC = (props) => {
  return (
    <div css={emptyCss}>
      <EmptyStateIcon size={"48px"} />
      <span css={emptyTipCss}>Sorry, No search result</span>
    </div>
  )
}

Empty.displayName = "Empty"
