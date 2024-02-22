import { FC } from "react"
import { CAMERA_MODE } from "@/widgetLibrary/Mobile/CameraWidget/interface"
import { containerStyle } from "./style"

interface PreviewProps {
  url: string
  inputMethod?: CAMERA_MODE
}

const Preview: FC<PreviewProps> = ({ url, inputMethod }) => {
  return (
    <div css={containerStyle}>
      {inputMethod === CAMERA_MODE.VIDEO ? (
        <video controls width="100%" src={url} />
      ) : (
        <img src={url} width="100%" />
      )}
    </div>
  )
}

export default Preview
