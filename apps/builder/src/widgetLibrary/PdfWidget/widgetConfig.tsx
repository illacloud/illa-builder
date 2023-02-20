import { ReactComponent as PdfWidgetIcon } from "@/assets/widgetCover/pdf.svg"
import i18n from "@/i18n/config"
import { WidgetConfig } from "@/widgetLibrary/interface"

export const PDF_WIDGET_CONFIG: WidgetConfig = {
  type: "PDF_WIDGET",
  displayName: "pdf",
  widgetName: "PDF",
  icon: <PdfWidgetIcon />,
  keywords: ["PDF", "pdf"],
  sessionType: "PRESENTATION",
  w: 20,
  h: 9,
  defaults: {
    url: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Guideline_No._GD-Ed-2214_Marman_Clamp_Systems_Design_Guidelines.pdf",
    hidden: false,
    showTollBar: true,
    scaleMode: "width",
    width: undefined,
    height: undefined,
  },
}
