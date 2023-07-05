import { FC } from "react"
import { DragIconAndLabel } from "@/page/App/components/PanelSetters/OptionListSetter/dragIconAndLabel"
import { More } from "@/page/App/components/PanelSetters/OptionListSetter/more"
import { ListItemProps } from "./interface"
import { optionListItemStyle } from "./style"

export const ListItem: FC<ListItemProps> = (props) => {
  const { id: _id, label, value: _value, index, ...otherProps } = props

  return (
    <div {...otherProps}>
      <div css={optionListItemStyle}>
        <DragIconAndLabel index={index} label={label} />
        <More index={index} label={label} />
      </div>
    </div>
  )
}
