import { CameraDevice } from "html5-qrcode"
import { ButtonVariant, SelectValue } from "@illa-design/react"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedCodeScannerProps extends CodeScannerWidgetProps {
  errorShow: boolean
  showScanner: boolean
  showSuccessModal: boolean
  devices: CameraDevice[]
  selectDeviceID: string
  handleCancel: () => void
  handleOpenScanner: () => void
  handleSwitchDevice: (value?: SelectValue) => void
  handleResumeScan: () => void
}

export interface CodeScannerWidgetProps
  extends BaseWidgetProps,
    TooltipWrapperProps {
  value?: string
  disabled?: boolean
  closeAfterScan?: boolean
  buttonText?: string
  hidden?: boolean
  variant?: ButtonVariant
  colorScheme?: string
}
