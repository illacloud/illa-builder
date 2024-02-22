import { Button } from "antd-mobile"
import { FC, useCallback } from "react"
import { buttonLayoutStyle } from "@/widgetLibrary/PC/ButtonWidget/style"
import { TooltipWrapper } from "@/widgetLibrary/PC/PublicSector/TooltipWrapper"
import { ButtonWidgetProps, WrappedButtonProps } from "./interface"

export const WrappedButton: FC<WrappedButtonProps> = (props) => {
  const { text, fill, disabled, loading, handleOnClick } = props

  return (
    <Button
      disabled={disabled}
      fill={fill}
      loading={loading}
      block
      onClick={handleOnClick}
      color="primary"
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
