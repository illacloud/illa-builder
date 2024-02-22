import { FC } from "react"
import CaptureIcon from "@/assets/camera/capture.svg?react"
import VideoCapturingIcon from "@/assets/camera/videoCaptruIng.svg?react"
import VideoCaptureIcon from "@/assets/camera/videoCapture.svg?react"
import { CAMERA_MODE } from "@/widgetLibrary/Mobile/CameraWidget/interface"
import { containerStyle, operateStyle } from "./style"

interface CameraHandleProps {
  inputMethod?: CAMERA_MODE
  capturing: boolean
  handleClick: () => void
}

const CameraHandle: FC<CameraHandleProps> = ({
  inputMethod,
  capturing,
  handleClick,
}) => {
  return (
    <div css={containerStyle}>
      {inputMethod === CAMERA_MODE.PHOTO ? (
        <CaptureIcon css={operateStyle} onClick={handleClick} />
      ) : capturing ? (
        <VideoCapturingIcon css={operateStyle} onClick={handleClick} />
      ) : (
        <VideoCaptureIcon css={operateStyle} onClick={handleClick} />
      )}
    </div>
  )
}

export default CameraHandle
