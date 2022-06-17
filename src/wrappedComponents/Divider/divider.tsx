import { FC, useMemo } from "react"
import { Wrapper } from "@/wrappedComponents/Wrapper"
import { TooltipWrapper } from "@/wrappedComponents/TooltipWrapper"
import { Divider } from "@illa-design/divider"
import { WrappedDividerProps } from "./interface"

export const WrappedDivider: FC<WrappedDividerProps> = (props) => {
  const { tooltipText, text, textAlign, textSize, hidden, color } = props

  const _textSize = useMemo(() => {
    return !isNaN(Number(textSize)) ? textSize + "px" : textSize?.toString()
  }, [textSize])

  return (
    <TooltipWrapper
      tooltipText={tooltipText}
      disabled={!tooltipText}
      position="tl"
    >
      <Wrapper alignment="fullWidth" hidden={hidden}>
        <Divider
          text={text}
          textAlign={textAlign}
          textSize={_textSize}
          colorScheme={color}
        />
      </Wrapper>
    </TooltipWrapper>
  )
}

WrappedDivider.displayName = "WrappedDivider"

export const DividerWidget = WrappedDivider
