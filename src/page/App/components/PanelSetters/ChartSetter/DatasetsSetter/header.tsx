import { FC } from "react"
import { AddIcon } from "@illa-design/icon"
import { addIconCss, optionListHeaderCss, headerActionButtonCss } from "./style"
import { HeaderProps } from "./interface"

export const DatasetSetterHeader: FC<HeaderProps> = (props) => {
  const { labelName, handleAddItem } = props

  return (
    <div css={optionListHeaderCss}>
      <div>{labelName}</div>
      <div css={headerActionButtonCss} onClick={() => handleAddItem()}>
        <AddIcon _css={addIconCss} />
        <span>New</span>
      </div>
    </div>
  )
}

DatasetSetterHeader.displayName = "DatasetSetterHeader"
