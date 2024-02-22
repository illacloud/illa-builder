import CameraWidgetIcon from "@/assets/widgetCover/camera.svg?react"
import i18n from "@/i18n/config"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"
import { DEFAULT_BUTTON_TEXT, DEFAULT_LABEL } from "./constant"
import { CAMERA_MODE, FACING_MODE } from "./interface"

export const CAMERA_WIDGET_CONFIG: WidgetConfig = {
  type: "CAMERA_WIDGET",
  displayName: "camera",
  widgetName: i18n.t("widget.camera.name"),
  keywords: ["camera", "摄像机"],
  icon: <CameraWidgetIcon />,
  sessionType: "FILE_INPUT",
  h: 5,
  w: 6,
  resizeDirection: RESIZE_DIRECTION.HORIZONTAL,
  version: 0,
  defaults: {
    buttonText: DEFAULT_BUTTON_TEXT,
    inputMethod: CAMERA_MODE.PHOTO,
    facingMode: FACING_MODE.ENVIRONMENT,
    minDuration: 0,
    maxDuration: 60,
    label: DEFAULT_LABEL,
    selectionType: "single",
    variant: "fill",
    formDataKey: "camera",
  },
}
