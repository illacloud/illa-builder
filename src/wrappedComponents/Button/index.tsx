import { FC, useMemo } from "react"
import { WrappedButtonProps } from "./interface"
import { Button } from "@illa-design/button"
import { Wrapper } from "../Wrapper"
import { globalColor, illaPrefix } from "@illa-design/theme"

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
    <div>
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
        >
          {text}
        </Button>
      </Wrapper>
    </div>
  )
}

WrappedButton.displayName = "WrappedButton"
