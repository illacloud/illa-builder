import { FC, useContext } from "react"
import { createPortal } from "react-dom"
import { useTranslation } from "react-i18next"
import { Modal } from "@illa-design/react"
import { MediaSourceLoadContext } from "@/utils/mediaSourceLoad"
import { CAMERA_MODE } from "@/widgetLibrary/Mobile/CameraWidget/interface"
import { getCurrentItemInputType } from "@/widgetLibrary/Mobile/CameraWidget/utils"
import {
  cancelStyle,
  containerStyle,
  contentStyle,
  headerStyle,
  modalContentStyle,
  modalStyle,
} from "./style"

interface PreviewProps {
  url: string
  contentType?: string
  onCancel: () => void
}

const Preview: FC<PreviewProps> = ({ url, contentType, onCancel }) => {
  const { t } = useTranslation()
  const { sourceLoadErrorHandler } = useContext(MediaSourceLoadContext)
  const handleLoadDriveError = () => {
    sourceLoadErrorHandler(url, "CAMERA_WIDGET")
  }
  return createPortal(
    <Modal
      visible
      _css={modalStyle}
      modalContentStyle={modalContentStyle}
      withoutPadding
      footer={false}
      mask={false}
    >
      <div css={contentStyle}>
        <div css={headerStyle}>
          <span css={cancelStyle} onClick={onCancel}>
            {t("widget.camera.operation.cancel")}
          </span>
        </div>

        <div css={containerStyle}>
          {getCurrentItemInputType(contentType) === CAMERA_MODE.VIDEO ? (
            <video
              controls
              width="100%"
              src={url}
              onError={handleLoadDriveError}
            />
          ) : (
            <img src={url} width="100%" onError={handleLoadDriveError} />
          )}
        </div>
      </div>
    </Modal>,
    document.querySelector("[data-mobile-fullscreen-container=true]")!,
  )
}

export default Preview
