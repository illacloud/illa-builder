import { FC } from "react"
import { ComponentSessionProps } from "./interface"
import {
  componentListContainerCss,
  sessionContainerCss,
  sessionTitleCss,
} from "./style"
import { ComponentItem } from "./ComponentItem"

export const ComponentSession: FC<ComponentSessionProps> = (props) => {
  const { title, children } = props

  return children.length > 0 ? (
    <div css={sessionContainerCss}>
      <span css={sessionTitleCss}>{title}</span>
      <div css={componentListContainerCss}>
        {children?.map((item) => (
          <ComponentItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  ) : null
}

ComponentSession.displayName = "ComponentSession"
