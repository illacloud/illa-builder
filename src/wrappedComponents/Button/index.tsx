import { FC, useMemo } from "react"
import { WrappedButtonProps } from "./interface"
import { Button } from "@illa-design/button"
import { Wrapper } from "../Wrapper"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { withParser } from "../parserHOC"
import { applyButtonLayoutStyle } from "./style"
import { TooltipWrapper } from "../TooltipWrapper"

export const BUTTON_WIDGET_CONFIG = {
  type: "BUTTON_WIDGET",
  defaults: {
    rows: 50,
    columns: 500,
    widgetName: "button",
    version: "0.0.1",
    text: "Button",
    variant: "fill",
    submit: false,
    width: "200px",
    alignment: "fullWidth",
    backgroundColor: globalColor(`--${illaPrefix}-blue-01`),
    textColor: globalColor(`--${illaPrefix}-white-01`),
    borderColor: globalColor(`--${illaPrefix}-blue-01`),
  },
}

export const WrappedButton: FC<WrappedButtonProps> = (props) => {
  const {
    text = "Button",
    variant,
    leftIcon,
    rightIcon,
    disabled,
    submit,
    backgroundColor = globalColor(`--${illaPrefix}-blue-01`),
    borderColor,
    textColor,
    borderRadius,
    loading,
    alignment = "fullWidth",
    tooltipText,
  } = props

  const _textColor = useMemo(() => {
    return (
      textColor ??
      (variant === "outline"
        ? globalColor(`--${illaPrefix}-blue-01`)
        : globalColor(`--${illaPrefix}-white-01`))
    )
  }, [variant, textColor])

  const _borderColor = useMemo(() => {
    return (
      borderColor ??
      (variant === "outline"
        ? globalColor(`--${illaPrefix}-blue-01`)
        : undefined)
    )
  }, [variant, borderColor])

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
            borderColor={_borderColor}
            backgroundColor={backgroundColor}
            textColor={_textColor}
            loading={loading}
          >
            {text}
          </Button>
        </Wrapper>
      </div>
    </TooltipWrapper>
  )
}

export const WrappedButtonWidget = withParser(WrappedButton)

WrappedButtonWidget.displayName = "TextWidget"

WrappedButton.displayName = "WrappedButton"
