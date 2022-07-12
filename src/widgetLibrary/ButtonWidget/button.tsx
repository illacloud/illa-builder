import { FC, useEffect } from "react"
import { Button } from "@illa-design/button"
import { ButtonWidgetProps, WrappedButtonProps } from "./interface"
import { applyButtonLayoutStyle } from "./style"

export const WrappedButton: FC<WrappedButtonProps> = (props) => {
  const {
    text,
    variant,
    leftIcon,
    rightIcon,
    disabled,
    borderRadius,
    loading,
    alignment,
    colorScheme,
    handleOnClick,
  } = props

  return (
    <div css={applyButtonLayoutStyle(alignment ?? "fullWidth")}>
      <Button
        disabled={disabled}
        variant={variant}
        autoFullVertically
        autoFullHorizontal={alignment === "fullWidth"}
        buttonRadius={borderRadius}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        colorScheme={colorScheme}
        loading={loading}
        fullWidth={alignment === "fullWidth"}
        onClick={handleOnClick}
      >
        {text}
      </Button>
    </div>
  )
}
WrappedButton.displayName = "ButtonWidget"

export const ButtonWidget: FC<ButtonWidgetProps> = (props) => {
  const {
    text,
    variant,
    leftIcon,
    rightIcon,
    disabled,
    borderRadius,
    loading,
    alignment,
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
      alignment,
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
    alignment,
    colorScheme,
  ])
  return <WrappedButton {...props} />
}
