import { ButtonWidgetProps, WrappedButtonProps } from "./interface"
import { buttonLayoutStyle } from "@/widgetLibrary/ButtonWidget/style"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { Button } from "@illa-design/react"
import { FC, useEffect } from "react"

export const WrappedButton: FC<WrappedButtonProps> = (props) => {
  const {
    text,
    variant,
    leftIcon,
    rightIcon,
    disabled,
    loading,
    colorScheme,
    handleOnClick,
  } = props

  return (
    <Button
      disabled={disabled}
      variant={variant}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      loading={loading}
      colorScheme={colorScheme}
      fullWidth
      fullHeight
      onClick={handleOnClick}
    >
      {text}
    </Button>
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
    loading,
    colorScheme,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    displayName,
    tooltipText,
  } = props

  useEffect(() => {
    handleUpdateGlobalData(displayName, {
      text,
      variant,
      leftIcon,
      rightIcon,
      disabled,
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
    loading,
    colorScheme,
    handleUpdateGlobalData,
    displayName,
    handleDeleteGlobalData,
  ])
  return (
    <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
      <div css={buttonLayoutStyle}>
        <WrappedButton {...props} />
      </div>
    </TooltipWrapper>
  )
}

ButtonWidget.displayName = "ButtonWidget"
