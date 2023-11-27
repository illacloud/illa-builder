import {
  HTTP_REQUEST_PUBLIC_BASE_URL,
  PUBLIC_DRIVE_REQUEST_PREFIX,
} from "@illa-public/illa-net"
import { EXPIRATION_TYPE } from "@illa-public/public-types"
import {
  CollarModalType,
  handleCollaPurchaseError,
} from "@illa-public/upgrade-modal"
import { useContext, useRef } from "react"
import { useTranslation } from "react-i18next"
import { Button, useMessage } from "@illa-design/react"
import { FolderOperateModalContext } from "@/components/FolderOperateModal/context"
import { FILE_ITEM_DETAIL_STATUS_IN_UI } from "@/page/App/Module/UploadDetail/components/DetailList/interface"
import { updateFileDetailStore } from "@/page/App/Module/UploadDetail/store"
import { fetchGenerateTinyUrl } from "@/services/drive"
import { uploadFileToDrive } from "@/utils/drive/upload/getSingedURL"
import { FileUploadContext } from "../../provider/FileUploadProvider"
import {
  getPathForSignedUrl,
  getReportElementForUpload,
  getUploadAccept,
} from "../../utils"

const UploadOperate = () => {
  const uploadFileRef = useRef<HTMLInputElement | null>(null)
  const message = useMessage()
  const { t } = useTranslation()
  const { currentFolderPath, setFolderOperateVisible } = useContext(
    FolderOperateModalContext,
  )

  const { widgetType, setIsUpLoading, setUploadName, handleUpdateResult } =
    useContext(FileUploadContext)

  const onChangeFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    setIsUpLoading(true)
    message.info({
      content: t("drive.message.start_upload"),
    })
    const file = files[0]
    if (!file) return
    setFolderOperateVisible(false)
    const queryID = `${file.name}_${new Date().getTime()}`

    const abortController = new AbortController()

    const uploadParams = {
      folder: getPathForSignedUrl(currentFolderPath),
      allowAnonymous: false,
      replace: false,
    }

    updateFileDetailStore.addFileDetailInfo({
      loaded: 0,
      total: 0,
      status: FILE_ITEM_DETAIL_STATUS_IN_UI.WAITING,
      fileName: file.name,
      contentType: file.type,
      queryID: queryID,
      abortController,
      saveToILLADriveParams: {
        fileData: file,
        ...uploadParams,
      },
    })
    let uploadRes
    try {
      uploadRes = await uploadFileToDrive(
        queryID,
        file,
        uploadParams,
        abortController.signal,
      )
    } catch (e) {
      handleCollaPurchaseError(
        e,
        CollarModalType.TRAFFIC,
        getReportElementForUpload(widgetType)!,
      )
    }
    if (!!uploadRes) {
      try {
        const selectIds = [uploadRes.id]
        const requestParams = {
          ids: selectIds,
          expirationType: EXPIRATION_TYPE.PERSISTENT,
          hotlinkProtection: false,
        }
        const res = await fetchGenerateTinyUrl(requestParams)
        let value = `${HTTP_REQUEST_PUBLIC_BASE_URL}${PUBLIC_DRIVE_REQUEST_PREFIX}/${res.data.tinyURL}`
        setUploadName(uploadRes.name)
        handleUpdateResult(value)
      } catch (e) {
        message.error({
          content: t("drive.message.generate_url_fail"),
        })
      } finally {
        setIsUpLoading(false)
      }
    } else {
      setIsUpLoading(false)
    }
    e.target.value = ""
  }
  return (
    <Button
      colorScheme="techPurple"
      onClick={() => {
        uploadFileRef.current?.click()
      }}
    >
      <span>
        <input
          style={{ display: "none" }}
          type="file"
          accept={getUploadAccept(widgetType)}
          ref={uploadFileRef}
          onChange={onChangeFiles}
        />
        {t("drive.upload.modal.file_upload")}
      </span>
    </Button>
  )
}
export default UploadOperate
