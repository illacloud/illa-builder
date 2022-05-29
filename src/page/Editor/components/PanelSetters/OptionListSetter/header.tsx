import { FC, useCallback, useContext } from "react"
import { AddIcon } from "@illa-design/icon"
import { addIconCss, optionListHeaderCss, headerActionButtonCss } from "./style"
import { HeaderProps } from "./interface"
import { OptionListSetterContext } from "./context/optionListContext"
import { dispatch } from "use-bus"
import { v4 } from "uuid"

export const OptionListHeader: FC<HeaderProps> = (props) => {
  const { labelName } = props

  const { configPanel, handleAddItemToDslAsync } = useContext(
    OptionListSetterContext,
  )

  const handleClickNewButton = useCallback(() => {
    const length = configPanel.length
    handleAddItemToDslAsync({
      value: `Option ${length + 1}`,
      id: `option-${v4()}`,
      label: `Option ${length + 1}`,
    }).then(() => {
      dispatch("CLOSE_LIST_ALL_MODAL")
      dispatch(`OPEN_LIST_ITEM_MODAL_${length}`)
    })
  }, [configPanel, handleAddItemToDslAsync])

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
