import { forwardRef, ForwardedRef } from "react"
import { ACItemProps } from "./interface"
import { StringIcon, NumberIcon, ArrayIcon, FunctionIcon, ObjectIcon, ComponentIcon, NullIcon } from './icon'
import { contentCss, itemCss, typeCss } from './styles'

export const ACItem = forwardRef<HTMLDivElement, ACItemProps>(
  (props, ref: ForwardedRef<HTMLDivElement>) => {
    const {
      type,
      content,
      ...rest
    } = props

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
      <div css={itemCss} ref={ref} {...rest}>
        {IconEle()}
        <span css={contentCss}>{content}</span>
        <span css={typeCss}>{type}</span>
      </div>
    )
  }
)