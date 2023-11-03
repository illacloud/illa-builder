import { ReactComponent as ImageIcon } from "@/assets/drive/image.svg"
import { ReactComponent as PdfIcon } from "@/assets/drive/pdf.svg"
import { ReactComponent as VideoIcon } from "@/assets/drive/video.svg"

export const getUploadModeInfo = (widgetType: string) => {
  switch (widgetType) {
    case "IMAGE_WIDGET":
    case "CAROUSEL_WIDGET":
      return {
        name: "choose a Image",
        icon: <ImageIcon />,
      }
    case "PDF_WIDGET":
      return {
        name: "choose a pdf",
        icon: <PdfIcon />,
      }
    case "VIDEO_WIDGET":
    case "AUDIO_WIDGET":
      return {
        name: "choose a video",
        icon: <VideoIcon />,
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
