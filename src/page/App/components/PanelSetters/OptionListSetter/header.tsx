import { FC } from "react"
import { AddIcon } from "@illa-design/icon"
import {
  addIconStyle,
  optionListHeaderStyle,
  headerActionButtonStyle,
} from "./style"
import { HeaderProps } from "./interface"

export const OptionListHeader: FC<HeaderProps> = (props) => {
  const { labelName, handleAddOption } = props

  return (
    <div css={optionListHeaderStyle}>
      <div>{labelName}</div>
      <div css={headerActionButtonStyle} onClick={handleAddOption}>
        <AddIcon _css={addIconStyle} />
        <span>New</span>
      </div>
    </div>
  )
}

OptionListHeader.displayName = "OptionListHeader"
