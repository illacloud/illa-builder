import { FC, useCallback, useContext } from "react"
import { AddIcon } from "@illa-design/icon"
import { addIconCss, optionListHeaderCss, headerActionButtonCss } from "./style"
import { HeaderProps } from "./interface"
import { dispatch } from "use-bus"
import { v4 } from "uuid"
import { DatasetsListContext } from "@/page/Editor/components/PanelSetters/DatasetsSetter/context/datasetsListContext"

export const OptionListHeader: FC<HeaderProps> = (props) => {
  const { labelName } = props

  const { options, handleAddItemToDslAsync } = useContext(DatasetsListContext)

  const handleClickNewButton = useCallback(() => {
    const length = options.length
    handleAddItemToDslAsync({
      // value: `Option ${length + 1}`,
      // key: `option-${v4()}`,
      // name: `Option ${length + 1}`,
    }).then(() => {
      dispatch("CLOSE_LIST_ALL_MODAL")
      dispatch(`OPEN_LIST_ITEM_MODAL_${length}`)
    })
  }, [options, handleAddItemToDslAsync])

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
