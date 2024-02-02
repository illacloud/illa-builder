import QrCodeWidgetIcon from "@/assets/widgetCover/qrcode.svg?react"
import i18n from "@/i18n/config"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

export const QR_CODE_WIDGET_CONFIG: WidgetConfig = {
  type: "QR_CODE_WIDGET",
  widgetName: i18n.t("widget.qr_code.name"),
  displayName: "qrCode",
  w: 8,
  h: 32,
  resizeDirection: RESIZE_DIRECTION.HORIZONTAL,
  icon: <QrCodeWidgetIcon />,
  keywords: ["QR code", "二维码生成器"],
  sessionType: "PRESENTATION",
  version: 0,
  defaults: {
    value: "https://www.illacloud.com",
    bgColorSchema: "white",
    fgColorSchema: "black",
  },
}
