import { ForwardedRef, forwardRef } from "react"
import { ReactComponent as ArrayIcon } from "@/assets/codeEditor/variabletype-array.svg"
import { ReactComponent as ComponentIcon } from "@/assets/codeEditor/variabletype-component.svg"
import { ReactComponent as FunctionIcon } from "@/assets/codeEditor/variabletype-function.svg"
import { ReactComponent as NullIcon } from "@/assets/codeEditor/variabletype-null.svg"
import { ReactComponent as NumberIcon } from "@/assets/codeEditor/variabletype-number.svg"
import { ReactComponent as ObjectIcon } from "@/assets/codeEditor/variabletype-object.svg"
import { ReactComponent as StringIcon } from "@/assets/codeEditor/variabletype-string.svg"
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
