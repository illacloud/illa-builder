import { AnimatePresence } from "framer-motion"
import { FC, useState } from "react"
import { DeleteIcon, EyeOnIcon, Loading, UploadIcon } from "@illa-design/react"
import { FILE_ITEM_DETAIL_STATUS_IN_UI } from "@/page/App/Module/UploadDetail/components/DetailList/interface"
import { fetchDeleteFile } from "@/services/drive"
import { isMobileByUserAgent } from "@/utils/userAgent"
import { DEFAULT_LABEL } from "@/widgetLibrary/Mobile/CameraWidget/constant"
import {
  CAMERA_MODE,
  WrappedCameraProps,
} from "@/widgetLibrary/Mobile/CameraWidget/interface"
import { UploadStore } from "@/widgetLibrary/Mobile/CameraWidget/store"
import { getCurrentItemInputType } from "@/widgetLibrary/Mobile/CameraWidget/utils"
import Preview from "./Preview"
import {
  containerStyle,
  fileItemStyle,
  fileListContainerStyle,
  labelStyle,
  loadingStyle,
  maskStyle,
  mediaStyle,
} from "./style"

interface UploadFileListProps
  extends Pick<
    WrappedCameraProps,
    "value" | "label" | "handleRetry" | "handleDeleteFile"
  > {}

const UploadFileList: FC<UploadFileListProps> = ({
  value = [],
  label,
  handleRetry,
  handleDeleteFile,
}) => {
  const [showPreview, setShowPreview] = useState(false)
  const [preViewUrl, setPreviewUrl] = useState("")
  const [currentItemContentType, setCurrentItemContentType] = useState("")
  const handleClosePreview = () => {
    setShowPreview(false)
    setPreviewUrl("")
  }
  const handleClickDelete = async (fileName: string, fileID?: string) => {
    try {
      handleDeleteFile(fileName)
      fileID && fetchDeleteFile(fileID)
    } catch (e) {}
  }
  const handleClickRetry = async (fileName: string) => {
    const file = UploadStore.getFile(fileName)
    file && handleRetry(file)
  }

  const handlePreview = (tinyURL: string, contentType: string) => {
    setShowPreview(true)
    setPreviewUrl(tinyURL)
    setCurrentItemContentType(contentType)
  }
  return (
    <>
      <div css={containerStyle}>
        <span css={labelStyle}>{label ?? DEFAULT_LABEL}</span>
        <div css={fileListContainerStyle}>
          {value.map((item) => {
            let url: string = URL.createObjectURL(
              UploadStore.getFile(item.fileName),
            )
            return (
              <div
                key={item.fileName}
                css={fileItemStyle(
                  item.driveUploadStatus ===
                    FILE_ITEM_DETAIL_STATUS_IN_UI.ERROR,
                )}
              >
                <div css={mediaStyle}>
                  {getCurrentItemInputType(item.contentType) ===
                  CAMERA_MODE.VIDEO ? (
                    <video
                      width="100%"
                      poster={isMobileByUserAgent() ? url : undefined}
                      src={url}
                      onLoadStart={() => {
                        URL.revokeObjectURL(url)
                      }}
                    />
                  ) : (
                    <img
                      src={url}
                      width="100%"
                      onLoad={() => {
                        URL.revokeObjectURL(url)
                      }}
                      onError={() => {
                        URL.revokeObjectURL(url)
                      }}
                    />
                  )}
                </div>
                {item.driveUploadStatus ===
                  FILE_ITEM_DETAIL_STATUS_IN_UI.PROCESSING && (
                  <div key={item.fileName} css={loadingStyle}>
                    <Loading colorScheme="white" />
                  </div>
                )}
                {item.driveUploadStatus ===
                  FILE_ITEM_DETAIL_STATUS_IN_UI.ERROR && (
                  <div css={maskStyle}>
                    <UploadIcon
                      onClick={() => handleClickRetry(item.fileName)}
                      size="16"
                    />
                    <DeleteIcon
                      onClick={() => handleClickDelete(item.fileName)}
                      size="16"
                    />
                  </div>
                )}
                {item.driveUploadStatus ===
                  FILE_ITEM_DETAIL_STATUS_IN_UI.SUCCESS && (
                  <div css={maskStyle}>
                    <EyeOnIcon
                      onClick={() =>
                        handlePreview(item.tinyURL!, item.contentType)
                      }
                      size="16"
                    />
                    <DeleteIcon
                      onClick={() =>
                        handleClickDelete(item.fileName, item.fileID)
                      }
                      size="16"
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
      <AnimatePresence>
        {showPreview && (
          <Preview
            onCancel={handleClosePreview}
            contentType={currentItemContentType}
            url={preViewUrl}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default UploadFileList
