import { debounce } from "lodash"
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
import { Button, CloseIcon, Search, useMessage } from "@illa-design/react"
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
import { FileList } from "./list"
import { LoadingState } from "./loadingState"
import {
  ModalTitleStyle,
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
    colorScheme,
    getFileList,
    updatePath,
    submitSelect,
    handleCloseModal,
  } = useContext(DrivePickerContext)
  const { t } = useTranslation()

  const [isConfirmLoading, setConfirmLoading] = useState(false)
  const searchRef = useRef("")
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
    handleCloseModal()
    setSelectItems([])
  }, [handleCloseModal])

  const handleClickOk = useCallback(async () => {
    if (!validateFileNum()) {
      return
    }
    setConfirmLoading(true)
    submitSelect(selectItems).finally(() => {
      setSelectItems([])
      setConfirmLoading(false)
    })
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

  const debounceHandleOnSearch = useMemo(() => {
    return debounce((value: string) => {
      getListDate(1, totalPath, value)
    }, 500)
  }, [getListDate, totalPath])

  useEffect(() => {
    modalVisible && getListDate(1, totalPath)
  }, [getListDate, modalVisible, totalPath])

  return (
    <>
      <div css={ModalTitleStyle}>
        <span>{t("widget.drive_picker.modal.files")}</span>
        <span onClick={handleClickClose} style={{ cursor: "pointer" }}>
          <CloseIcon />
        </span>
      </div>
      <div css={headerContainerStyle}>
        <FileBreadCrumb />
        <Search
          colorScheme={colorScheme}
          placeholder="search"
          onChange={debounceHandleOnSearch}
        />
      </div>
      <div css={fileListContainerStyle}>
        <div css={applyInnerFileListContainerStyle(loading)}>
          {fileList.length > 0 ? (
            <FileList
              onChange={handleChange}
              listData={fileList}
              key={totalPath}
              totalPath={totalPath}
              getFileList={getListDate}
              search={searchRef}
              updatePath={updatePath}
              selectItems={selectItems}
              colorScheme={colorScheme}
            />
          ) : (
            !loading && <EmptyState />
          )}
        </div>
        {loading && <LoadingState colorScheme={colorScheme} />}
      </div>
      <div css={footerContainerStyle}>
        <Button minW="78px" onClick={handleClickClose} colorScheme="grayBlue">
          {t("widget.drive_picker.modal.cancel")}
        </Button>
        <Button
          minW="200px"
          disabled={disabled}
          colorScheme={colorScheme}
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
