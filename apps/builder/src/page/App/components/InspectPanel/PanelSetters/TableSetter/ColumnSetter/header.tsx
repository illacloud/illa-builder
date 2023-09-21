import { FC } from "react"
import { HeaderProps } from "./interface"
import { optionListHeaderStyle } from "./style"

export const OptionListHeader: FC<HeaderProps> = (props) => {
  const { labelName } = props

  return (
    <div css={optionListHeaderStyle}>
      <div>{labelName}</div>
    </div>
  )
}

OptionListHeader.displayName = "OptionListHeader"
