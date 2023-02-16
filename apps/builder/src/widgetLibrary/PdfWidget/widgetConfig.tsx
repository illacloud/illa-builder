import { ReactComponent as PdfWidgetIcon } from "@/assets/widgetCover/pdf.svg"
import i18n from "@/i18n/config"
import { WidgetConfig } from "@/widgetLibrary/interface"

export const PDF_WIDGET_CONFIG: WidgetConfig = {
  type: "PDF_WIDGET",
  displayName: "pdf",
  widgetName: i18n.t("widget.pdf.name"),
  icon: <PdfWidgetIcon />,
  keywords: ["Pdf", "pdf"],
  sessionType: "PRESENTATION",
  w: 12,
  h: 5,
  defaults: {
    value: "",
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
    labelWidth: "{{33}}",
    colorScheme: "blue",
    hidden: false,
  },
}
