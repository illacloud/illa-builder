import { FC, useCallback } from "react"
import { AddIcon } from "@illa-design/icon"
import { addIconCss, optionListHeaderCss, headerActionButtonCss } from "./style"
import { HeaderProps } from "./interface"
import { generateNewOptionItem } from "@/page/App/components/PanelSetters/OptionListSetter/utils/generateNewOptions"

export const OptionListHeader: FC<HeaderProps> = (props) => {
  const { labelName, optionItems, handleUpdateDsl, attrName } = props

  const handleClickNewButton = useCallback(() => {
    const num = optionItems.length + 1
    const newItem = generateNewOptionItem(num)
    handleUpdateDsl(attrName, [...optionItems, newItem])
  }, [optionItems, handleUpdateDsl, attrName])

  return (
    <div css={optionListHeaderCss}>
      <div>{labelName}</div>
      <div css={headerActionButtonCss} onClick={handleClickNewButton}>
        <AddIcon _css={addIconCss} />
        <span>New</span>
      </div>
    </div>
  )
}

OptionListHeader.displayName = "OptionListHeader"
