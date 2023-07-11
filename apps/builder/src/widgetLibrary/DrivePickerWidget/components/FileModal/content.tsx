import { debounce } from "lodash"
import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { useTranslation } from "react-i18next"
import { Button, Search, useMessage } from "@illa-design/react"
import i18n from "@/i18n/config"
import { DrivePickerContext } from "@/widgetLibrary/DrivePickerWidget/context"
import { FileBreadCrumb } from "../Breadcrumb"
import {
  MAX_FILE_NUM,
  MAX_SIZE_MESSAGE,
  MIN_FILE_NUM,
  MIN_SIZE_MESSAGE,
} from "./constants"
import { EmptyState } from "./empty"
import { FileToPanel } from "./interface"
import { FolderList } from "./list"
import { LoadingState } from "./loadingState"
import {
  applyInnerFileListContainerStyle,
  fileListContainerStyle,
  footerContainerStyle,
  headerContainerStyle,
} from "./style"

export const FilesModalContent: FC = () => {
  const {
    modalVisible,
    fileList,
    totalPath,
    minSize,
    maxSize,
    minFileNum,
    maxFileNum,
    sizeType,
    getFileList,
    updatePath,
    submitSelect,
    setModalVisible,
  } = useContext(DrivePickerContext)
  const { t } = useTranslation()

  const [isConfirmLoading, setConfirmLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [selectItems, setSelectItems] = useState<FileToPanel[]>([])
  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(true)
  const message = useMessage()

  const handleBtnDisabled = useCallback(
    (list: FileToPanel[]) => {
      if (disabled && list.length > 0) {
        setDisabled(false)
      } else if (!disabled && list.length === 0) {
        setDisabled(true)
      }
    },
    [disabled],
  )

  const validateFileNum = useCallback(() => {
    if (maxFileNum && selectItems.length > maxFileNum) {
      message.info({
        content: i18n.t(MAX_FILE_NUM, {
          max: maxFileNum,
        }),
      })
      return false
    }
    if (minFileNum && selectItems.length < minFileNum) {
      message.info({
        content: i18n.t(MIN_FILE_NUM, {
          min: minFileNum,
        }),
      })
      return false
    }
    if (maxSize) {
      const equalMaxSize =
        sizeType === "mb" ? maxSize * 1024 * 1024 : maxSize * 1024
      if (selectItems.some((item) => item.size > equalMaxSize)) {
        message.info({
          content: i18n.t(MAX_SIZE_MESSAGE, {
            max: maxSize + sizeType,
          }),
        })
        return false
      }
    }
    if (minSize) {
      const equalMinSize =
        sizeType === "mb" ? minSize * 1024 * 1024 : minSize * 1024
      if (selectItems.some((item) => item.size < equalMinSize)) {
        message.info({
          content: i18n.t(MIN_SIZE_MESSAGE, {
            min: minSize + sizeType,
          }),
        })
        return false
      }
    }
    return true
  }, [maxFileNum, maxSize, message, minFileNum, minSize, selectItems, sizeType])

  const handleChange = useCallback(
    (flag: boolean, item: FileToPanel) => {
      const index = selectItems.findIndex((file) => file.id === item.id)
      if (!flag && index !== -1) {
        const newSelectItems = selectItems.concat()
        newSelectItems.splice(index, 1)
        setSelectItems(newSelectItems)
        handleBtnDisabled(newSelectItems)
      } else if (flag && index === -1) {
        const newSelectItems = selectItems.concat(item)
        setSelectItems(newSelectItems)
        handleBtnDisabled(newSelectItems)
      }
    },
    [handleBtnDisabled, selectItems],
  )

  const handleClickClose = useCallback(() => {
    setModalVisible(false)
  }, [setModalVisible])

  const debounceHandleOnSearch = useMemo(() => {
    return debounce((value: string) => {
      setSearch(value)
    }, 500)
  }, [])

  const handleClickOk = useCallback(async () => {
    if (!validateFileNum()) {
      return
    }
    setConfirmLoading(true)
    submitSelect(selectItems).finally(() => setConfirmLoading(false))
  }, [selectItems, submitSelect, validateFileNum])

  const getListDate = useCallback(
    async (currentPage: number, totalPath: string, search?: string) => {
      setLoading(true)
      try {
        await getFileList(currentPage, totalPath, search)
      } catch (e) {
      } finally {
        setLoading(false)
      }
    },
    [getFileList],
  )

  useEffect(() => {
    modalVisible && getListDate(1, totalPath, search)
  }, [getListDate, modalVisible, search, totalPath])

  useEffect(() => {
    modalVisible && setSelectItems([])
  }, [modalVisible, totalPath])

  return (
    <>
      <div css={headerContainerStyle}>
        <FileBreadCrumb />
        <Search placeholder="search" onChange={debounceHandleOnSearch} />
      </div>
      <div css={fileListContainerStyle}>
        <div css={applyInnerFileListContainerStyle(loading)}>
          {fileList.length > 0 ? (
            <FolderList
              onChange={handleChange}
              listData={fileList}
              key={totalPath}
              totalPath={totalPath}
              getFileList={getListDate}
              search={search}
              updatePath={updatePath}
              selectItems={selectItems}
            />
          ) : (
            !loading && <EmptyState />
          )}
        </div>
        {loading && <LoadingState />}
      </div>
      <div css={footerContainerStyle}>
        <Button minW="78px" onClick={handleClickClose} colorScheme="grayBlue">
          {t("widget.drive_picker.modal.cancel")}
        </Button>
        <Button
          minW="200px"
          disabled={disabled}
          colorScheme="blue"
          onClick={handleClickOk}
          loading={isConfirmLoading}
        >
          {t("widget.drive_picker.modal.confirm", {
            fileNum: selectItems.length,
          })}
        </Button>
      </div>
    </>
  )
}
