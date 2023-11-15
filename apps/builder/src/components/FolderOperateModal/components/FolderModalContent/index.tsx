import {
  DRIVE_FILE_TYPE,
  IILLAFileInfo,
  SORTED_TYPE,
} from "@illa-public/public-types"
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
} from "@illa-design/react"
import { PlusIcon } from "@illa-design/react"
import { fetchFileList } from "@/services/drive"
import { FOLDER_LIST_LIMIT_IN_MODAL, ROOT_PATH } from "../../constants"
import { FolderOperateModalContext } from "../../context"
import CreateFolderModal from "../CreateFolderModal"
import EmptyState from "../Empty"
import FolderList from "../FolderList"
import LoadingState from "../LoadingState"
import {
  applyInnerFolderListContainerStyle,
  breadItemStyle,
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

const FolderModalContent: FC = () => {
  const {
    title,
    subTitle,
    currentFolderPath,
    setCurrentFolderPath,
    setFolderOperateVisible,
    setCreateFolderVisible,
    operateChildren,
  } = useContext(FolderOperateModalContext)
  const { t } = useTranslation()
  const [folderList, setFolderList] = useState<IILLAFileInfo[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const totalRef = useRef<number>(0)
  const currentFolderID = useRef("")

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

  return (
    <div css={containerStyle}>
      <div css={contentHeaderStyle}>
        <span>{title ?? t("drive.upload.modal.title")}</span>
        <span css={closeStyle} onClick={() => setFolderOperateVisible(false)}>
          <CloseIcon size="12px" />
        </span>
      </div>
      <div css={breadcrumbContainerStyle}>
        <span css={spanBreadcrumbStyle}>{subTitle}: </span>
        <Breadcrumb
          blockRouterChange
          flexWrap="wrap"
          onClickPath={(path: string, last: boolean) => {
            !last && setCurrentFolderPath(path)
          }}
        >
          {breadList.map((item, index) => (
            <BreadcrumbItem key={index} href={item.path}>
              <span css={breadItemStyle(item.last)}>{item.title}</span>
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
          ) : !isLoading ? (
            <EmptyState />
          ) : (
            <></>
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
            onClick={() => setFolderOperateVisible(false)}
          >
            {t("drive.upload.modal.cancel")}
          </Button>
          {operateChildren}
        </div>
      </div>
      <CreateFolderModal currentFolderID={currentFolderID.current} />
    </div>
  )
}

export default FolderModalContent
