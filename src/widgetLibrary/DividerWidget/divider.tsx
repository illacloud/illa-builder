import { forwardRef, useMemo } from "react"
import { Divider } from "@illa-design/divider"
import { WrappedDividerProps } from "./interface"

export const WrappedDivider = forwardRef<any, WrappedDividerProps>(
  (props, ref) => {
    const { text, textAlign, colorScheme, textSize } = props

    const _textSize = useMemo(() => {
      return !isNaN(Number(textSize)) ? textSize + "px" : textSize?.toString()
    }, [textSize])

    return (
      <Divider
        text={text}
        textAlign={textAlign}
        textSize={_textSize}
        colorScheme={colorScheme}
      />
    )
  },
)

WrappedDivider.displayName = "WrappedDivider"

export const DividerWidget = WrappedDivider
