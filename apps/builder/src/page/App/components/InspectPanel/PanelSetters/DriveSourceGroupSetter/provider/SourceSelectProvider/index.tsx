import {
  HTTP_REQUEST_PUBLIC_BASE_URL,
  PUBLIC_DRIVE_REQUEST_PREFIX,
} from "@illa-public/illa-net/constant"
import {
  DRIVE_FILE_TYPE,
  EXPIRATION_TYPE,
  FILE_CATEGORY,
  IILLAFileInfo,
} from "@illa-public/public-types"
import {
  CollarModalType,
  handleCollaPurchaseError,
} from "@illa-public/upgrade-modal"
import { FC, ReactNode, useCallback, useMemo, useState } from "react"
import { ROOT_PATH, usePath } from "@/components/DriveFileSelect"
import { DriveFileSelectContext } from "@/components/DriveFileSelect/context"
import { FileToPanel } from "@/components/DriveFileSelect/interface"
import {
  COLOR_SCHEME,
  PAGESIZE,
} from "@/page/App/components/InspectPanel/PanelSetters/DriveSourceGroupSetter/constants"
import { fetchFileList, fetchGenerateTinyUrl } from "@/services/drive"
import { getReportElementForSelect } from "../../utils"

interface Props {
  widgetType: string
  path: string
  children?: ReactNode
  handleUpdateResult: (value: string) => void
}

export const SourceSelectProvider: FC<Props> = (props) => {
  const { path = ROOT_PATH, children, widgetType, handleUpdateResult } = props
  const { currentPath, updatePath, totalPath } = usePath(path)
  const [fileList, setFileList] = useState<IILLAFileInfo[]>([])
  const [modalVisible, setModalVisible] = useState(false)

  const fileCategory = useMemo(() => {
    switch (widgetType) {
      case "IMAGE_WIDGET":
      case "CAROUSEL_WIDGET":
        return FILE_CATEGORY.IMAGE
      case "PDF_WIDGET":
        return FILE_CATEGORY.PDF
      case "VIDEO_WIDGET":
        return FILE_CATEGORY.VIDEO
      case "AUDIO_WIDGET":
        return FILE_CATEGORY.AUDIO
    }
  }, [widgetType])
  const handleCloseModal = useCallback(() => {
    setModalVisible(false)
    updatePath(path || ROOT_PATH)
    setFileList([])
  }, [path, updatePath])

  const submitSelect = useCallback(
    (items: FileToPanel[]) => {
      return new Promise(async (resolve, reject) => {
        const selectIds = [items[0].id]
        const requestParams = {
          ids: selectIds,
          expirationType: EXPIRATION_TYPE.PERSISTENT,
          hotlinkProtection: false,
        }
        try {
          const res = await fetchGenerateTinyUrl(requestParams)
          let value = `${HTTP_REQUEST_PUBLIC_BASE_URL}${PUBLIC_DRIVE_REQUEST_PREFIX}/${res.data.tinyURL}`
          await handleUpdateResult(value)
          handleCloseModal()
          resolve(true)
        } catch (e) {
          handleCollaPurchaseError(
            e,
            CollarModalType.TRAFFIC,
            getReportElementForSelect(widgetType)!,
          )
          reject(e)
        }
      })
    },
    [handleCloseModal, handleUpdateResult, widgetType],
  )

  const getFileList = useCallback(
    async (currentPage: number, totalPath: string, search?: string) => {
      try {
        const requestParams = {
          path: `/${totalPath || ROOT_PATH}`,
          page: currentPage,
          limit: PAGESIZE,
          type: DRIVE_FILE_TYPE.MIX,
          search,
          fileCategory,
        }
        const res = await fetchFileList(requestParams)
        if (currentPage === 1) {
          setFileList(res.data?.files || [])
        } else {
          setFileList((prev) => [...prev, ...(res.data?.files || [])])
        }
      } catch (e) {}
    },
    [fileCategory],
  )

  const value = {
    rootPath: ROOT_PATH,
    modalVisible,
    fileList,
    currentPath,
    totalPath,
    colorScheme: COLOR_SCHEME,
    singleSelect: true,
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

SourceSelectProvider.displayName = "SourceSelectProvider"
