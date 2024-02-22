import {
  HTTP_REQUEST_PUBLIC_BASE_URL,
  PUBLIC_DRIVE_REQUEST_PREFIX,
} from "@illa-public/illa-net/constant"
import {
  DRIVE_FILE_TYPE,
  EXPIRATION_TYPE,
  IILLAFileInfo,
} from "@illa-public/public-types"
import { FC, ReactNode, useCallback, useState } from "react"
import { useSelector } from "react-redux"
import {
  ROOT_PATH,
  removeSuffixPath,
  usePath,
} from "@/components/DriveFileSelect"
import { DriveFileSelectContext } from "@/components/DriveFileSelect/context"
import { FileToPanel } from "@/components/DriveFileSelect/interface"
import { getAppInfo } from "@/redux/currentApp/appInfo/appInfoSelector"
import {
  fetchAnonymousFileList,
  fetchBatchAnonymousGenerateTinyUrl,
  fetchBatchGenerateTinyUrl,
  fetchFileList,
} from "@/services/drive"
import { PAGESIZE } from "./constants"
import { SelectItemValue } from "./interface"

interface Props {
  path?: string
  allowAnonymousUse?: boolean
  children?: ReactNode
  expirationType: EXPIRATION_TYPE
  expiredTime: number
  useHotlink: boolean
  sizeType: "kb" | "mb"
  minSize?: number
  maxSize?: number
  minFileNum?: number
  maxFileNum?: number
  colorScheme: string
  handleUpdateResult: (
    value: SelectItemValue[],
    files: Partial<FileToPanel>[],
  ) => Promise<void>
}

export const DrivePickerProvider: FC<Props> = (props) => {
  const {
    path = ROOT_PATH,
    children,
    allowAnonymousUse,
    expirationType,
    expiredTime,
    useHotlink,
    minSize,
    maxSize,
    minFileNum,
    maxFileNum,
    colorScheme,
    sizeType,
    handleUpdateResult,
  } = props

  const { currentPath, updatePath, totalPath } = usePath(
    removeSuffixPath(path),
    allowAnonymousUse,
  )
  const [fileList, setFileList] = useState<IILLAFileInfo[]>([])
  const [modalVisible, setModalVisible] = useState(false)
  const appInfo = useSelector(getAppInfo)

  const handleCloseModal = useCallback(() => {
    setModalVisible(false)
    updatePath(path || ROOT_PATH)
    setFileList([])
  }, [path, updatePath])

  const submitSelect = useCallback(
    (items: FileToPanel[]) => {
      return new Promise(async (resolve, reject) => {
        if (appInfo.config.public && !appInfo.deployed && !allowAnonymousUse) {
          return reject()
        }
        const selectIds = items.map((item) => item.id)
        const requestParams = {
          ids: selectIds,
          expirationType,
          expiry:
            expirationType === EXPIRATION_TYPE.CUSTOM
              ? expiredTime + "s"
              : undefined,
          hotlinkProtection: useHotlink,
        }
        try {
          const res = allowAnonymousUse
            ? await fetchBatchAnonymousGenerateTinyUrl(
                appInfo.appId,
                requestParams,
              )
            : await fetchBatchGenerateTinyUrl(requestParams)
          const value: SelectItemValue[] = []
          Array.isArray(res.data) &&
            res.data.forEach((item) => {
              let prefix =
                HTTP_REQUEST_PUBLIC_BASE_URL + PUBLIC_DRIVE_REQUEST_PREFIX + "/"
              value.push({
                fileURL: prefix + item.tinyURL,
                tinyURL: item.tinyURL,
                fileID: item.fileID,
              })
            })
          const files = items.map(({ lastModifiedAt, name, size, type }) => ({
            lastModifiedAt,
            name,
            size,
            type,
          }))
          await handleUpdateResult(value, files)
          handleCloseModal()
          resolve(true)
        } catch (e) {
          reject(e)
        }
      })
    },
    [
      allowAnonymousUse,
      appInfo.appId,
      appInfo.config.public,
      appInfo.deployed,
      expirationType,
      expiredTime,
      handleCloseModal,
      handleUpdateResult,
      useHotlink,
    ],
  )

  const getFileList = useCallback(
    async (currentPage: number, totalPath: string, search?: string) => {
      if (appInfo.config.public && !allowAnonymousUse) {
        return
      }
      try {
        const requestParams = {
          path: `/${totalPath || ROOT_PATH}`,
          page: currentPage,
          limit: PAGESIZE,
          type: DRIVE_FILE_TYPE.MIX,
          search,
        }
        const res = allowAnonymousUse
          ? await fetchAnonymousFileList(appInfo.appId, requestParams)
          : await fetchFileList(requestParams)
        if (currentPage === 1) {
          setFileList(res.data?.files || [])
        } else {
          setFileList((prev) => [...prev, ...(res.data?.files || [])])
        }
      } catch (e) {}
    },
    [allowAnonymousUse, appInfo],
  )

  const value = {
    rootPath: ROOT_PATH,
    modalVisible,
    fileList,
    currentPath,
    totalPath,
    minSize,
    maxSize,
    minFileNum,
    maxFileNum,
    sizeType,
    colorScheme,
    updatePath,
    submitSelect,
    setModalVisible,
    getFileList,
    handleCloseModal,
  }

  return (
    <DriveFileSelectContext.Provider value={value}>
      {children}
    </DriveFileSelectContext.Provider>
  )
}

DrivePickerProvider.displayName = "DrivePickerProvider"
