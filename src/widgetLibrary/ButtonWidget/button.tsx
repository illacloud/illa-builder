import { FC, useEffect } from "react"
import { Button } from "@illa-design/button"
import { WrappedButtonProps } from "./interface"
import { applyButtonLayoutStyle } from "./style"

export const WrappedButton: FC<WrappedButtonProps> = (props) => {
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
    colorScheme,
    handleUpdateGlobalData,
    handleOnClick,
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

export const ButtonWidget = WrappedButton
