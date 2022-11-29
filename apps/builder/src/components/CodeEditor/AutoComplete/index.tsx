import { forwardRef, ForwardedRef } from "react"
import {
  StringIcon,
  NumberIcon,
  ArrayIcon,
  FunctionIcon,
  ObjectIcon,
  ComponentIcon,
  NullIcon,
} from "@illa-design/react"
import { contentStyle, itemStyle, typeStyle } from "./styles"
import { AutoCompleteItemProps, AutoCompleteItemType } from "./interface"

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
