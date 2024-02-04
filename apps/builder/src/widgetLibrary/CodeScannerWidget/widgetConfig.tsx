import CodeScannerWidgetIcon from "@/assets/widgetCover/code-scanner.svg?react"
import i18n from "@/i18n/config"
import { WidgetConfig } from "@/widgetLibrary/interface"

export const CODE_SCANNER_WIDGET_CONFIG: WidgetConfig = {
  type: "CODE_SCANNER_WIDGET",
  widgetName: i18n.t("widget.scanner.name"),
  displayName: "scanner",
  w: 6,
  h: 5,
  icon: <CodeScannerWidgetIcon />,
  keywords: [
    "Scanner",
    "QR Scanner",
    "Code Scanner",
    "扫码器",
    "二维码扫描器",
    "条形码扫描器",
  ],
  sessionType: "PRESENTATION",
  version: 0,
  defaults: {
    value: undefined,
    buttonText: "Scanner",
    variant: "fill",
  },
}
