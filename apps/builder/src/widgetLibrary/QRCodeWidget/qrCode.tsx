import { QRCodeSVG } from "qrcode.react"
import { FC, useEffect } from "react"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { AutoHeightContainer } from "../PublicSector/AutoHeightContainer"
import { QRCodeWidgetProps } from "./interface"
import { fullStyle, qrCodeStyle } from "./style"

export const WrappedQRCode: FC<QRCodeWidgetProps> = ({
  value,
  bgColorSchema,
  fgColorSchema,
}) => {
  return (
    <QRCodeSVG
      value={`${value}`}
      css={qrCodeStyle}
      bgColor={bgColorSchema}
      fgColor={fgColorSchema}
    />
  )
}

WrappedQRCode.displayName = "WrappedQRCode"

export const QRCodeWidget: FC<QRCodeWidgetProps> = (props) => {
  const {
    displayName,
    tooltipText,
    updateComponentHeight,
    updateComponentRuntimeProps,
    handleUpdateMultiExecutionResult,
    deleteComponentRuntimeProps,
  } = props

  useEffect(() => {
    updateComponentRuntimeProps({
      setValue: (value: unknown) => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              value: `${value}`,
            },
          },
        ])
      },
    })
    return () => {
      deleteComponentRuntimeProps()
    }
  }, [
    deleteComponentRuntimeProps,
    displayName,
    handleUpdateMultiExecutionResult,
    updateComponentRuntimeProps,
  ])

  return (
    <AutoHeightContainer updateComponentHeight={updateComponentHeight}>
      <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
        <div css={fullStyle}>
          <WrappedQRCode {...props} />
        </div>
      </TooltipWrapper>
    </AutoHeightContainer>
  )
}

QRCodeWidget.displayName = "QRCodeWidget"
export default QRCodeWidget
