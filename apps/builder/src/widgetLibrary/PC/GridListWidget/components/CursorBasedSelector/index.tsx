import { FC } from "react"
import { NextIcon, PreviousIcon } from "@illa-design/react"
import { operationIconStyle, selectContainerStyle } from "./style"

interface CursorBasedSelectorProps {
  hasNextPage?: boolean
  page: number
  previousCursor?: string
  nextCursor?: string
  onChange: (isNext: boolean) => void
}
const CursorBasedSelector: FC<CursorBasedSelectorProps> = ({
  hasNextPage,
  page,
  onChange,
}) => {
  return (
    <div css={selectContainerStyle}>
      <span css={operationIconStyle(page <= 0)} onClick={() => onChange(false)}>
        <PreviousIcon size="14px" />
      </span>
      {page + 1}
      <span
        css={operationIconStyle(!hasNextPage)}
        onClick={() => hasNextPage && onChange(true)}
      >
        <NextIcon size="14px" />
      </span>
    </div>
  )
}

export default CursorBasedSelector
