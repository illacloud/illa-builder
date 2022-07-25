import { FC, useEffect } from "react"
import { Button } from "@illa-design/button"
import { ButtonWidgetProps, WrappedButtonProps } from "./interface"
import { buttonLayoutStyle } from "./style"

export const WrappedButton: FC<WrappedButtonProps> = (props) => {
  const {
    text,
    variant,
    leftIcon,
    rightIcon,
    disabled,
    borderRadius,
    loading,
    colorScheme,
    handleOnClick,
  } = props

  return (
    <div css={buttonLayoutStyle}>
      <Button
        disabled={disabled}
        variant={variant}
        buttonRadius={borderRadius}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        loading={loading}
        fullWidth
        fullHeight
        onClick={handleOnClick}
        backgroundColor={colorScheme}
        borderColor={colorScheme}
        textColor={variant === "outline" ? colorScheme : "#FFF"}
      >
        {text}
      </Button>
    </div>
  )
}

WrappedButton.displayName = "WrappedButton"

export const ButtonWidget: FC<ButtonWidgetProps> = (props) => {
  const {
    text,
    variant,
    leftIcon,
    rightIcon,
    disabled,
    borderRadius,
    loading,
    colorScheme,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    displayName,
  } = props

  useEffect(() => {
    handleUpdateGlobalData(displayName, {
      text,
      variant,
      leftIcon,
      rightIcon,
      disabled,
      borderRadius,
      loading,
      colorScheme,
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    text,
    variant,
    leftIcon,
    rightIcon,
    disabled,
    borderRadius,
    loading,
    colorScheme,
  ])
  return <WrappedButton {...props} />
}

ButtonWidget.displayName = "ButtonWidget"
