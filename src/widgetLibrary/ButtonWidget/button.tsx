import { forwardRef, useImperativeHandle, useMemo } from "react"
import { Button } from "@illa-design/button"
import { Wrapper } from "@/widgetLibrary/PublicSector/Wrapper"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { WrappedButtonProps } from "./interface"
import { applyButtonLayoutStyle } from "./style"

export const WrappedButton = forwardRef<any, WrappedButtonProps>(
  (props, ref) => {
    // TODO:
    useImperativeHandle(ref, () => ({}))
    const {
      text,
      variant,
      leftIcon,
      rightIcon,
      disabled,
      submit,
      borderRadius,
      loading,
      alignment,
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
        <div css={applyButtonLayoutStyle(alignment ?? "fullWidth")}>
          <Wrapper alignment="fullWidth">
            <Button
              disabled={disabled}
              variant={variant}
              autoFullVertically
              autoFullHorizontal
              buttonRadius={borderRadius}
              leftIcon={leftIcon}
              rightIcon={rightIcon}
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
  },
)

WrappedButton.displayName = "ButtonWidget"

export const ButtonWidget = WrappedButton
