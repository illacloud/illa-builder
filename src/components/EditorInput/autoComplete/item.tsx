import { forwardRef, ForwardedRef } from "react"
import { ACItemProps } from "./interface"
import {
  StringIcon,
  NumberIcon,
  ArrayIcon,
  FunctionIcon,
  ObjectIcon,
  ComponentIcon,
  NullIcon,
} from "./icon"
import { contentStyle, itemStyle, typeStyle } from "./styles"

export const ACItem = forwardRef<HTMLDivElement, ACItemProps>(
  (props, ref: ForwardedRef<HTMLDivElement>) => {
    const { type, content, ...rest } = props

    const IconEle = () => {
      switch (type) {
        case "String":
          return <StringIcon />
        case "Number":
          return <NumberIcon />
        case "Array":
          return <ArrayIcon />
        case "Function":
          return <FunctionIcon />
        case "Object":
          return <ObjectIcon />
        case "Component":
          return <ComponentIcon />
        case "Null":
          return <NullIcon />
      }
    }

    return (
      <div css={itemStyle} ref={ref} {...rest}>
        {IconEle()}
        <span css={contentStyle}>{content}</span>
        <span css={typeStyle}>{type}</span>
      </div>
    )
  },
)
