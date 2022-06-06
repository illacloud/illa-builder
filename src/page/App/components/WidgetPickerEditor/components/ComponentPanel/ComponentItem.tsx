import { FC } from "react"
import { iconCss, itemContainerCss, nameCss } from "./style"
import { ComponentItemProps } from "@/page/App/components/WidgetPickerEditor/components/ComponentPanel/interface"

export const ComponentItem: FC<ComponentItemProps> = (props) => {
  const { displayName, icon, id, ...dragInfo } = props

  return (
    <div css={itemContainerCss} onDragStart={() => {}}>
      <span css={iconCss}>{icon}</span>
      <span css={nameCss}>{displayName}</span>
    </div>
  )
}

ComponentItem.displayName = "ComponentItem"
