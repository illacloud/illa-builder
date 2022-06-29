import { forwardRef, useMemo } from "react"
import { Divider } from "@illa-design/divider"
import { Wrapper } from "@/widgetLibrary/PublicSector/Wrapper"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { WrappedDividerProps } from "./interface"

export const WrappedDivider = forwardRef<any, WrappedDividerProps>(
  (props, ref) => {
    const { tooltipText, text, textAlign, textSize, color } = props

    const _textSize = useMemo(() => {
      return !isNaN(Number(textSize)) ? textSize + "px" : textSize?.toString()
    }, [textSize])

    return (
      <TooltipWrapper
        tooltipText={tooltipText}
        disabled={!tooltipText}
        position="tl"
      >
        <Wrapper alignment="fullWidth">
          <Divider
            text={text}
            textAlign={textAlign}
            textSize={_textSize}
            colorScheme={color}
          />
        </Wrapper>
      </TooltipWrapper>
    )
  },
)

WrappedDivider.displayName = "WrappedDivider"

export const DividerWidget = WrappedDivider
