import {
  ERROR_FLAG,
  HTTP_REQUEST_PUBLIC_BASE_URL,
  PUBLIC_DRIVE_REQUEST_PREFIX,
  isILLAAPiError,
} from "@illa-public/illa-net"
import {
  DRIVE_FILE_TYPE,
  EXPIRATION_TYPE,
  IILLAFileInfo,
  SORTED_TYPE,
  UPLOAD_FILE_STATUS,
} from "@illa-public/public-types"
import {
  CollarModalType,
  handleCollaPurchaseError,
} from "@illa-public/upgrade-modal"
import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { useTranslation } from "react-i18next"
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  CloseIcon,
  useMessage,
} from "@illa-design/react"
import { PlusIcon } from "@illa-design/react"
import { FOLDER_LIST_LIMIT_IN_MODAL } from "@/page/App/components/InspectPanel/PanelSetters/DriveSourceGroupSetter/components/UploadFileModal/constants"
import { ROOT_PATH } from "@/page/App/components/InspectPanel/PanelSetters/DriveSourceGroupSetter/constants"
import { FileUploadContext } from "@/page/App/components/InspectPanel/PanelSetters/DriveSourceGroupSetter/provider/FileUploadProvider"
import { getUploadAccept } from "@/page/App/components/InspectPanel/PanelSetters/DriveSourceGroupSetter/utils"
import { fetchFileList, fetchGenerateTinyUrl } from "@/services/drive"
import {
  getNewSignedUrl,
  updateFilesToDrive,
  updateFilesToDriveStatus,
} from "@/utils/drive/upload/getSingedURL"
import CreateFolderModal from "../CreateFolderModal"
import EmptyState from "../Empty"
import FolderList from "../FolderList"
import LoadingState from "../LoadingState"
import {
  applyInnerFolderListContainerStyle,
  breadcrumbContainerStyle,
  closeStyle,
  containerStyle,
  contentHeaderStyle,
  folderListContainerStyle,
  footerContainerStyle,
  footerOperationsContainerStyle,
  newFolderButtonStyle,
  spanBreadcrumbStyle,
} from "./style"

const UploadFileModalContent: FC = () => {
  const {
    currentFolderPath,
    widgetType,
    setCurrentFolderPath,
    setUploadModalVisible,
    setCreateFolderVisible,
    setUploadName,
    handleUpdateResult,
  } = useContext(FileUploadContext)
  const { t } = useTranslation()
  const message = useMessage()
  const [folderList, setFolderList] = useState<IILLAFileInfo[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isUpLoading, setIsUpLoading] = useState(false)
  const totalRef = useRef<number>(0)
  const currentFolderID = useRef("")

  const uploadFileRef = useRef<HTMLInputElement | null>(null)

  const breadList = useMemo(() => {
    return currentFolderPath.split("/").map((item, index, array) => {
      const path = array.slice(0, index + 1).join("/")
      const isLast = index === array.length - 1
      const isFirst = index === 0
      if (isFirst) {
        return {
          title: t("drive.upload.modal.all"),
          path: ROOT_PATH,
          last: isLast,
        }
      }
      return {
        path,
        title: item,
        last: isLast,
      }
    })
  }, [currentFolderPath, t])

  const handleFetchFileList = useCallback(
    (pageIndex: number = 1, path: string) => {
      if (folderList.length >= totalRef.current) {
        return
      }
      setIsLoading(true)
      fetchFileList({
        path: `/${path}`,
        page: pageIndex,
        limit: FOLDER_LIST_LIMIT_IN_MODAL,
        type: DRIVE_FILE_TYPE.FOLDER,
        sortedBy: "name",
        sortedType: SORTED_TYPE.ascend,
      })
        .then((res) => {
          const folders = res.data.files ?? []
          currentFolderID.current = res.data.currentFolderID
          totalRef.current = res.data.total
          setFolderList(folderList.concat(folders))
        })
        .finally(() => {
          setIsLoading(false)
        })
    },
    [folderList],
  )

  const handleInitFIleList = useCallback(
    async (abortSignal: AbortSignal) => {
      setIsLoading(true)
      try {
        const res = await fetchFileList(
          {
            path: `/${currentFolderPath}`,
            page: 1,
            limit: FOLDER_LIST_LIMIT_IN_MODAL,
            type: DRIVE_FILE_TYPE.FOLDER,
            sortedBy: "name",
            sortedType: SORTED_TYPE.ascend,
          },
          abortSignal,
        )
        const folders = res.data.files ?? []
        currentFolderID.current = res.data.currentFolderID
        totalRef.current = res.data.total
        setFolderList(folders)
        setIsLoading(false)
      } catch (e) {
        console.log("e", e)
      }
    },
    [currentFolderPath, currentFolderID],
  )

  useEffect(() => {
    const abortController = new AbortController()
    handleInitFIleList(abortController.signal)

    return () => {
      abortController.abort()
    }
  }, [handleInitFIleList])

  const uploadToDrive = useCallback(
    async (file: File) => {
      if (!file) return
      try {
        const uploadURLResponse = await getNewSignedUrl(
          file,
          currentFolderID.current,
          false,
        )
        const uploadResult = await updateFilesToDrive(
          uploadURLResponse.url,
          file,
        )
        if (uploadResult === UPLOAD_FILE_STATUS.COMPLETE) {
          message.success({
            content: t("editor.inspect.setter_message.uploadsuc"),
          })
        } else {
          message.error({
            content: t("editor.inspect.setter_message.uploadfail"),
          })
        }
        await updateFilesToDriveStatus(
          false,
          uploadURLResponse.fileID,
          uploadResult,
        )
        if (uploadResult === UPLOAD_FILE_STATUS.COMPLETE) {
          return {
            id: uploadURLResponse.fileID,
            name: uploadURLResponse.fileName,
          }
        }
      } catch (e) {
        const res = handleCollaPurchaseError(e, CollarModalType.STORAGE)
        if (res) return
        if (isILLAAPiError(e)) {
          if (
            e.data.errorMessage === ERROR_FLAG.ERROR_FLAG_OUT_OF_USAGE_VOLUME
          ) {
            message.error({
              content: t("editor.inspect.setter_message.noStorage"),
            })
            return
          }
        }
        message.error({
          content: t("editor.inspect.setter_message.uploadfail"),
        })
      }
    },
    [message, t],
  )

  const onChangeFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    setIsUpLoading(true)
    message.info({
      content: t("drive.message.start_upload"),
    })
    const file = files[0]
    const uploadRes = await uploadToDrive(file)
    if (!!uploadRes) {
      try {
        const selectIds = [uploadRes.id]
        const requestParams = {
          ids: selectIds,
          expirationType: EXPIRATION_TYPE.PERSISTENT,
          hotlinkProtection: true,
        }
        const res = await fetchGenerateTinyUrl(requestParams)
        let value = `${HTTP_REQUEST_PUBLIC_BASE_URL}${PUBLIC_DRIVE_REQUEST_PREFIX}/${res.data.tinyURL}`
        setUploadName(uploadRes.name)
        handleUpdateResult(value)
      } catch (e) {
        const isCollaPurchaseError = handleCollaPurchaseError(
          e,
          CollarModalType.TRAFFIC,
        )
        if (!isCollaPurchaseError) {
          message.error({
            content: t("drive.message.generate_url_fail"),
          })
        }
      } finally {
        setIsUpLoading(false)
        setUploadModalVisible(false)
      }
    } else {
      setIsUpLoading(false)
    }
    e.target.value = ""
  }

  return (
    <div css={containerStyle}>
      <div css={contentHeaderStyle}>
        <span>{t("drive.upload.modal.title")}</span>
        <span css={closeStyle} onClick={() => setUploadModalVisible(false)}>
          <CloseIcon size="12px" />
        </span>
      </div>
      <div css={breadcrumbContainerStyle}>
        <span css={spanBreadcrumbStyle}>
          {t("drive.upload.modal.upload_to")}:{" "}
        </span>
        <Breadcrumb
          blockRouterChange
          flexWrap="wrap"
          onClickPath={(path: string, last: boolean) => {
            !last && setCurrentFolderPath(path)
          }}
        >
          {breadList.map((item, index) => (
            <BreadcrumbItem key={index} href={item.path}>
              {item.title}
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      </div>
      <div css={folderListContainerStyle}>
        <div css={applyInnerFolderListContainerStyle(isLoading)}>
          {folderList.length > 0 ? (
            <FolderList
              listData={folderList}
              updateListData={handleFetchFileList}
              key={currentFolderPath}
            />
          ) : (
            <EmptyState />
          )}
        </div>
        {isLoading && <LoadingState />}
      </div>
      <div css={footerContainerStyle}>
        <Button
          variant="text"
          leftIcon={<PlusIcon />}
          css={newFolderButtonStyle}
          onClick={() => {
            setCreateFolderVisible(true)
          }}
        >
          {t("drive.upload.modal.create_folder")}
        </Button>
        <div css={footerOperationsContainerStyle}>
          <Button
            colorScheme="grayBlue"
            onClick={() => setUploadModalVisible(false)}
          >
            {t("drive.upload.modal.cancel")}
          </Button>
          <Button
            colorScheme="techPurple"
            onClick={() => {
              uploadFileRef.current?.click()
            }}
            loading={isUpLoading}
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
        </div>
      </div>
      <CreateFolderModal currentFolderID={currentFolderID.current} />
    </div>
  )
}

export default UploadFileModalContent
