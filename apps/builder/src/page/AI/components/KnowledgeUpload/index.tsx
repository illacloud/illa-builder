import { getFileIconByContentType } from "@illa-public/icon"
import { GCS_OBJECT_TYPE, KnowledgeFile } from "@illa-public/public-types"
import { ChangeEvent, FC, useRef } from "react"
import { useTranslation } from "react-i18next"
import {
  Button,
  DeleteIcon,
  Loading,
  SuccessIcon,
  UploadIcon,
  getColor,
  useMessage,
  useModal,
} from "@illa-design/react"
import { handleParseFile } from "@/utils/file"
import { ACCEPT, MAX_FILE_SIZE, MAX_MESSAGE_FILES_LENGTH } from "./contants"
import {
  fileItemStyle,
  fileListContainerStyle,
  fileNameStyle,
  fileTypeIconStyle,
  iconHotSpotStyle,
  nameContainerStyle,
  opeationStyle,
} from "./style"

interface KnowledgeUploadProps {
  addFile: (file: KnowledgeFile, isUpdate?: boolean) => void
  removeFile: (name: string) => void
  values: KnowledgeFile[]
}

const KnowledgeUpload: FC<KnowledgeUploadProps> = ({
  values,
  removeFile,
  addFile,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { t } = useTranslation()
  const modal = useModal()
  const message = useMessage()
  const handleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    const file = files && files[0]
    if (!file) return
    try {
      if (file.size > MAX_FILE_SIZE) {
        message.warning({
          content: t("dashboard.message.please_use_a_file_wi"),
        })
        return
      }
      const fileItem = {
        name: file.name,
        type: file.type,
      }
      addFile(fileItem)
      const value = await handleParseFile(file)
      if (value === "") {
        message.warning({
          content: t("dashboard.message.no_usable_text_conte"),
        })
        removeFile(file.name)
      } else {
        const fileItem = {
          name: file.name,
          type: file.type,
          value,
        }
        addFile(fileItem, true)
      }
    } catch (e) {
      message.error({
        content: t("dashboard.message.no_usable_text_conte"),
      })
    }
    inputRef.current && (inputRef.current.value = "")
  }

  const handleDelete = (name: string) => {
    modal.show({
      z: 1020,
      title: t("drive.modal.delete_going_on_task.title"),
      content: t("drive.modal.delete_going_on_task.description"),
      okText: t("drive.modal.delete_going_on_task.delete"),
      cancelText: t("drive.modal.delete_going_on_task.cancel"),
      okButtonProps: {
        colorScheme: "red",
      },
      onOk: () => removeFile(name),
    })
  }

  const handleUploadFile = () => {
    if (Array.isArray(values) && values.length >= MAX_MESSAGE_FILES_LENGTH) {
      message.warning({
        content: t("dashboard.message.support_for_up_to_10"),
      })
      return
    }
    inputRef.current?.click()
  }
  return (
    <>
      <div>
        <Button
          colorScheme="grayBlue"
          fullWidth
          variant="dashed"
          leftIcon={<UploadIcon />}
          onClick={handleUploadFile}
        >
          Upload
        </Button>
        <input
          style={{ display: "none" }}
          type="file"
          accept={ACCEPT.join(",")}
          ref={inputRef}
          onChange={handleOnChange}
        />
      </div>
      {Array.isArray(values) && values.length > 0 && (
        <div css={fileListContainerStyle}>
          {values.map((fileInfo) => (
            <div key={fileInfo.name} css={fileItemStyle}>
              <div css={nameContainerStyle}>
                {getFileIconByContentType(
                  GCS_OBJECT_TYPE.FILE,
                  fileInfo.type,
                  fileTypeIconStyle,
                )}
                <span css={fileNameStyle}>{fileInfo.name}</span>
              </div>
              <div css={opeationStyle}>
                {fileInfo.value ? (
                  <SuccessIcon color={getColor("green", "03")} />
                ) : (
                  <Loading colorScheme="grayBlue" />
                )}
                <span
                  css={iconHotSpotStyle}
                  onClick={() => handleDelete(fileInfo.name)}
                >
                  <DeleteIcon />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default KnowledgeUpload
