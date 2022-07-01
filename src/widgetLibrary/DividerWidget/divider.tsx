import { forwardRef, useMemo } from "react"
import { Divider } from "@illa-design/divider"
import { Wrapper } from "@/widgetLibrary/PublicSector/Wrapper"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { WrappedDividerProps } from "./interface"

export const WrappedDivider = forwardRef<any, WrappedDividerProps>(
  (props, ref) => {
    const { tooltipText, text, textAlign, styles } = props

    const _textSize = useMemo(() => {
      return !isNaN(Number(styles?.textSize))
        ? styles?.textSize + "px"
        : styles?.textSize?.toString()
    }, [styles?.textSize])

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
            colorScheme={styles?.colorScheme}
          />
        </Wrapper>
      </TooltipWrapper>
    )
  },
)

WrappedDivider.displayName = "WrappedDivider"

export const DividerWidget = WrappedDivider
