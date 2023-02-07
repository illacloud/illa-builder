import { ReactComponent as UploadWidgetIcon } from "@/assets/widgetCover/chart.svg"
import i18n from "@/i18n/config"
import { WidgetConfig } from "@/widgetLibrary/interface"

export const UPLOAD_WIDGET_CONFIG: WidgetConfig = {
  displayName: "upload",
  widgetName: "Upload",
  h: 5,
  w: 12,
  type: "UPLOAD_WIDGET",
  icon: <UploadWidgetIcon />,
  keywords: ["Upload Input", "上传"],
  sessionType: "INPUTS",
  defaults: {
    type: "button",
    buttonText: "Upload",
    selectionType: "single",
    dropText: "Select or drop a file here",
    verticalAlign: "center",
    hidden: false,
    appendFiles: false,
    fileType: "",
    variant: "fill",
    colorScheme: "blue",
    formDataKey: "upload",
    showFileList: false,
    minSizeType: "mb",
    maxSizeType: "mb",
  },
}
