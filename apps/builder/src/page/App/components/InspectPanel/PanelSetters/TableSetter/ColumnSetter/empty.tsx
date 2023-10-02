import { FC } from "react"
import { emptyEmptyBodyStyle } from "./style"

export const EmptyBody: FC = () => {
  return <div css={emptyEmptyBodyStyle}>No columns</div>
}

EmptyBody.displayName = "ColumnsEmptyBody"
