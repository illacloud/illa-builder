import { PADDING_MODE } from "@illa-public/public-types"
import ButtonWidgetIcon from "@/assets/widgetCover/button.svg?react"
import i18n from "@/i18n/config"
import { WidgetConfig } from "@/widgetLibrary/interface"

export const SIGNATURE_WIDGET_CONFIG: WidgetConfig = {
  type: "SIGNATURE_WIDGET",
  displayName: "signature",
  widgetName: i18n.t("signature"),
  keywords: ["Signature", "签名"],
  icon: <ButtonWidgetIcon />,
  sessionType: "FILE_INPUT",
  w: 20,
  h: 30,
  version: 0,
  defaults: {
    text: "Sign here",
    label: "Label",
    labelAlign: "left",
    labelPosition: "top",
    labelWidth: "{{33}}",
    padding: {
      mode: PADDING_MODE.ALL,
      size: "8",
    },
  },
}
