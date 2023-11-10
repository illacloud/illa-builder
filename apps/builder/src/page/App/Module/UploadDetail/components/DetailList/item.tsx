import { getFileIconByContentType } from "@illa-public/icon"
import { GCS_OBJECT_TYPE } from "@illa-public/public-types"
import { forwardRef, useCallback } from "react"
import { useTranslation } from "react-i18next"
import {
  DeleteIcon,
  ErrorIcon,
  Progress,
  SuccessIcon,
  TriggerProvider,
  getColor,
  useModal,
} from "@illa-design/react"
import { FILE_ITEM_DETAIL_STATUS_IN_UI, FileItemDetailProps } from "./interface"
import {
  fileItemDetailInnerContainerStyle,
  fileItemDetailOuterContainerStyle,
  fileNameStyle,
  fileTypeIconStyle,
  iconAndNameContainerStyle,
  iconHotSpotStyle,
  nameAndProcessContainerStyle,
  processContainerStyle,
} from "./style"

export const getIconByStatus = (
  status: FILE_ITEM_DETAIL_STATUS_IN_UI,
  total: number,
  loaded: number,
  onClickRetry: () => void,
) => {
  switch (status) {
    case FILE_ITEM_DETAIL_STATUS_IN_UI.PROCESSING:
      const percent = (loaded / total) * 100
      return (
        <TriggerProvider renderInBody={false}>
          <Progress
            type="miniCircle"
            percent={percent > 90 ? 90 : parseFloat(percent.toFixed(2))}
          />
        </TriggerProvider>
      )

    case FILE_ITEM_DETAIL_STATUS_IN_UI.SUCCESS:
      return <SuccessIcon color={getColor("green", "03")} />
    case FILE_ITEM_DETAIL_STATUS_IN_UI.ERROR:
      return <ErrorIcon onClick={onClickRetry} color={getColor("red", "03")} />
    default:
      return null
  }
}

export const FileItemDetail = forwardRef<HTMLDivElement, FileItemDetailProps>(
  (props, ref) => {
    const {
      fileName,
      contentType,
      status,
      total,
      loaded,
      abortController,
      onRetry,
      onDelete,
      queryID,
    } = props

    const modal = useModal()
    const { t } = useTranslation()

    const onClickRetry = useCallback(() => {
      onRetry && onRetry(queryID)
    }, [onRetry, queryID])

    const onClickDeleteOK = useCallback(() => {
      abortController?.abort()
      onDelete && onDelete(queryID, status)
    }, [abortController, onDelete, queryID, status])

    const onClickDelete = useCallback(() => {
      if (
        status === FILE_ITEM_DETAIL_STATUS_IN_UI.SUCCESS ||
        status === FILE_ITEM_DETAIL_STATUS_IN_UI.ERROR
      ) {
        onClickDeleteOK()
      } else {
        modal.show({
          z: 1020,
          title: t("drive.modal.delete_going_on_task.title"),
          content: t("drive.modal.delete_going_on_task.description"),
          okText: t("drive.modal.delete_going_on_task.delete"),
          cancelText: t("drive.modal.delete_going_on_task.cancel"),
          okButtonProps: {
            colorScheme: "red",
          },
          onOk: onClickDeleteOK,
        })
      }
    }, [modal, onClickDeleteOK, status, t])

    return (
      <>
        <div css={fileItemDetailOuterContainerStyle} ref={ref}>
          <div css={fileItemDetailInnerContainerStyle}>
            <div css={nameAndProcessContainerStyle}>
              <div css={iconAndNameContainerStyle}>
                {getFileIconByContentType(
                  GCS_OBJECT_TYPE.FILE,
                  contentType,
                  fileTypeIconStyle,
                )}
                <span css={fileNameStyle(status)}>{fileName}</span>
              </div>
              <div css={processContainerStyle}>
                {getIconByStatus(status, total, loaded, onClickRetry)}
                <span css={iconHotSpotStyle} onClick={onClickDelete}>
                  <DeleteIcon />
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  },
)

FileItemDetail.displayName = "FileItemDetail"
