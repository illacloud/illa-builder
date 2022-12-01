import { ForwardedRef, forwardRef } from "react"
import {
  ArrayIcon,
  ComponentIcon,
  FunctionIcon,
  NullIcon,
  NumberIcon,
  ObjectIcon,
  StringIcon,
} from "@illa-design/react"
import { AutoCompleteItemProps, AutoCompleteItemType } from "./interface"
import { contentStyle, itemStyle, typeStyle } from "./styles"

const IconEle = (type: AutoCompleteItemType) => {
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

export const AutoCompleteItem = forwardRef<
  HTMLDivElement,
  AutoCompleteItemProps
>((props, ref: ForwardedRef<HTMLDivElement>) => {
  const { type, content, ...rest } = props

  return (
    <div css={itemStyle} ref={ref} {...rest}>
      {type ? IconEle(type) : null}
      <span css={contentStyle}>{content}</span>
      {type ? <span css={typeStyle}>{type}</span> : null}
    </div>
  )
})

AutoCompleteItem.displayName = "AutoCompleteItem"
