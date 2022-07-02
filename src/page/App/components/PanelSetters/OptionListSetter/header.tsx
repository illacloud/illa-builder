import { FC } from "react"
import { AddIcon } from "@illa-design/icon"
import { addIconCss, optionListHeaderCss, headerActionButtonCss } from "./style"
import { HeaderProps } from "./interface"

export const OptionListHeader: FC<HeaderProps> = (props) => {
  const { labelName, handleAddOption } = props

  return (
    <div css={optionListHeaderCss}>
      <div>{labelName}</div>
      <div css={headerActionButtonCss} onClick={handleAddOption}>
        <AddIcon _css={addIconCss} />
        <span>New</span>
      </div>
    </div>
  )
}

OptionListHeader.displayName = "OptionListHeader"
