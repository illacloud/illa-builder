import { FC, useMemo } from "react"
import { WrappedButtonProps } from "./interface"
import { Button } from "@illa-design/button"
import { Wrapper } from "@/wrappedComponents/Wrapper"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { withParser } from "@/wrappedComponents/parserHOC"
import { applyButtonLayoutStyle } from "./style"
import { TooltipWrapper } from "@/wrappedComponents/TooltipWrapper"

export const WrappedButton: FC<WrappedButtonProps> = (props) => {
  const {
    text = "Button",
    variant,
    leftIcon,
    rightIcon,
    disabled,
    submit,
    borderRadius,
    loading,
    alignment = "fullWidth",
    tooltipText,
    colorScheme,
  } = props

  // TODOS : P1,wait PM

  // const _textColor = useMemo(() => {
  //   return (
  //     textColor ??
  //     (variant === "outline"
  //       ? globalColor(`--${illaPrefix}-blue-01`)
  //       : globalColor(`--${illaPrefix}-white-01`))
  //   )
  // }, [variant, textColor])
  //
  // const _borderColor = useMemo(() => {
  //   return (
  //     borderColor ??
  //     (variant === "outline"
  //       ? globalColor(`--${illaPrefix}-blue-01`)
  //       : undefined)
  //   )
  // }, [variant, borderColor])

  return (
    <TooltipWrapper
      tooltipText={tooltipText}
      disabled={!tooltipText}
      position="tl"
    >
      <div css={applyButtonLayoutStyle(alignment)}>
        <Wrapper alignment="fullWidth">
          <Button
            disabled={disabled}
            variant={variant}
            autoFullVertically
            autoFullHorizontal
            buttonRadius={borderRadius}
            // borderColor={_borderColor}
            // backgroundColor={backgroundColor}
            // textColor={_textColor}
            colorScheme={colorScheme}
            loading={loading}
          >
            {text}
          </Button>
        </Wrapper>
      </div>
    </TooltipWrapper>
  )
}

WrappedButton.displayName = "ButtonWidget"

export const ButtonWidget = withParser(WrappedButton)
