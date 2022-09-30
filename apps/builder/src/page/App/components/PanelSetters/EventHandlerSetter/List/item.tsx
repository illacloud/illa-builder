import { FC } from "react"
import {
  groupWrapperStyle,
  listItemWrapperStyle,
} from "@/page/App/components/PanelSetters/EventHandlerSetter/List/style"
import { More } from "@/page/App/components/PanelSetters/EventHandlerSetter/List/more"
import { EventAndMethodLabel } from "@/page/App/components/PanelSetters/EventHandlerSetter/List/eventAndMethodLabel"
import { ListItemProps } from "@/page/App/components/PanelSetters/EventHandlerSetter/List/interface"

export const ListItem: FC<ListItemProps> = props => {
  const { index } = props
  return (
    <div css={listItemWrapperStyle}>
      <div css={groupWrapperStyle}>
        <EventAndMethodLabel index={index} />
        <More index={index} />
      </div>
    </div>
  )
}
