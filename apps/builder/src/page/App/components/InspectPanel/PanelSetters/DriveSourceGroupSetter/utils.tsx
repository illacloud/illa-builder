import AudioIcon from "@/assets/drive/audio.svg?react"
import ImageIcon from "@/assets/drive/image.svg?react"
import PdfIcon from "@/assets/drive/pdf.svg?react"
import VideoIcon from "@/assets/drive/video.svg?react"
import i18n from "@/i18n/config"

export const getUploadModeInfo = (widgetType: string) => {
  switch (widgetType) {
    case "IMAGE_WIDGET":
    case "CAROUSEL_WIDGET":
      return {
        name: i18n.t("editor.inspect.setter_placeholder.choose_image"),
        icon: <ImageIcon />,
      }
    case "PDF_WIDGET":
      return {
        name: i18n.t("editor.inspect.setter_placeholder.choose_pdf"),
        icon: <PdfIcon />,
      }
    case "VIDEO_WIDGET":
      return {
        name: i18n.t("editor.inspect.setter_placeholder.choose_video"),
        icon: <VideoIcon />,
      }
    case "AUDIO_WIDGET":
      return {
        name: i18n.t("editor.inspect.setter_placeholder.choose_audio"),
        icon: <AudioIcon />,
      }
  }
}

export const getUploadAccept = (widgetType: string) => {
  switch (widgetType) {
    case "IMAGE_WIDGET":
    case "CAROUSEL_WIDGET":
      return "image/*"
    case "PDF_WIDGET":
      return ".pdf"
    case "VIDEO_WIDGET":
      return "video/*"
    case "AUDIO_WIDGET":
      return "audio/*"
  }
}

export const getPathForSignedUrl = (path: string) => {
  if (path === "root") {
    return ""
  } else {
    return path.replace("root/", "")
  }
}

export const getReportElementForUpload = (widgetType: string) => {
  switch (widgetType) {
    case "IMAGE_WIDGET":
      return "builder_editor_storage_not_enough_image"
    case "CAROUSEL_WIDGET":
      return "builder_editor_storage_not_enough_carousel"
    case "VIDEO_WIDGET":
      return "builder_editor_storage_not_enough_video"
    case "AUDIO_WIDGET":
      return "builder_editor_storage_not_enough_audio"
  }
}

export const getReportElementForSelect = (widgetType: string) => {
  switch (widgetType) {
    case "IMAGE_WIDGET":
      return "builder_editor_traffic_not_enough_image"
    case "CAROUSEL_WIDGET":
      return "builder_editor_traffic_not_enough_carousel"
    case "VIDEO_WIDGET":
      return "builder_editor_traffic_not_enough_video"
    case "AUDIO_WIDGET":
      return "builder_editor_traffic_not_enough_audio"
  }
}
