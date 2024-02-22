import i18n from "@/i18n/config"
import { CAMERA_MODE } from "./interface"

export const FOLDER_NAME = "files_capture_by_illa"
export const MAX_MOBILE_WIDTH = 750
export const HEADER_HEIGHT = 40
export const DEFAULT_BUTTON_TEXT = i18n.t(
  "editor.inspect.setter_default_value.camera.take_photos",
)

export const DEFAULT_LABEL = i18n.t(
  "editor.inspect.setter_default_value.camera.image",
)

export const RATIO = 0.75

export const ACCEPT_MODE = {
  [CAMERA_MODE.PHOTO]: "image/*",
  [CAMERA_MODE.VIDEO]: "video/*",
}
