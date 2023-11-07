import { ReactComponent as AudioIcon } from "@/assets/drive/audio.svg"
import { ReactComponent as ImageIcon } from "@/assets/drive/image.svg"
import { ReactComponent as PdfIcon } from "@/assets/drive/pdf.svg"
import { ReactComponent as VideoIcon } from "@/assets/drive/video.svg"
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
