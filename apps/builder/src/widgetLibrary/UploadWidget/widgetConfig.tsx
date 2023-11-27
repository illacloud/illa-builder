import UploadWidgetIcon from "@/assets/widgetCover/upload.svg?react"
import i18n from "@/i18n/config"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

export const UPLOAD_WIDGET_CONFIG: WidgetConfig = {
  displayName: "upload",
  widgetName: i18n.t("widget.upload.name"),
  h: 5,
  w: 6,
  type: "UPLOAD_WIDGET",
  icon: <UploadWidgetIcon />,
  keywords: ["Upload Input", "上传"],
  sessionType: "INPUTS",
  resizeDirection: RESIZE_DIRECTION.HORIZONTAL,
  version: 0,
  defaults: {
    type: "button",
    buttonText: i18n.t("widget.upload.default_button_text"),
    selectionType: "single",
    dropText: i18n.t("widget.upload.default_dropzone_text"),
    verticalAlign: "center",
    hidden: false,
    appendFiles: false,
    fileType: "",
    variant: "fill",
    colorScheme: "blue",
    formDataKey: "upload",
    showFileList: false,
    sizeType: "mb",
    dynamicHeight: "auto",
  },
}
