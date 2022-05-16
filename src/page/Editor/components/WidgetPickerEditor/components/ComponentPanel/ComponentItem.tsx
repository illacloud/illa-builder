import { FC } from "react"
import { ComponentModel } from "@/wrappedComponents/interface"
import { iconCss, itemContainerCss, nameCss } from "./style"

export const ComponentItem: FC<ComponentModel> = (props) => {
  const { name, icon } = props

  return (
    <div css={itemContainerCss}>
      <span css={iconCss}>{icon}</span>
      <span css={nameCss}>{name}</span>
    </div>
  )
}

ComponentItem.displayName = "ComponentItem"
