import { FC, useCallback } from "react"
import { Button } from "@illa-design/react"
import { buttonLayoutStyle } from "@/widgetLibrary/ButtonWidget/style"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { ButtonWidgetProps, WrappedButtonProps } from "./interface"

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
  const { tooltipText, triggerEventHandler } = props

  const handleOnClick = useCallback(() => {
    triggerEventHandler("click")
  }, [triggerEventHandler])

  return (
    <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
      <div css={buttonLayoutStyle}>
        <WrappedButton {...props} handleOnClick={handleOnClick} />
      </div>
    </TooltipWrapper>
  )
}

ButtonWidget.displayName = "ButtonWidget"
export default ButtonWidget
