import { FC } from "react"
import { ComponentModel } from "@/wrappedComponents/interface"
import { iconCss, itemContainerCss, nameCss } from "./style"

export const ComponentItem: FC<ComponentModel> = (props) => {
  const { widgetName, icon } = props

  return (
    <div css={itemContainerCss} onDragStart={() => {}}>
      <span css={iconCss}>{icon}</span>
      <span css={nameCss}>{widgetName}</span>
    </div>
  )
}

ComponentItem.displayName = "ComponentItem"
