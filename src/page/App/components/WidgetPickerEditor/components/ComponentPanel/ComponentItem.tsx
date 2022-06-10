import { FC } from "react"
import { iconCss, itemContainerCss, nameCss } from "./style"
import { ComponentItemProps } from "@/page/App/components/WidgetPickerEditor/components/ComponentPanel/interface"

export const ComponentItem: FC<ComponentItemProps> = (props) => {
  const { widgetName, icon, id, ...partialDragInfo } = props

  return (
    <div css={itemContainerCss}>
      <span css={iconCss}>{icon}</span>
      <span css={nameCss}>{widgetName}</span>
    </div>
  )
}

ComponentItem.displayName = "ComponentItem"
